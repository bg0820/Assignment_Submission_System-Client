import React, { useEffect, useState, useRef, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";
import * as Util from "@util";

import "./style.scss";

const RegisterPage = (props) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    // const [otp, setOtp] = useState("");
    
    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePwChange = (e) => {
        setPw(e.target.value);
    };

    const handlePwConfirmChange = (e) => {
        setPwConfirm(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const registerBtn = async (e) => {
        let isValidate = validation();

        if(isValidate) {
            Util.requestServer("auth/register", "POST", {
                id: id,
                name: name,
                pw: pw,
                email: email
            }).then(function (result) {
                if(result.code == 200) {
                    alert(result.body.msg);
                    props.history.push('/login');
                } else {
                    alert(result.body.msg);
                }
            });
        }
    };


    const validation = () => {
        let idRegex = /[0-9]{9}/;
        let emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        let otp = /[A-Z]{2}[0-9][A-Z][0-9]{6}/;

        if(id=="") {
            setError("아이디를 입력하지 않았습니다.");
            return false;
        } else if(!idRegex.test(id)) {
            setError("적합하지 않은 아이디 형식입니다.");
            return false;
        } 

        if(name=="") {
            setError("이름을 입력하지 않았습니다.");
            return false;
        }


        if(pw=="" || pwConfirm=="") {
            setError("비밀번호를 입력하지 않았습니다.");
            return false;
        } else if(pw != pwConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return false;
        }

        if(email=="") {
            setError("이메일을 입력하지 않았습니다.");
            return false;
        } else if(!emailRegex.test(email)) {
            setError("적합하지 않은 이메일 형식입니다.");
            return false;
        }

        return true;
    }

    return (
        <MainLayout>
            <div className="RegisterPage">
                <div className="Register">
                    <p className="title">회원가입</p>
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
                            value={pw}
                            onChange={handlePwChange}
                        ></Input>

                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            margin="0px 0px 10px 0px"
                            width="100%"
                            value={pwConfirm}
                            onChange={handlePwConfirmChange}
                        ></Input>

                        <Input
                            type="email"
                            placeholder="이메일"
                            margin="0px 0px 10px 0px"
                            width="100%"
                            value={email}
                            onChange={handleEmailChange}
                        ></Input>
                    </div>
                    <div className="boxBottom">
                        <p className="error">{error}</p>
                        <Button value="회원가입" height="50px" onClick={registerBtn}></Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
