import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Language from '@components/Language';

import * as Util from "@util";
import "./style.scss";

const CodeViewerLayout = props => {
    const { storeTask } = props;
    const [info, setInfo] = useState(null);

    useEffect(() => {
        Util.requestServer('task/detail', 'GET', {
            taskIdx: storeTask.selectTaskIdx
        }).then(function(resp) {
            let body = resp.body;

            if(resp.code === 200) {
                setInfo(resp.body.info);
            }
        });
    }, []);

    return (
        <div className="main">
            <div className="explain">
                <div className="title">
                    <Language language={props.language}/>
                    <p className="text">{props.title}</p>
                </div>
                <div className="middle">
                    <div className="description">
                        <p className="content">{props.content}</p>
                    </div>
                    <div className="bottom">
                        <p className="escape">[Escape 설명]</p>
                        <p>줄바꿈</p>
                        <div className="example">
                            <p>[예시] 입력/출력 1.</p>
                            {props.example}
                        </div>
                    </div>
                </div>

            </div>
            <div className="codeEditor">{props.children}</div>

        </div>
    );

};

export default inject('storeTask')(observer(CodeViewerLayout));