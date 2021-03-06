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
import EvaluateAssignment from "@systems/Post/EvaluateAssignment";

import "./style.scss";

const MainLayout = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    let lectureInfoElem = null;
    let modal = null;

    if (storeModal.modalView === "createLecture")
        modal = (
            <LectureCreateModal
                modalData={storeModal.modalData}
            ></LectureCreateModal>
        );

    if (storeModal.modalView === "evaluateAssignment")
        modal = (
            <EvaluateAssignment
                modalData={storeModal.modalData}
            ></EvaluateAssignment>
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
                    <li
                        className={storeMain.menu === "notice" ? "select" : ""}
                        onClick={() => {
                            storeMain.setMenu("notice");
                            props.history.replace(
                                "/" + props.match.params.courseIdx + "/notice"
                            );
                        }}
                    >
                        <img className="lectureIcon" src={noticeIcon}></img>
                        <p>공지 톡</p>
                        <div className="notification">
                            <p>0</p>
                        </div>
                    </li>
                    <li
                        className={storeMain.menu === "qna" ? "select" : ""}
                        onClick={() => {
                            storeMain.setMenu("qna");
                            props.history.replace(
                                "/" + props.match.params.courseIdx + "/qna"
                            );
                        }}
                    >
                        <img className="lectureIcon" src={questionIcon}></img>
                        <p>강의 톡</p>
                        <div className="notification">
                            <p>0</p>
                        </div>
                    </li>
                    <li
                        className={
                            storeMain.menu === "assignmentList" ||
                            storeMain.menu === "editor"
                                ? "select"
                                : ""
                        }
                        onClick={() => {
                            storeMain.setMenu("assignmentList");
                            props.history.replace(
                                "/" + props.match.params.courseIdx
                            );
                        }}
                    >
                        <img className="lectureIcon" src={ToDoIcon}></img>
                        <p>과제 목록</p>
                    </li>
                    <li
                        className={storeMain.menu === "grade" ? "select" : ""}
                        onClick={() => {
                            storeMain.setMenu("grade");
                            props.history.replace(
                                "/" + props.match.params.courseIdx
                            );
                        }}
                    >
                        <img className="lectureIcon" src={gradeIcon}></img>
                        <p>성적</p>
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
                        <li
                            className={
                                storeMain.menu === "lectureList" ? "select" : ""
                            }
                            onClick={() => {
                                storeMain.setMenu("lectureList");
                                props.history.replace("/");
                            }}
                        >
                            <img className="lectureIcon" src={ClassIcon}></img>
                            <p>강의 목록</p>
                        </li>
                        <li
                            className={
                                storeMain.menu === "nonLectureList"
                                    ? "select"
                                    : ""
                            }
                        >
                            <img className="lectureIcon" src={ToDoIcon}></img>
                            <p>미제출 과제</p>
                            <div className="notification">
                                <p>0</p>
                            </div>
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
