import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Example from "@components/Example";
import Language from "@components/Language";

import CodeOutput from '@components/Output';

import CodeHighlighter from "@components/CodeHighlighter";

import * as Util from "@util";
import "./style.scss";

const CodeViewerLayout = (props) => {
    const { storeMain, storeCode } = props;

    const [info, setInfo] = useState({
        title: "",
        content: "",
        language: "",
        example: [],
    });
    
    useEffect(() => {
        storeMain.socket.on("code_output", onOutput);

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
            storeMain.socket.off("code_output", onOutput);
        };
    }, []);


    const onOutput = (data) => {
        storeCode.addOutput(data);
    }

    const handleSubmission = (e) => {
        storeCode.clearOutput();
        console.log(info);

        storeMain.socket.emit("message", {
            type: "code_submit",
            data: {
                taskIdx: props.match.params.taskIdx,
                code: storeCode.code,
                language: info.language
            },
            token: sessionStorage["token"]
        });
    };

    const handleExcute = (e) => {
        storeCode.clearOutput();

        if(info.language == "HTML" || info.language == "html") {
            let win = window.open("", "new window");
            win.document.write(storeCode.code);
        } else {
            storeMain.socket.emit("message", {
                type: "code_exec",
                data: {
                    taskIdx: props.match.params.taskIdx,
                    code: storeCode.code,
                    language: info.language,
                    example: info.example
                },
                token: sessionStorage["token"]
            });
        }
    };


    let exampleListElem = info.example.map((item, i) => {
        return (
            <Example
                key={i}
                idx={i}
                view={true}
                input={item.input}
                output={item.output}
                showHidden={false}
            ></Example>
        );
    });
    let outputElem = storeCode.output.map((item, i) => {
        return <CodeOutput key={i} msg={item.msg} type={item.type}></CodeOutput>
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
                    <CodeHighlighter language={info.language}></CodeHighlighter>
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
    "storeCode"
)(observer(CodeViewerLayout));
