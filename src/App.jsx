import React, { PureComponent, useEffect } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";

import MainPage from "./Pages/Main";
import CreateLecturePage from "./Pages/CreateLecture";
import EvaluationPage from "./Pages/AssignmentEvaluation";

import QnAChat from "./Pages/LectureTalk";
import NoticeChat from "./Pages/NoticeChat";
import MyPage from "./Pages/MyPage";

import PwFind from "./Pages/PwFind";

/*
import LecutreStudentPage from "./Pages/LectureStudent";
import AssignmentListPro from "./Pages/AssignmentListPro";
import AssignmentAdd from "./Pages/AssignmentAdd";
import CreateLecturePage from "./Pages/CreateLecture";*/

import * as Util from "@util";

import "./index.scss";

const App = (props) => {
    console.log(props);
    const { storeMain } = props;

    useEffect(() => {
        if (sessionStorage["token"]) {
            Util.requestServer("auth/info", "GET", {}).then(function (resp) {
                storeMain.login(
                    resp.body.info.id,
                    resp.body.info.name,
                    resp.body.info.userType,
                    resp.body.info.userIdx
                );
            });
        } else {
            if (location.pathname !== "/login") location.href = "/login";
        }
    }, [storeMain.isLogin]);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Route exact path="/" component={MainPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/createLecture" component={CreateLecturePage} />
                <Route path="/evaluation" component={EvaluationPage} />
                <Switch>
                    <Route path="/:courseIdx/notice" component={MainPage} />
                    <Route path="/:courseIdx/qna" component={MainPage} />
                    <Route path="/:courseIdx/:taskIdx" component={MainPage} />
                    <Route path="/:courseIdx" component={MainPage} />
                </Switch>
                <Route path="/pwFind" component={PwFind} />
                <Route path="/MyPage" component={MyPage} />
            </BrowserRouter>
        </React.Fragment>
    );
};

export default inject("storeMain")(observer(App));

/*

                    <Route exact path="/lectureStudent" component={LecutreStudentPage} />
                    <Route exact path="/assignmentListPro" component={AssignmentListPro} />
                    <Route exact path="/assignmentAdd" component={AssignmentAdd} />
                    <Route exact path="/createLecture" component={CreateLecturePage} />
*/
