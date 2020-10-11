import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";
import './style.scss';

const CodeOuput = (props) => {
    let clsName = 'output'


    if(props.type) {
        if(props.type === 'out') {
            clsName += ' style-out';
        } else if(props.type === 'err') {
            clsName += ' style-error';
        } else if(props.type === 'result_failed') {
            clsName += ' style-error';
        } else if(props.type === 'result_success') {
            clsName += ' style-score';
        } else if(props.type === 'submit_success') {
            clsName += ' style-score';
        } else if(props.type === 'submit_failed') {
            clsName += ' style-error';
        }
    }

    return (
        <div className="CodeOutput">
            <pre className={clsName}>
                {props.msg}
            </pre>
        </div>
    )
}

export default CodeOuput;