import React, { useEffect, useState, useRef, memo } from "react";

import "./style.scss";

const CodeViewerLayout = props => {

    return (
        <div className="main">
            <div className="explain">
                <div className="title">
                    <div className="language">C</div>
                    <p className="text">* 을 이용하여 삼각형을 출력 하세요. 글이 길어서 줄을 바꿀때는 이런식 으로 표시됩니다.</p>
                </div>
                <div className="middle">
                    <div className="description">
                        <p className="content">과제 설명</p>
                    </div>
                    <div className="bottom">
                        <p className="escape">[Escape 설명]</p>
                        <p>줄바꿈</p>
                        <div className="example">
                            <p>[예시] 입력/출력 1.</p>
                            <div className="input">3</div>
                            <div className="output">
                                *<br />
                                    **<br />
                                    ***
                                </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="codeEditor"></div>
        </div>
    );

};

export default CodeViewerLayout;