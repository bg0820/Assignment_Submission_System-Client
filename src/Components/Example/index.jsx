import React, { useState, useEffect, memo, useRef } from "react";

import Textarea from "@components/Textarea";
import "./style.scss";

const Example = (props) => {
    const handleInputChange = (e) => {
        props.inputChange(props.idx, e.target.value);
    };

    const handleOutputChange = (e) => {
        props.outputChange(props.idx, e.target.value);
    };

    const resize = (event) => {
        let target = event.target;
        target.style.height = "1px";
        target.style.height = target.scrollHeight + "px";
    };

    return (
        <div className="Example">
            <p>[예시] 입력/출력 {props.idx + 1}.</p>
            <Textarea
                padding="3px 8px"
                minHeight="50px"
                style="border"
                color="blue"
                value={props.input}
                onChange={handleInputChange}
                onKeyUp={resize}
                onKeyDown={resize}
                disabled={props.view ? true : false}
            />
            <Textarea
                padding="3px 8px"
                minHeight="50px"
                style="border"
                color="green"
                value={props.output}
                onChange={handleOutputChange}
                onKeyUp={resize}
                onKeyDown={resize}
                disabled={props.view ? true : false}
            />
        </div>
    );
};

export default Example;
