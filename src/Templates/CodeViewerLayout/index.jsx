import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Example from "@components/Example";
import Language from "@components/Language";

import CodeHighlighter from "@components/CodeHighlighter";

import * as Util from "@util";
import "./style.scss";

const CodeViewerLayout = (props) => {
    const { storeMain, storeTask } = props;
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]);

    let outputElem = null;
    let exampleListElem = props.example.map((item, i) => {
        return (
            <Example
                key={i}
                idx={i}
                view={true}
                input={item.input}
                output={item.output}
            ></Example>
        );
    });

    const handleCode = (e) => {
        setCode(e.target.value);
    };

    const handleSubmission = (e) => {};

    const handleExcute = (e) => {
        console.log(storeTask.selectTask);

        Util.requestServer("test/submission", "POST", {
            studentId: storeMain.id,
            taskIdx: storeTask.selectTask.taskIdx,
            code: code,
            language: storeTask.selectTask.language,
        }).then(function (resp) {
            if (resp.code === 200) {
                setOutput(resp.body.output.output);
            }
        });
    };

    outputElem = output.map((item, i) => {
        return <pre key={i}>{item.data}</pre>;
    });
    return (
        <div className="CodeViewerLayout">
            <div className="explain">
                <div className="title">
                    <Language language={props.language}></Language>
                    <p className="text">{props.title}</p>
                </div>
                <div className="middle">
                    <div className="top">
                        <p className="text">{props.content}</p>
                    </div>
                    <div className="bottom">
                        <hr />
                        <div className="exampleArea">{exampleListElem}</div>
                    </div>
                </div>
            </div>
            <div className="code">
                <p className="testTitle">코드 테스트</p>
                <div className="editor">
                    <CodeHighlighter></CodeHighlighter>
                </div>
                <div className="result">
                    <div className="outputMsgArea">{outputElem}</div>
                    <div className="buttons">
                        <Button
                            width="75px"
                            height="35px"
                            value="실행"
                            color="green"
                            margin="0px 10px 0px 0px"
                            onClick={handleExcute}
                        ></Button>
                        <Button
                            width="75px"
                            height="35px"
                            value="제출"
                            onClick={handleSubmission}
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default inject("storeMain", "storeTask")(observer(CodeViewerLayout));
