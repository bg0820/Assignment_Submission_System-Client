import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import AssignmentCodeBox from "@components/AssignmentCodeBox";
import AssignmentHtmlBox from "@components/AssignmentHtmlBox";

import * as Util from "@util";
import "./style.scss";

const AssignmentEvaluation = (props) => {
    const { storeMain, storeLecture, storeTask } = props;
    const [list, setList] = useState([]);
    const [language, setLanguage] = useState();
    const [assignment, setAssignment] = useState({
        id: "",
        studentName: "",
        score: "",
        code: "",
        result: "",
        evaluationIdx: "",
    });

    let assignmentElem = null;

    useEffect(() => {
        Util.requestServer("task/list/apply", "GET", {
            taskIdx: props.match.params.taskIdx,
        }).then(function(resp) {
            let body = resp.body;

            if(resp.code === 200) {
                console.log("성공");
                setList(body.list);
                //setAssignment(body.assignment);
                setLanguage(body.language);
            }
        })
    }, []);


    if(language == "HTML") {
        assignmentElem = list.map((item, idx) => {
            return(
                <AssignmentHtmlBox
                    id={item.id}
                    studentName={item.studentName}
                    score={item.score}
                    code={item.code}
                    result={item.result}
                    evaluationIdx={item.evaluationIdx}
                ></AssignmentHtmlBox>
            );
        });
        /*
        assignmentElem = (
            <AssignmentHtmlBox
                id={assignment.id}
                studentName={assignment.studentName}
                score={assignment.score}
                code={assignment.code}
                result={assignment.result}
                evaluationIdx={assignment.evaluationIdx}
            ></AssignmentHtmlBox>
        );
        */
    } else {
        assignmentElem = list.map((item, idx) => {
            return(
                <AssignmentCodeBox
                    id={item.id}
                    studentName={item.studentName}
                    score={item.score}
                    code={item.code}
                    result={item.result}
                    evaluationIdx={item.evaluationIdx}
                ></AssignmentCodeBox>
            );
        })
        /*
        assignmentElem = (
            <AssignmentCodeBox
                id={assignment.id}
                studentName={assignment.studentName}
                score={assignment.score}
                code={assignment.code}
                result={assignment.result}
                evaluationIdx={assignment.evaluationIdx}
            ></AssignmentCodeBox>
        );
        */
    }
    return (
        <div className="AssignmentEvaluation">
            {assignmentElem}
        </div>
    );
};

export default inject("storeMain", "storeLecture", "storeTask")(observer(AssignmentEvaluation));