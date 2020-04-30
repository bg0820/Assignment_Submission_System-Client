import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./Pages/Main";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import EditorPage from "./Pages/Editor";
import AssignmentListPage from "./Pages/AssignmentList";
import LecutrePage from "./Pages/Lecture";
import LecutreStudentPage from "./Pages/LectureStudent";
import AssignmentListPro from "./Pages/AssignmentListPro";
import CreateLecturePage from "./Pages/CreateLecture";
import AssignmentAdd from "./Pages/AssignmentAdd";

import "./index.scss";

const App = (props) => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} /> //
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/editor" component={EditorPage} />
                    <Route exact path="/lecture" component={LecutrePage} />
                    <Route exact path="/lectureStudent" component={LecutreStudentPage} />
                    <Route exact path="/assignmentList" component={AssignmentListPage} />
                    <Route exact path="/assignmentListPro" component={AssignmentListPro} />
                    <Route exact path="/assignmentAdd" component={AssignmentAdd} />
                    <Route exact path="/createLecture" component={CreateLecturePage} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
