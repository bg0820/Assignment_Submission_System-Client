import React, { useEffect, useState, useRef, memo } from "react";

import Language from '@components/Language';
import "./style.scss";


const CodeViewerLayout = props => {

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

export default CodeViewerLayout;