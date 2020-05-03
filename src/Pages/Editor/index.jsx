import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import CodeViewerLayout from "@templates/CodeViewerLayout";
import CodeEditorLayout from "@templates/CodeEditorLayout";

import * as Util from "@util";

const EditorPage = (props) => {
    const { storeMain, storeTask } = props;

    const [info, setInfo] = useState({
        title: "",
        content: "",
        language: "",
        example: [],
    });

    useEffect(() => {
        Util.requestServer("task/detail", "GET", {
            taskIdx: props.match.params.id,
        }).then(function (resp) {
            let body = resp.body;

            if (resp.code === 200) {
                setInfo(body.info);
            }
        });
    }, []);

    let codeElem = null;
    if (storeMain.userType === 0) {
        console.log("학생");
        codeElem = (
            <CodeViewerLayout
                id={props.match.params.id}
                title={info.title}
                content={info.content}
                language={info.language}
                example={info.example}
            ></CodeViewerLayout>
        );
    } else {
        console.log("교수");
        codeElem = <CodeEditorLayout></CodeEditorLayout>;
    }

    return <MainLayout>{codeElem}</MainLayout>;
};

export default inject("storeMain")(observer(EditorPage));
