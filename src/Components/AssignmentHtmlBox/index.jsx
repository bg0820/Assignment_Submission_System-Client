import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Button from "@components/Button";
import Input from "@components/Input";

import * as Util from "@util";
import "./style.scss";

const AssignmentHtmlBox = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [codeView, setCodeView] = useState(false);
    const [score, setScore] = useState("");

    const handleEvaluation = (e) => {
        
    };

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    };

    const handleCode = (e) => {
        if (codeView) {
            console.log("true");
            setCodeView(false);
        } else {
            console.log("false");
            setCodeView(true);
        }
    }

    let codeElem = null;

    if (codeView)
        codeElem = (
            <div className="codeView">
                {props.code}
            </div>
        );

    return (
        <div className="AssignmentHtmlBox">
            <div className="box">
                <div className="top">
                    <div className="studentInfo">
                        <p className="studentNumber">201734001</p>
                        <p className="studentName">강현지</p>
                    </div>
                    <div className="score">
                        <Input
                            placeholder="점수"
                            width="45px"
                            height="small"
                            margin="0px 15px 0px 0px"
                            value={score}
                            onChange={handleScoreChange}
                        />
                            <Button
                                value="코드보기"
                                color="green"
                                width="90px"
                                height="40px"
                                onClick={handleCode}
                                margin="0px 10px 0px 0px"
                            ></Button>
                            <Button
                                value="평가"
                                width="90px"
                                height="40px"
                                onClick={handleEvaluation}
                            ></Button>
                    </div>
                </div>
                <div className="result">
                    {props.result}
                </div>
                {codeElem}

            </div>
        </div>
    );
}

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(observer(AssignmentHtmlBox));