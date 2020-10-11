import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Table from "@components/Table";
import Language from "@components/Language";
import FloatingMenu from "@components/FloatingMenu";

import gradeIcon from "@asset/exam-2.svg";
import editIcon from "@asset/edit.svg";
import deleteIcon from "@asset/trash.svg";

import * as Util from "@util";

import "./style.scss";

const AssignmentListView = (props) => {
    const { storeMain, storeLecture } = props;
    const [list, setList] = useState([]);

    let headerItem = [];
    let childElement = null;
    let createBtnElem = null;

    useEffect(() => {
        if (props.match.params.courseIdx) {
            Util.requestServer("task/list", "GET", {
                courseIdx: props.match.params.courseIdx,
            }).then(async function (result) {
                if (result.code === 200) {
                    setList(result.body.list);
                    Util.requestServer("task/list/nonAssignment", "GET", {
                    }).then(async function (result) {
                        if (result.code === 200) {
                            storeMain.setNonAssignment(result.body.list.length);
                        }
                    });
                }
            });
        }
    }, []);

    const handleTask = (item) => {
        if(item.isSubmission) {
            if(window.confirm('이미 제출한 과제입니다. 수정하시겠습니까?')) {
                storeMain.setMenu("editor");

                console.log(props.match.params.courseIdx + "/" + item.taskIdx);
                props.history.replace(
                    "/" + props.match.params.courseIdx + "/" + item.taskIdx
                );
            }
        } else {
            storeMain.setMenu("editor");
    
            console.log(props.match.params.courseIdx + "/" + item.taskIdx);
            props.history.replace(
                "/" + props.match.params.courseIdx + "/" + item.taskIdx
            );
        }
    };

    const handleFloating = (e) => {
        storeMain.setMenu("editor");
        props.history.push("/" + props.match.params.courseIdx);
        
    };

    const clickEdit = (item) => {
        storeMain.setMenu("editor");
        props.history.push(
            "/" + props.match.params.courseIdx + "/" + item.taskIdx
        );
    };

    const clickGrade = (item) => {
        storeMain.setMenu("evaluation");
        props.history.push(
            "/" + props.match.params.courseIdx + "/" + item.taskIdx
        );
    };

    const clickDelete = (item) => {
        console.log(item.taskIdx);

        Util.requestServer("task/delete", "POST", {
            taskIdx: item.taskIdx,
        }).then(function (result) {
            Util.requestServer("task/list", "GET", {
                courseIdx: props.match.params.courseIdx,
            }).then(async function (result) {
                if (result.code === 200) {
                    setList(result.body.list);
                }
            });
        });


    };

    if (storeMain.userType === 0) {
        headerItem = [
            {
                text: "과제 명",
                align: "left",
                width: "150px",
            },
            {
                text: "과제 설명",
                align: "left",
            },
            {
                text: "언어",
                width: "100px",
            },
            {
                text: "제출 여부",
                width: "80px",
            },
            {
                text: "평가",
                width: "80px",
            },
            {
                text: "제출 기간",
                width: "160px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr
                    key={item.taskIdx}
                    data-taskidx={item.taskIdx}
                    onClick={(e) => handleTask(item)}
                >
                    <td align="left">{item.title}</td>
                    <td align="left">{item.content}</td>
                    <td align="center">
                        <Language language={item.language}></Language>
                    </td>
                    <td
                        className={
                            item.isSubmission
                                ? "submitType color-blue"
                                : "submitType  "
                        }
                        align="center"
                    >
                        {item.isSubmission ? "제출" : "미제출"}
                    </td>
                    <td align="center">{item.score}</td>
                    <td align="center">
                        {Util.dateForm(item.expireDate, "full")}
                    </td>
                </tr>
            );
        });
    } else {
        headerItem = [
            {
                text: "과제 명",
                align: "left",
                width: "200px",
            },
            {
                text: "과제 설명",
                align: "left",
            },
            {
                text: "제출 기간",
                width: "160px",
            },
            {
                text: "연장 기간",
                width: "160px",
            },
            {
                text: " ",
                width: "100px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr key={item.taskIdx} data-taskidx={item.taskIdx}>
                    <td align="left">{item.title}</td>
                    <td align="left">{item.content}</td>
                    <td align="center">
                        {Util.dateForm(item.expireDate, "full")}
                    </td>
                    <td align="center">
                        {Util.dateForm(item.extendDate, "full")}
                    </td>
                    <td align="center">
                        <div>
                            <img
                                className="lectureIcon"
                                src={gradeIcon}
                                onClick={(e) => clickGrade(item)}
                            ></img>
                            <img
                                className="lectureIcon"
                                src={editIcon}
                                onClick={(e) => clickEdit(item)}
                            ></img>
                            <img
                                className="lectureIcon"
                                src={deleteIcon}
                                
                                onClick={(e) => {window.confirm('삭제?') ? clickDelete(item) : ""; 
                                 }}
                            ></img>
                        </div>
                    </td>
                </tr>
            );
        });
        createBtnElem = <FloatingMenu onClick={handleFloating}></FloatingMenu>;
    }

    return (
        <React.Fragment>
            <Table header={headerItem} className="lectureTable">
                {childElement}
            </Table>
            {createBtnElem}
        </React.Fragment>
    );
};

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(observer(AssignmentListView));
