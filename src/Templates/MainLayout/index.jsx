import React, { useEffect, useState, memo } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

import ClassIcon from "@asset/class.svg";
import ToDoIcon from "@asset/clipboard.svg";
import LogoutIcon from "@asset/logout.svg";
import noticeIcon from "@asset/bullhorn.svg";
import questionIcon from "@asset/help.svg";
import gradeIcon from "@asset/exam.svg";

import LectureCreateModal from "@systems/Post/LectureCreate";

import "./style.scss";

const MainLayout = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    let location = props.location.pathname;
    let lectureInfoElem = null;
    let modal = null;

    if (storeModal.modalView === "createLecture")
        modal = (
            <LectureCreateModal
                modalData={storeModal.modalData}
            ></LectureCreateModal>
        );

    const handleLogout = (e) => {
        sessionStorage["token"] = "";
        storeMain.logout();
    };

    if (storeLecture.selectLecture) {
        lectureInfoElem = (
            <React.Fragment>
                <div className="lectureInfo">
                    <p className="lectureName">
                        {storeLecture.selectLecture.courseName}
                    </p>
                    <p className="professorName">
                        {storeLecture.selectLecture.professorName}
                    </p>
                </div>
                <ul>
                    <li className={location === "/assignment1" ? "select" : ""}>
                        <Link to="/assignment">
                            <img className="lectureIcon" src={noticeIcon}></img>
                            <p>공지 톡</p>
                            <div className="notification">
                                <p>0</p>
                            </div>
                        </Link>
                    </li>
                    <li className={location === "/assignment2" ? "select" : ""}>
                        <Link to="/assignment">
                            <img
                                className="lectureIcon"
                                src={questionIcon}
                            ></img>
                            <p>강의 톡</p>
                            <div className="notification">
                                <p>0</p>
                            </div>
                        </Link>
                    </li>
                    <li className={location === "/assignment" ? "select" : ""}>
                        <Link to="/assignment">
                            <img className="lectureIcon" src={ToDoIcon}></img>
                            <p>과제 목록</p>
                        </Link>
                    </li>
                    <li className={location === "/assignment3" ? "select" : ""}>
                        <Link to="/assignment">
                            <img className="lectureIcon" src={gradeIcon}></img>
                            <p>성적</p>
                        </Link>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    return (
        <div className="MainLayout">
            {modal}

            <div className="Menu">
                <div className="Top">
                    <div className="VisibleMenu"></div>
                    <div className="UserInfo">
                        <p className="studentNumber">{storeMain.id}</p>
                        <p className="studentName">{storeMain.name}</p>
                    </div>
                </div>
                <div className="MainMenu nav">
                    <ul>
                        <li className={location === "/" ? "select" : ""}>
                            <Link to="/">
                                <img
                                    className="lectureIcon"
                                    src={ClassIcon}
                                ></img>
                                <p>강의 목록</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/assignment">
                                <img
                                    className="lectureIcon"
                                    src={ToDoIcon}
                                ></img>
                                <p>미제출 과제</p>
                                <div className="notification">
                                    <p>0</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="SubMenu nav">{lectureInfoElem}</div>
                <div className="Bottom" onClick={handleLogout}>
                    <div className="logoutBtn">
                        <img className="logoutIcon" src={LogoutIcon}></img>
                        <p className="logoutText">로그아웃</p>
                    </div>
                </div>
            </div>
            <div className="Content">{props.children}</div>
        </div>
    );
};

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(withRouter(observer(MainLayout)));
