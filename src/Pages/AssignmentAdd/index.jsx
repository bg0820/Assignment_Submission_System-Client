import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import InputType from "@components/InputType";
import Button from "@components/Button";

import "./style.scss";

const AssignmentAddPage = props => {

    const resize = event => {
        let target = event.target;
        target.style.height = "1px";
        target.style.height = target.scrollHeight+"px";
    }

    const btnClick = event => {
        count++;
        let div = document.createElement('div');
        div.className = "example";
        div.innerHTML = document.getElementById('example').innerHTML;
        div.getElementsByTagName('p')[0].innerHTML = "[예시] 입력/출력 "+ count + ".";
        document.getElementById('bottom').appendChild(div);
    }

    let count = 1;
    return (
        <MainLayout>
            <div className="add">
                <div className="explain">
                    <form>
                        <div className="title">
                            <select name="language" className="language">
                                <option value="미선택" selected disabled hidden>언어 미선택</option>
                                <option value="c">C</option>
                                <option value="java">JAVA</option>
                                <option value="python">Python</option>
                                <option value="html">HTML</option>
                            </select>
                            <textarea className="text" onKeyUp={resize} onKeyDown={resize} placeholder="과제 명을 입력하세요."></textarea>
                        </div>
                        <div className="middle">
                            <textarea className="content" onKeyUp={resize} onKeyDown={resize} placeholder="과제 설명을 입력하세요."></textarea>
                            <div id="bottom" className="bottom">
                                <Button onClick={btnClick} width="75px" height="35px" value="예시 추가"></Button>
                                <div id="example" className="example">
                                    <p>[예시] 입력/출력 1.</p>
                                    <textarea className="input" onKeyUp={resize} onKeyDown={resize}></textarea>
                                    <textarea className="output" onKeyUp={resize} onKeyDown={resize}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default AssignmentAddPage;