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

    const [info, setInfo] = useState({
        title: "",
        content: "",
        language: "",
        example: [],
    });

    useEffect(() => {
        storeMain.socket.on("code_exec", onExec);
        storeMain.socket.on("code_compile", onCompile);
        storeMain.socket.on("code_submit", onSubmit);

        if (props.id) {
            Util.requestServer("task/detail", "GET", {
                taskIdx: props.id,
            }).then(function (resp) {
                let body = resp.body;

                if (resp.code === 200) {
                    setInfo({
                        ...info,
                        title: body.info.title,
                        content: body.info.content,
                        language: body.info.language,
                        example: body.info.example,
                    });
                }
            });
        }

        return () => {
            storeMain.socket.off("code_exec", onExec);
            storeMain.socket.off("code_compile", onCompile);
            storeMain.socket.off("code_submit", onSubmit);
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

    const onSubmit = (data) => {
        console.log("onSubmit", data);
        alert(data.msg);

        if(data.type == 'result') {
            if(data.result === 'success') {
                props.history.replace("/" + props.match.params.courseIdx);
                storeMain.setMenu('assignmentList');
            } else if(data.result === 'failed') {
                alert(data.msg);
            }
            
        }
    }

    let outputElem = null;
    let exampleListElem = info.example.map((item, i) => {
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
    const handleSubmission = (e) => {
        storeMain.socket.emit("message", {
            type: "code_submit",
            data: {
                studentId: storeMain.id,
                taskIdx: storeTask.selectTask.taskIdx,
                code: storeCode.code,
                language: storeTask.selectTask.language,
                userIdx: storeMain.userIdx,
            },
            token: sessionStorage["token"]
        });
    };

    const handleExcute = (e) => {
        console.log(storeTask.selectTask);
        storeCode.clearOutput();

        if(info.language == "HTML" || info.language == "html") {
            let win = window.open("", "new window");
            win.document.write(storeCode.code);
        } else {
            storeMain.socket.emit("message", {
                type: "code_exec",
                data: {
                    studentId: storeMain.id,
                    taskIdx: storeTask.selectTask.taskIdx,
                    code: storeCode.code,
                    language: storeTask.selectTask.language,
                },
                token: sessionStorage["token"]
            });
        }
    };

    outputElem = storeCode.output.map((item, i) => {
        return <pre key={i}>{item}</pre>;
    });
    return (
        <div className="CodeViewerLayout">
            <div className="explain">
                <div className="title">
                    <Language language={info.language}></Language>
                    <p className="text">{info.title}</p>
                </div>
                <div className="middle">
                    <div className="top">
                        <p className="text">{info.content}</p>
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
