import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import Table from "@components/Table";
import Language from "@components/Language";
import FloatingMenu from "@components/FloatingMenu";

import * as Util from "@util";
import "./style.scss";

const LecturePage = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [list, setList] = useState([]);
    let headerItem = [];
    let childElement = null;
    let createBtnElem = null;

    useEffect(() => {
        Util.requestServer("course/list", "GET", {}).then(function (result) {
            console.log(result);
            if (result.code === 200) {
                setList(result.body.list);
            }
        });
    }, []);

    const handleLecture = (item) => {
        storeLecture.selectLectureItem(item);

        console.log(item);
        storeMain.socket.emit("message", {
            token: sessionStorage.token,
            type: "join",
            data: {
                courseIdx: item.courseIdx,
            },
        });
    };

    const handleFloating = (e) => {
        storeModal.modalCall({
            modalView: "createLecture",
            modalTitle: "강의 생성",
        });
    };

    if (storeMain.userType === 0) {
        headerItem = [
            {
                text: "교수 이름",
                width: "100px",
                align: "center",
            },
            {
                text: "수강 강의명",
                align: "left",
            },
            {
                text: "언어",
                width: "100px",
            },
            {
                text: "성적",
                width: "100px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr key={item.courseIdx} onClick={(e) => handleLecture(item)}>
                    <td align="center">{item.professorName}</td>
                    <td align="left">{item.courseName}</td>
                    <td align="center">
                        <Language language={item.language}></Language>
                    </td>
                    <td align="center">
                        {item.grade ? item.grade + "점" : "없음"}
                    </td>
                </tr>
            );
        });
    } else {
        headerItem = [
            {
                text: "강의명",
                align: "left",
            },
            {
                text: "학생수",
                width: "100px",
            },
            {
                text: "언어",
                width: "100px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr
                    key={item.courseIdx}
                    data-num={idx}
                    onClick={(e) => handleLecture(item)}
                >
                    <td align="left">{item.courseName}</td>
                    <td align="center">{item.count}</td>
                    <td align="center">
                        <Language language={item.language}></Language>
                    </td>
                </tr>
            );
        });
        createBtnElem = <FloatingMenu onClick={handleFloating}></FloatingMenu>;
    }

    return (
        <MainLayout>
            <Table header={headerItem} className="lectureTable">
                {childElement}
            </Table>
            {createBtnElem}
        </MainLayout>
    );
};

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(observer(LecturePage));
