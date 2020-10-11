import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Table from "@components/Table";
import Language from "@components/Language";

import * as Util from "@util";

import "./style.scss";

const NonAssignmentListView = (props) => {
    const { storeMain, storeLecture } = props;
    const [list, setList] = useState([]);

    let headerItem = [];
    let childElement = null;
    let createBtnElem = null;

    useEffect(() => {
        if (props.match.params.courseIdx) {
            Util.requestServer("task/list/nonAssignment", "GET", {
            }).then(async function (result) {
                if (result.code === 200) {
                    setList(result.body.list);
                }
            });
        }
    }, []);

    const handleTask = (item) => {
        storeMain.setMenu("editor");

        console.log(props.match.params.courseIdx + "/" + item.taskIdx);
        props.history.replace(
            "/" + props.match.params.courseIdx + "/" + item.taskIdx
        );
    };

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
)(observer(NonAssignmentListView));
