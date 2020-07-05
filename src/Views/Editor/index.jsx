import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import CodeViewerLayout from "@templates/CodeViewerLayout";
import CodeEditorLayout from "@templates/CodeEditorLayout";

import * as Util from "@util";

const EditorView = (props) => {
    const { storeMain, storeTask } = props;

    /*
    const [info, setInfo] = useState({
        title: "",
        content: "",
        language: "",
        example: [],
    });

    useEffect(() => {
        if (props.match.params.taskIdx) {
            Util.requestServer("task/detail", "GET", {
                taskIdx: props.match.params.taskIdx,
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
	}, []);
	*/

    let codeElem = null;
    if (storeMain.userType === 0) {
        console.log("학생");
        codeElem = (
            <CodeViewerLayout
                id={props.match.params.taskIdx}
            ></CodeViewerLayout>
        );
    } else {
        console.log("교수");
        codeElem = (
            <CodeEditorLayout
                id={props.match.params.taskIdx}
            ></CodeEditorLayout>
        );
    }

    return codeElem;
};

export default inject("storeMain")(observer(EditorView));
