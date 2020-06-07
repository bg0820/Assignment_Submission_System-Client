import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

import MainLayout from "@templates/MainLayout";

import LecutreListView from '@views/LectureList';
import AssignmentListView from '@views/AssignmentList';
import EditorView from '@views/Editor';


import * as Util from "@util";
import "./style.scss";

const MainPage = (props) => {
    const { storeLecture, storeMain, match, history } = props;

    let viewElem = null;

    useEffect(() => {
        if(props.match.params.courseIdx) {
            Util.requestServer("course/info", 'GET', {
                courseIdx: props.match.params.courseIdx,
            }).then(async function (result) {
                storeLecture.selectLectureItem(result.body.info);
            });
        }

    }, []);
    
    console.log(storeMain.menu, match);
    if(storeMain.menu === 'lectureList') {
        viewElem = <LecutreListView match={match} history={history}></LecutreListView>;
    } else if(storeMain.menu === 'assignmentList') {
        viewElem = <AssignmentListView match={match} history={history}></AssignmentListView>;
    } else if(storeMain.menu === 'editor') {
        viewElem = <EditorView  match={match} history={history}></EditorView>
    }

    return (
        <MainLayout>
            {viewElem}
        </MainLayout>
    );
};

export default inject(
    "storeLecture",
    "storeMain"
)(observer(MainPage));
