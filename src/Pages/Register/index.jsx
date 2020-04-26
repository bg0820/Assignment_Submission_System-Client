import React, { useEffect, useState, useRef, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";

import "./style.scss";

const RegisterPage = (props) => {

    const validation = () => {
        let div = document.createElement('div');
        div.innerHTML = document.getElementsByClassName('inputs')[0].innerHTML;

        let value = div.getElementsByTagName('input')[0].value;

        let id = /[0-9]{9}/;
        let email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        let otp = /[A-Z]{2}[0-9][A-Z][0-9]{6}/;

        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "아이디를 입력하지 않았습니다.";
        } else if(!id.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 아이디 형식입니다.";
        }

        value = div.getElementsByTagName('input')[1].value;
        let value2 = div.getElementsByTagName('input')[2].value;
        if(value=="" || value2=="") {
            document.getElementsByClassName('error')[0].innerHTML = "비밀번호를 입력하지 않았습니다.";
        } else if(value != value2) {
            document.getElementsByClassName('error')[0].innerHTML = "비밀번호가 일치하지 않습니다.";
        }

        value = div.getElementsByTagName('input')[3].value;
        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "이메일을 입력하지 않았습니다.";
        } else if(!email.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 이메일 형식입니다.";
        }

        value = div.getElementsByTagName('input')[4].value;
        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "OTP코드를 입력하지 않았습니다.";
        } else if(!otp.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 otp 코드입니다.";
        }
    }

    return (
        <MainLayout>
            <div className="RegisterPage">
                <div className="Register">
                    <p className="title">회원가입</p>

                    <form>

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
                    </form>
                    <div className="boxBottom">
                        <p className="error"></p>
                        <Button value="회원가입" height="50px" onClick={validation}></Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
