import React, { useEffect, useState, useRef, memo } from "react"; 
 
import Input from "@components/Input"; 
import Button from "@components/Button"; 
import MainLayout from "@templates/MainLayout"; 
 
import "./style.scss"; 
 
const PwFind = (props) => { 
 
    return ( 
        <MainLayout> 
            <div className="PwFindPage"> 
                <div className="PwFind"> 
                    <p className="title">비밀번호 찾기</p> 
                    <div className="inputs"> 
                        <Input 
                            type="text" 
                            placeholder="아이디(학번)" 
                            margin="0px 0px 10px 0px" 
                            width="100%" 
                        ></Input> 
 
                        <Input 
                            type="email" 
                            placeholder="이메일" 
                            margin="0px 0px 10px 0px" 
                            width="100%" 
                        ></Input> 
                    </div> 
                    <div className="boxBottom"> 
                        <Button value="비밀번호 메일 보내기" height="50px"></Button> 
                    </div> 
                </div> 
            </div> 
        </MainLayout> 
    ); 
}; 
 
export default PwFind; 
