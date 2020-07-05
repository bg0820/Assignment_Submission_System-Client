import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Table from "@components/Table";

import * as Util from "@util";

import "./style.scss";

const AssignmentGrade = (props) => {
    const { storeMain, storeLecture, storeTask } = props;
    const [list, setList] = useState([]);

    let headerItem = [];
    let childElement = null;

    useEffect(() => {
        Util.requestServer("task/list/grade", "GET", {
            courseIdx: props.match.params.courseIdx,
            studentIdx: storeMain.selectStudentIdx,
        }).then(async function (result) {
            if (result.code === 200) {
                setList(result.body.list);
            }
        });
    }, []);

    console.log(storeMain.selectStudentIdx);
    
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
            text: "성적",
            align: "left",
            width: "100px",
        },
    ];

    childElement = list.map((item, idx) => {
        return (
            <tr
                key={item.taskIdx}
            >
                <td align="left">{item.title}</td>
                <td align="left">{item.content}</td>
                <td align="left">
                    {item.score ? item.score + "점" : "없음"}
                </td> 
            </tr>
        );
    });

    return (
        <Table header={headerItem}>
            {childElement}
        </Table>
    );
}

export default inject(
    "storeMain",
    "storeTask",
    "storeLecture"
)(observer(AssignmentGrade));