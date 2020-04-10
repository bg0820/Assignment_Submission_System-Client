import React, { useEffect, useState, memo } from "react";

import ClassIcon from "@asset/class.svg";
import ToDoIcon from "@asset/clipboard.svg";
import LogoutIcon from "@asset/logout.svg";
import noticeIcon from "@asset/bullhorn.svg";
import questionIcon from "@asset/help.svg";
import gradeIcon from "@asset/exam.svg";

import Button from "@components/Button";

import "./style.scss";

const MainLayout = props => {
    const textBtnClick = event => {
        console.log(event);
    };

    return (
        <div className="MainLayout">
            <div className="Menu">
                <div className="Top">
                    <div className="VisibleMenu"></div>
                    <div className="UserInfo">
                        <p className="studentNumber">201734005</p>
                        <p className="studentName">홍길동</p>
                    </div>
                </div>
                <div className="MainMenu">
                    <ul>
                        <li>
                            <img className="lectureIcon" src={ClassIcon}></img>
                            <p>강의 목록</p>
                            <div className="notification">
                                <p>99+</p>
                            </div>
                        </li>
                        <li>
                            <img className="lectureIcon" src={ToDoIcon}></img>
                            <p>미제출 과제</p>
                            <div className="notification">
                                <p>0</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="SubMenu">
                <div className="lectureInfo">
                        <p className="lectureName">Java 프로그래밍</p>
                        <p className="professorName">홍길동</p>
                    </div>
                    <ul>
                        <li>
                            <img className="lectureIcon" src={noticeIcon}></img>
                            <p>공지 톡</p>
                            <div className="notification">
                                <p>10</p>
                            </div>
                        </li>
                        <li>
                            <img className="lectureIcon" src={questionIcon}></img>
                            <p>강의 톡</p>
                            <div className="notification">
                                <p>99+</p>
                            </div>
                        </li>
                        <li>
                            <img className="lectureIcon" src={ToDoIcon}></img>
                            <p>과제 목록</p>
                        </li>
                        <li>
                            <img className="lectureIcon" src={gradeIcon}></img>
                            <p>성적</p>
                        </li>
                    </ul>
                </div>
                <div className="Bottom">
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

export default MainLayout;
