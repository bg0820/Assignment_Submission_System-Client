import React, { useEffect, useState, useRef, memo } from "react";

import Input from '@components/InputType';
import Button from '@components/Button';
import MainLayout from '@templates/MainLayout';

import "./style.scss";
import Main from "../../Store/Main";

const LoginPage = props => {
    return (
        <MainLayout>
            <div className="LoginPage">
                <div className="Login">
                    <p className="Title"> 성공회대학교 과제 제출 시스템 </p>
                

                    <div className="InfoInput">
                        <ul>
                            <li>
                                <Input className="Id" placeholder="아이디를 입력하세요." padding="0px 0px 3px 0px"/>
                            </li>
                            <li>
                                <Input className="Password" placeholder="비밀번호를 입력하세요." padding="0px 0px 3px 0px" />
                            </li>
                        </ul>
                    </div>

                    <div className="Bottom">
                        <input type="button" className="IdPwButton" value="아이디/비밀번호 찾기" />

                        <input type="button" className="EnrollButton" value="학생 계정 등록" />

                        <Button value="로그인" height="50px" ></Button>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default LoginPage;
