import React, { useEffect, useState, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";

import "./style.scss";

const TalkLayout = (props) => {
    const [title, setTitle] = useState("");

    const inputControl = () => {
        if(props.title.indexOf("공지") == 1) {
            //userType이 교수면 input 사용가능
            // 학생이면 input에 disable 넣기
        }
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const btnClick = (e) => {
        
    };

    return (
        <div className="TalkLayout">
            <p className="title">{props.title}</p>
            <div className="talk">
                <div className="leftTalk">
                    
                </div>
                <div className="rightTalk">
                    
                </div>
            </div>
            <div className="bottom">
                <Input value={title} onChange={handleTitleChange} placeholder="내용을 입력하세요." height="40px" margin="0px 10px 0px 0px"></Input>
                <Button onClick={btnClick} value="전송" width="110px" height="40px" margin="10px 0px 0px 0px"></Button>
            </div>
        </div>
    );
}

export default TalkLayout;

