import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Button from "@components/Button";
import Input from "@components/Input";

import CodeHighlighter from "@components/CodeHighlighter";

import * as Util from "@util";
import "./style.scss";

const AssignmentCodeBox = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [score, setScore] = useState("");

    const handleEvaluation = (e) => {
        Util.requestServer("task/evaluate", "PUT", {
            evaluationIdx: props.evaluationIdx,
            score: score,
        }).then(function (result) {
            if(result.code === 200) {
                console.log("과제 점수 변경");
            }
        });
    };

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    };

    return(
        <div className="AssignmentCodeBox">
            <div className="box">
                <div className="Header">
                    <div className="studentInfo">
                        <p className="studentNumber">{props.id}</p>
                        <p className="studentName">{props.studentName}</p>
                    </div>
                    <div className="grade">
                        <Input
                            placeholder={props.score}
                            width="45px"
                            height="small"
                            margin="0px 15px 0px 0px"
                            value={score}
                            onChange={handleScoreChange}
                        />

                        <Button
                            value="평가"
                            width="90px"
                            height="40px"
                            onClick={handleEvaluation}
                        ></Button>
                    </div>
                </div>
                <div className="Code">
                    <CodeHighlighter language={props.language} code={props.code}></CodeHighlighter>
                </div>
            </div>
        </div>
    );
}

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(observer(AssignmentCodeBox));