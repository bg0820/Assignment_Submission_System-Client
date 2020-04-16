import React, { useEffect, useState, useRef, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";

import "./style.scss";

const RegisterPage = (props) => {
    return (
        <MainLayout>
            <div className="RegisterPage">
                <div className="Register">
                    <p className="title">회원가입</p>

                    <div className="inputs">
                        <Input
                            type="text"
                            placeholder="아이디"
                            margin="0px 0px 10px 0px"
                            width="100%"
                        ></Input>

                        <Input
                            type="password"
                            placeholder="비밀번호"
                            margin="0px 0px 10px 0px"
                            width="100%"
                        ></Input>

                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            margin="0px 0px 10px 0px"
                            width="100%"
                        ></Input>

                        <Input
                            type="email"
                            placeholder="이메일"
                            margin="0px 0px 10px 0px"
                            width="100%"
                        ></Input>
                        <Input
                            type="text"
                            placeholder="OTP코드"
                            margin="0px 0px 10px 0px"
                            width="100%"
                        ></Input>
                    </div>

                    <div className="boxBottom">
                        <p className="error">에러메세지 출력</p>
                        <Button value="회원가입" height="50px"></Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
