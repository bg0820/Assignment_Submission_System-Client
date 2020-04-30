import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import CodeViewerLayout from "@templates/CodeViewerLayout";
import Button from "@components/Button";

import * as Util from "@util";
import "./style.scss";

const resize = event => {
    let target = event.target;
    target.style.height = "1px";
    target.style.height = target.scrollHeight+"px";
}

const EditorViewerPage = props => {
    const [info, setInfo] = useState({
        title: '',
        content: '',
        language: '',
        example: []
    });


   useEffect(() => {
        Util.requestServer('task/detail', 'GET', {
            taskIdx: 15
        }).then(function(result) {
            if(result.code === 200) {
                setInfo( result.body.info);
            } else {
                //alert(result.body.msg);
            }
        });
   }, []);

   console.log(info);
   
   let childElement = info.example.map((item, idx) => {
        return (
            <div key={idx}>
                <div className="input">{item.input}</div>
                <div className="output">{item.output}</div>
            </div>
                
        )
    });

    return (
        <MainLayout>
            <CodeViewerLayout title={info.title} content={info.content} language={info.language} example={childElement}>

            <div className ="codeViewer">
            
            <textarea className= "codeArea" placeholder="코드를 입력하세요." onKeyUp={resize} onKeyDown={resize}>
            </textarea>
            
            <Button className="submit" value="제출" width="150px" height="50px" margin ="0px 10px 10px 0px">
            </Button>

            </div>

            </CodeViewerLayout>

        </MainLayout>
    );
};

export default EditorViewerPage;