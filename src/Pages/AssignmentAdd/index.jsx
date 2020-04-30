import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Example from '@components/Example';
import * as Util from "@util";

import "./style.scss";

const AssignmentAddPage = props => {

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("none");
    const [content, setContent] = useState("");

    const [exampleList, setExampleList] = useState([]);
    const [expire, setExpire] = useState("");
    const [extendType, setExtendtype] = useState(false);
    const [extend, setExtend] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleExpireChange = (e) => {
        setExpire(e.target.value);
    };

    const handleExtendTypeChange = (e) => {
        setExtendtype(!extendType);
    }

    const handleExtendChange = (e) => {
        setExtend(e.target.value);
    };
   
    const resize = event => {
        let target = event.target;
        target.style.height = "1px";
        target.style.height = target.scrollHeight+"px";
    }

    const btnClick = event => {
        console.log("추가");
        setExampleList(exampleList.concat({
            input: '',
            output: ''
        }));
    }

    const inputChange = (idx, value) => {
        setExampleList(exampleList.map((item, i) =>{
            return (i == idx ? {
                ...item,
                input: value
            } : item)
        }));
    }

    const outputChange = (idx, value) => {
        setExampleList(exampleList.map((item, i) =>{
            return (i == idx ? {
                ...item,
                output: value
            } : item)
        }));
    }

    const createBtn = (e) => {
        Util.requestServer("task/create", "POST", {
            title: title,
            language: language,
            content: content,
            exampleList: exampleList,
            expire: expire,
            extendType: extendType,
            extend: extend,
        }).then(function (result) {
            console.log(result);
            if (result.code == 200) {
                alert(result.body.msg);
            } else {
                alert(result.body.msg);
            }
        });
    }

    let exampleListElem = exampleList.map((item, i) => {
        return (
            <Example 
                key={i} 
                idx={i} 
                inputChange={inputChange} 
                outputChange={outputChange}
                input={item.input}
                output={item.output}></Example>
        )
    });

    return (
        <MainLayout>
            <div className="AssignmentAdd">
                <div className="explain">
                        <div className="title">
                            <select name="language" value={language} onChange={handleLanguageChange} className="language">
                                <option value="none" disabled hidden>언어 미선택</option>
                                <option value="c">C</option>
                                <option value="java">JAVA</option>
                                <option value="python">Python</option>
                                <option value="html">HTML</option>
                            </select>
                            
                            <Textarea 
                                padding="5px 0px 0px 5px" 
                                value={title}
                                height="35px" 
                                onChange={handleTitleChange} 
                                onKeyUp={resize} 
                                onKeyDown={resize} 
                                placeholder="과제 명을 입력하세요."
                                margin="0px 0px 5px 0px"></Textarea>
                        </div>
                        <div className="middle">
                            <Textarea 
                                padding="5px 0px 0px 5px" 
                                value={content}
                                height="35px" 
                                onChange={handleContentChange} 
                                onKeyUp={resize} 
                                onKeyDown={resize} 
                                placeholder="과제 설명을 입력하세요."
                                margin="0px"></Textarea>
                            <hr/>
                            <div id="bottom" className="bottom">
                                <Button 
                                    onClick={btnClick} 
                                    width="75px" 
                                    height="35px" 
                                    margin="0px 0px 10px 0px"
                                    value="예시 추가"></Button>
                                {exampleListElem}
                            </div>
                            <hr/>
                            <div className="date">
                                <div className="wrap">
                                    <p className="item_title">제출 기한 설정</p>
                                    <Input type="date" value={expire} onChange={handleExpireChange} className="expire" placeholder="마감 날짜" height="small"></Input>
                                </div>
                                <div className="wrap">
                                    <p className="item_title">연장 기한 설정</p>
                                    <div className="extend">
                                        <label htmlFor="extendType" className="typeLabel">
                                        <input type="checkbox" checked={extendType} onChange={handleExtendTypeChange} id="extendType" className="extendType"/>연장 여부</label>
                                        <Input type="date" value={extend} onChange={handleExtendChange} className="extendDate" placeholder="연장 날짜" height="small" width="70%"></Input>
                                    </div>  
                                </div>
                               
                            </div>
                        </div>
                </div>
                <div className="code">
                    <p className="testTitle">코드 테스트</p>
                    <div className="editor">
                        <textarea className="content"></textarea>
                    </div>
                    <div className="result">
                        <div className="buttons">
                            <Button width="75px" height="35px" value="실행" color="green" margin="0px 10px 0px 0px"></Button>
                            <Button width="75px" height="35px" value="생성" onClick={createBtn}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AssignmentAddPage;