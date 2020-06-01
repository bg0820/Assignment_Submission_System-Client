import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Button from "@components/Button";
import Input from "@components/Input";

import * as Util from "@util";
import "./style.scss";

const AssignmentCodeBox = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [score, setScore] = useState("");

    const handleEvaluation = (e) => {
        
    };

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    };

    return(
        <div className="AssignmentCodeBox">
        <div className="box">
            <div className="left">
                <div className="studentInfo">
                    <p className="studentNumber">201734001</p>
                    <p className="studentName">강현지</p>
                </div>
                <div className="result">
                    {props.result}
                </div>
            </div>
            <div className="right">
                <Input
                    placeholder="점수"
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
                <div className="code">
                    {props.code}
                </div>
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