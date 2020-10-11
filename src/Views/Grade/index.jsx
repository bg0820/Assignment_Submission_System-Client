import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Table from "@components/Table";

import * as Util from "@util";

import "./style.scss";

const Grade = (props) => {
    const { storeMain, storeLecture } = props;
    const [list, setList] = useState([]);

    let headerItem = [];
    let childElement = null;

    useEffect(() => {
        Util.requestServer("course/list/student", "GET", {
            courseIdx: props.match.params.courseIdx,
        }).then(async function (result) {
            if (result.code === 200) {
                setList(result.body.list);
            }
        });
    }, []);

    const handleStudent = (item) => {
       storeMain.setSelectStudentIdx(item.userIdx);
       storeMain.setMenu('assignmentGrade');
    };

    if (storeMain.userType === 1) {
        headerItem = [
            {
                text: "학번",
                align: "left",
                width: "100px",
            },
            {
                text: "이름",
                align: "left",
                width: "100px",
            },
            {
                text: "과제 평균",
                align: "left",
                width: "100px",
            },
        ];

        childElement = list.map((item, idx) => {
            return (
                <tr key={item.userIdx} onClick={(e) => handleStudent(item)}>
                    <td align="left">{item.studentId}</td>
                    <td align="left">{item.name}</td>
                    <td align="left">
                        {item.score ? item.score + "점" : "없음"}
                    </td>
                </tr>
            );
        });
    }

    return(
        <Table header={headerItem} className="studentTable">
            {childElement}
        </Table>
    );
}

export default inject(
    "storeMain",
    "storeLecture"
)(observer(Grade));
