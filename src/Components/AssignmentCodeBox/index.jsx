import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Button from "@components/Button";

import * as Util from "@util";
import "./style.scss";

const AssignmentCodeBox = (props) => {
    const { storeMain, storeModal, storeLecture } = props;

    const handleEvaluation = (e) => {
        storeModal.modalCall({
            modalView: "evaluateAssignment",
            modalTitle: "과제 평가",
        });
    };

    return(
        <div className="AssignmentCodeBox">
            <div className="left">
                <div className="studentInfo">
                    <p className="studentNumber">201734001</p>
                    <p className="studentName">강현지</p>
                </div>
                <div className="result">

                </div>
            </div>
            <div className="right">
                <Button
                    value="평가"
                    width="90px"
                    height="40px"
                    onClick={handleEvaluation}
                ></Button>
                <div className="code">

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