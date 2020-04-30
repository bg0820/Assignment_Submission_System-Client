import React, { useEffect, useState, useRef, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";
import * as Util from "@util";

import "./style.scss";

const RegisterPage = (props) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    
    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePw1Change = (e) => {
        setPw1(e.target.value);
    };

    const handlePw2Change = (e) => {
        setPw2(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const registerBtn = async (e) => {

        let isValidate = await validation();
        console.log(isValidate);

        if(isValidate) {
            Util.requestServer("auth/register", "POST", {
                id: id,
                name: name,
                pw: pw1,
                email: email,
                otp: otp,
            }).then(function (result) {
                console.log(result);
                if(result.code == 200) {
                    alert(result.body.msg);
                } else {
                    alert(result.body.msg);
                }
            });
        }
        
    };


    const validation = () => {
        
        let div = document.createElement('div');
        div.innerHTML = document.getElementsByClassName('inputs')[0].innerHTML;

        let value = div.getElementsByTagName('input')[0].value;

        let id = /[0-9]{9}/;
        let email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        let otp = /[A-Z]{2}[0-9][A-Z][0-9]{6}/;

        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "아이디를 입력하지 않았습니다.";
            return false;
        } else if(!id.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 아이디 형식입니다.";
            return false;
        } 

        value = div.getElementsByTagName('input')[1].value;
        if(value=="") {
            document.getElementsByClassName('error').innerHTML = "이름을 입력하지 않았습니다.";
            return false;
        }

        value = div.getElementsByTagName('input')[2].value;
        let value2 = div.getElementsByTagName('input')[3].value;
        if(value=="" || value2=="") {
            document.getElementsByClassName('error')[0].innerHTML = "비밀번호를 입력하지 않았습니다.";
            return false;
        } else if(value != value2) {
            document.getElementsByClassName('error')[0].innerHTML = "비밀번호가 일치하지 않습니다.";
            return false;
        }

        value = div.getElementsByTagName('input')[4].value;
        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "이메일을 입력하지 않았습니다.";
            return false;
        } else if(!email.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 이메일 형식입니다.";
            return false;
        }

        value = div.getElementsByTagName('input')[5].value;
        if(value=="") {
            document.getElementsByClassName('error')[0].innerHTML = "OTP코드를 입력하지 않았습니다.";
            return false;
        } else if(!otp.test(value)) {
            document.getElementsByClassName('error')[0].innerHTML = "적합하지 않은 otp 코드입니다.";
            return false;
        }
        
        document.getElementsByClassName('error')[0].innerHTML="";

        return true;
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
                                placeholder="아이디(학번)"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={id}
                                onChange={handleIdChange}
                            ></Input>

                            <Input
                                type="name"
                                placeholder="이름"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={name}
                                onChange={handleNameChange}
                            ></Input>

                            <Input
                                type="password"
                                placeholder="비밀번호"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={pw1}
                                onChange={handlePw1Change}
                            ></Input>

                            <Input
                                type="password"
                                placeholder="비밀번호 확인"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={pw2}
                                onChange={handlePw2Change}
                            ></Input>

                            <Input
                                type="email"
                                placeholder="이메일"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={email}
                                onChange={handleEmailChange}
                            ></Input>
                            <Input
                                type="text"
                                placeholder="OTP코드"
                                margin="0px 0px 10px 0px"
                                width="100%"
                                value={otp}
                                onChange={handleOtpChange}
                            ></Input>
                        </div>
                    </form>
                    <div className="boxBottom">
                        <p className="error"></p>
                        <Button value="회원가입" height="50px" onClick={registerBtn}></Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
