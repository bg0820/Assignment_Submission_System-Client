import React, { Fragment, useEffect, useState, memo } from "react";
import { observer, inject } from "mobx-react";

import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Modal from "@templates/Modal";

import * as Util from "@util";

import "./style.scss";

const EvaluateAssignment = (props) => {
    const [score, setScore] = useState("");
    const [comment, setComment] = useState("");

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSaveEvaluation = (e) => {
        
    }

    const resize = (event) => {
        let target = event.target;
        target.style.height = "1px";
        target.style.height = target.scrollHeight + "px";
    };

    return (
        <Modal>
            <div className="EvaluateAssignment">
                <Input
                    placeholder="점수를 입력하세요."
                    height="small"
                    margin="0px 0px 15px 0px"
                    value={score}
                    onChange={handleScoreChange}
                />
                <Textarea
                    padding="5px 0px 0px 5px"
                    height="35px"
                    onKeyUp={resize}
                    onKeyDown={resize}
                    placeholder="설명을 입력하세요."
                    margin="0px"
                    value={comment}
                    onChange={handleCommentChange}
                ></Textarea>
                <Button
                    value="평가 저장"
                    height="50px"
                    onClick={handleSaveEvaluation}
                    margin="20px 0px 0px 0px"
                ></Button>
            </div>
        </Modal>
    );
}

export default EvaluateAssignment;