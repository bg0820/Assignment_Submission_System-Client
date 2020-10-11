import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

import MainLayout from "@templates/MainLayout";

import LecutreListView from "@views/LectureList";
import AssignmentListView from "@views/AssignmentList";
import EditorView from "@views/Editor";
import QnATalkView from "@views/Qna";
import NoticeTalkView from "@views/Notice";
import GradeView from "@views/Grade";
import AssignmentGrade from "@views/AssignmentGrade";
import NonAssignmentListView from "@views/NonAssignmentList";

import * as Util from "@util";
import "./style.scss";
import AssignmentEvaluation from "../AssignmentEvaluation";

const MainPage = (props) => {
    const { storeLecture, storeMain, match, history } = props;

    let viewElem = null;

    useEffect(() => {
        GetCourseInfo();
    }, []);
    
    const GetCourseInfo = async () => {
        if(props.match.params.taskIdx) {
            let resp = await Util.requestServer("course/info", "GET", {
                courseIdx: props.match.params.courseIdx
            });
    
            storeLecture.selectLectureItem(resp.body.info);
            storeMain.socket.emit("message", {
                token: sessionStorage.token,
                type: "join",
                data: {
                    courseIdx: props.match.params.courseIdx,
                }
            });

            if(!isNaN(props.match.params.taskIdx))
                storeMain.setMenu("editor");
            else {
                props.history.replace('/' + props.match.params.courseIdx)
                storeMain.setMenu("assignmentList");
            }
        } else {
            if (props.match.params.courseIdx) {
                let resp = await Util.requestServer("course/info", "GET", {
                    courseIdx: props.match.params.courseIdx
                });
        
                storeLecture.selectLectureItem(resp.body.info);
    
                storeMain.socket.emit("message", {
                    token: sessionStorage.token,
                    type: "join",
                    data: {
                        courseIdx: props.match.params.courseIdx,
                    }
                });

                if(!isNaN(props.match.params.courseIdx))
                    storeMain.setMenu("assignmentList");
            }
        }

        
    }

    if (storeMain.menu === "lectureList") {
        viewElem = (
            <LecutreListView match={match} history={history}></LecutreListView>
        );
    } else if (storeMain.menu === "assignmentList") {
        viewElem = (
            <AssignmentListView
                match={match}
                history={history}
            ></AssignmentListView>
        );
    } else if (storeMain.menu === "editor") {
        viewElem = <EditorView match={match} history={history}></EditorView>;
    } else if (storeMain.menu === "qna") {
        viewElem = <QnATalkView match={match} history={history}></QnATalkView>;
    } else if (storeMain.menu === "notice") {
        viewElem = (
            <NoticeTalkView match={match} history={history}></NoticeTalkView>
        );
    } else if (storeMain.menu === "evaluation") {
        viewElem = (
            <AssignmentEvaluation match={match} history={history}></AssignmentEvaluation>
        );
    } else if (storeMain.menu === "grade") {
        if (storeMain.userType === 1) {
            viewElem = <GradeView match={match} history={history}></GradeView>;
        } else { viewElem = <AssignmentGrade match={match} history={history}></AssignmentGrade>;
        }
        
    } else if (storeMain.menu === "assignmentGrade") {
        viewElem = <AssignmentGrade match={match} history={history}></AssignmentGrade>;
    } else if (storeMain.menu === "NonAssignmentList") {
        viewElem = <NonAssignmentListView match={match} history={history}></NonAssignmentListView>
    }

    return <MainLayout>{viewElem}</MainLayout>;
};

export default inject("storeLecture", "storeMain")(observer(MainPage));
