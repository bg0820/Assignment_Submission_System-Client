import React, { useEffect, useState, memo } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

import ClassIcon from "@asset/class.svg";
import ToDoIcon from "@asset/clipboard.svg";
import LogoutIcon from "@asset/logout.svg";
import noticeIcon from "@asset/bullhorn.svg";
import questionIcon from "@asset/help.svg";
import gradeIcon from "@asset/exam.svg";
import openMenuIcon from "@asset/open-menu.svg";

import LectureCreateModal from "@systems/Post/LectureCreate";
import EvaluateAssignment from "@systems/Post/EvaluateAssignment";

import "./style.scss";

const MainLayout = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [visible, setVisible] = useState(true);
    let lectureInfoElem = null;
    let modal = null;
    let menuElem = null;
    let nonAssignmentElem = null;

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

    const handleVisibleMenu = (e) => {
        // console.log('asd');
        storeMain.setVisible(!storeMain.visible);
    };

    if (storeMain.userType == 0) {
        nonAssignmentElem = (
            <li
                className={
                    storeMain.menu === "NonAssignmentList" ? "select" : ""
                }
                onClick={() => {
                    storeMain.setMenu("NonAssignmentList");
                    props.history.replace("/nonAssignmentList");
                }}
            >
                <img className="lectureIcon" src={ToDoIcon}></img>
                <p>미제출 과제</p>
                <div className="notification">
                <p>{storeMain.nonAssignmentCount}</p>
                </div>
            </li>
        );
    }

    if (storeLecture.selectLecture) {
        if (storeMain.visible) {
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
                            className={
                                storeMain.menu === "notice" ? "select" : ""
                            }
                            onClick={() => {
                                storeMain.setMenu("notice");
                                props.history.replace(
                                    "/" +
                                        props.match.params.courseIdx +
                                        "/notice"
                                );
                            }}
                        >
                            <img className="lectureIcon" src={noticeIcon}></img>
                            <p>공지 톡</p>
                            <div className="notification">
                                <p>N</p>
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
                            <img
                                className="lectureIcon"
                                src={questionIcon}
                            ></img>
                            <p>강의 톡</p>
                            <div className="notification">
                                <p>N</p>
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
                            className={
                                storeMain.menu === "grade" ? "select" : ""
                            }
                            onClick={() => {
                                storeMain.setMenu("grade");
                                props.history.replace(
                                    "/" + props.match.params.courseIdx + '/grade'
                                );
                            }}
                        >
                            <img className="lectureIcon" src={gradeIcon}></img>
                            <p>성적</p>
                        </li>
                    </ul>
                </React.Fragment>
            );
        } else {
            lectureInfoElem = ( // 메뉴 최소화 했을때 현재 선택중인 강의 내용
                <React.Fragment>
                    <ul>
                        <li
                            className={
                                storeMain.menu === "notice" ? "select" : ""
                            }
                            onClick={() => {
                                storeMain.setMenu("notice");
                                props.history.replace(
                                    "/" +
                                        props.match.params.courseIdx +
                                        "/notice"
                                );
                            }}
                        >
                            <img className="lectureIcon" src={noticeIcon}></img>
                            <div className="notification">
                                <p>+</p>
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
                            <img
                                className="lectureIcon"
                                src={questionIcon}
                            ></img>
                            <div className="notification">
                                <p>+</p>
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
                        </li>
                        <li
                            className={
                                storeMain.menu === "grade" ? "select" : ""
                            }
                            onClick={() => {
                                storeMain.setMenu("grade");
                                props.history.replace(
                                    "/" + props.match.params.courseIdx + '/grade'
                                );
                            }}
                        >
                            <img className="lectureIcon" src={gradeIcon}></img>
                        </li>
                    </ul>
                </React.Fragment>
            );
        }
    }

    if (storeMain.visible) {
        menuElem = (
            <div className="Menu">
                <div className="Top">
                    <div className="VisibleMenu" onClick={handleVisibleMenu}>
                        <img className="openMenuIcon" src={openMenuIcon}></img>
                    </div>
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
                                lectureInfoElem = null;
                                storeLecture.selectLecture = null;
                                storeMain.setMenu("lectureList");
                                props.history.replace("/");
                            }}
                        >
                            <img className="lectureIcon" src={ClassIcon}></img>
                            <p>강의 목록</p>
                        </li>
                        {nonAssignmentElem}
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
        );
    } else {
        // 메뉴 최소화 눌렀을때
        menuElem = (
            <div className="Menu small">
                <div className="Top">
                    <div className="VisibleMenu" onClick={handleVisibleMenu}>
                        <img className="openMenuIcon" src={openMenuIcon}></img>
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
                        </li>
                        <li
                            className={
                                storeMain.menu === "nonLectureList"
                                    ? "select"
                                    : ""
                            }
                        >
                            <img className="lectureIcon" src={ToDoIcon}></img>
                            <div className="notification">
                                <p>+</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="SubMenu nav">{lectureInfoElem}</div>
                <div className="Bottom" onClick={handleLogout}>
                    <div className="logoutBtn">
                        <img className="logoutIcon" src={LogoutIcon}></img>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="MainLayout">
            {modal}

            {menuElem}
            <div className="Content">{props.children}</div>
        </div>
    );
};

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(withRouter(observer(MainLayout)));
