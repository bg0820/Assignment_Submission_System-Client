import React, { PureComponent, useEffect } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import EditorRouter from "@router/Editor";
import AssignmentRouter from "@router/Assignment";
import LecutrePage from "./Pages/Lecture";
import CreateLecturePage from "./Pages/CreateLecture";
import NoticeChat from "./Pages/NoticeChat";

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
        if (!storeMain.isLogin) {
            if (sessionStorage["token"]) {
                Util.requestServer("auth/info", "get", {}).then(function (
                    resp
                ) {
                    storeMain.login(
                        resp.body.info.id,
                        resp.body.info.name,
                        resp.body.info.userType
                    );
                });
            } else {
                if (location.pathname !== "/login") location.href = "/login";
            }
        }
    }, [storeMain.isLogin]);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LecutrePage} /> //
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/editor" component={EditorRouter} />
                    <Route path="/assignment" component={AssignmentRouter} />
                    <Route
                        path="/createLecture"
                        component={CreateLecturePage}
                    />
                    <Route path="/noticeChat" component={NoticeChat} />
                </Switch>
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
