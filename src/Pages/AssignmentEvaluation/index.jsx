import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import AssignmentCodeBox from "@components/AssignmentCodeBox";
import AssignmentHtmlBox from "@components/AssignmentHtmlBox";

import * as Util from "@util";
import "./style.scss";

const AssignmentEvaluation = (props) => {
    const { storeMain, storeLecture } = props;
    const [list, setList] = useState();
    const [users, setUsers] = useState([]);
    const [language, setLanguage] = useState('');


    useEffect(() => {
        Util.requestServer("task/list/apply", "GET", {
            taskIdx: props.match.params.taskIdx,
        }).then(function(resp) {
            let body = resp.body;

            if(resp.code === 200) {
                console.log("성공");
                setLanguage(body.data.language);
                setUsers(body.data.users);
            }
        })
    }, []);

    let assignmentElem = null;

    if(language == "HTML" || language == "html") {
        assignmentElem = users.map((item, idx) => {
            return(
                <AssignmentHtmlBox
                    key={idx}
                    id={item.id}
                    studentName={item.studentName}
                    score={item.score}
                    code={item.code}
                    result={item.result}
                    evaluationIdx={item.evaluationIdx}
                    language={language}
                ></AssignmentHtmlBox>
            );
        });
    } else {
        assignmentElem = users.map((item, idx) => {
            return(
                <AssignmentCodeBox
                    key={idx}
                    id={item.id}
                    studentName={item.studentName}
                    score={item.score}
                    code={item.code}
                    result={item.output}
                    evaluationIdx={item.evaluationIdx}
                    language={language}
                ></AssignmentCodeBox>
            );
        });
    }

    return (
        <div className="AssignmentEvaluation">
            {assignmentElem}
        </div>
    );
};

export default inject("storeMain", "storeLecture")(observer(AssignmentEvaluation));