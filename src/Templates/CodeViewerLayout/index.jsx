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
    const { storeMain, storeTask, storeCode } = props;

    useEffect(() => {
        storeMain.socket.on("code_exec", onExec);
        storeMain.socket.on("code_compile", onCompile);

        return () => {
            storeMain.socket.off("code_exec", onExec);
            storeMain.socket.off("code_compile", onCompile);
        };
    }, []);

    const onExec = (data) => {
        console.log("onExec", data);

        if (data.type !== "exit") {
            storeCode.addOutput(data.msg);
        }
    };

    const onCompile = (data) => {
        console.log("onCompile", data);
        storeCode.addOutput(data.msg);
        storeCode.addOutput("=====================");
    };

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
    const handleSubmission = (e) => {};

    const handleExcute = (e) => {
        console.log(storeTask.selectTask);
        storeCode.clearOutput();
        storeMain.socket.emit("message", {
            type: "code_exec",
            data: {
                studentId: storeMain.id,
                taskIdx: storeTask.selectTask.taskIdx,
                code: storeCode.code,
                language: storeTask.selectTask.language,
            },
        });

        /*
        Util.requestServer("test/submission", "POST", {
            studentId: storeMain.id,
            taskIdx: storeTask.selectTask.taskIdx,
            code: code,
            language: storeTask.selectTask.language,
        }).then(function (resp) {
            if (resp.code === 200) {
                setOutput(resp.body.output.output);
            }
        });*/
    };

    console.log(storeCode.output);
    outputElem = storeCode.output.map((item, i) => {
        return <pre key={i}>{item}</pre>;
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

export default inject(
    "storeMain",
    "storeTask",
    "storeCode"
)(observer(CodeViewerLayout));
