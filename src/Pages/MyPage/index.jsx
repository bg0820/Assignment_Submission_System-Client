import React, { useEffect, useState, useRef, memo } from "react"; 
 
import Input from "@components/Input"; 
import Button from "@components/Button"; 
import MainLayout from "@templates/MainLayout"; 
 
import "./style.scss"; 
 
const MyPage = (props) => { 
 
    return ( 
        <MainLayout> 
            <div className="MyPage"> 
                <div className="MyPageTop"> 
                    <p className="Title"> 회원 정보 수정 </p> 
 
                    <div className="InfoInput"> 
                        <div className="wrap"> 
                            <Input 
                                type="text" 
                                className="Id" 
                                placeholder="아이디를 입력하세요." 
                                margin="0px 0px 10px 0px" 
                            /> 
                            <Input 
                                type="password" 
                                className="Password" 
                                placeholder="비밀번호를 입력하세요." 
                                margin="0px 0px 10px 0px" 
                            /> 
                            <Input 
                                type="password" 
                                className="Password" 
                                placeholder="비밀번호 확인을 입력하세요." 
                                margin="0px 0px 10px 0px" 
                            /> 
                            <Input 
                                type="text" 
                                className="Password" 
                                placeholder="이메일을 입력하세요" 
                                margin="0px 0px 10px 0px" 
                            /> 
                        </div> 
                    </div> 
 
                    <div className="Bottom"> 
 
                        <Button 
                            value="수정" 
                            height="50px"> 
                        </Button> 
                    </div> 
                </div> 
            </div> 
        </MainLayout> 
    ); 
}; 
 
export default MyPage; 
