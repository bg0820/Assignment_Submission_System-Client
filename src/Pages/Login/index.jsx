import React, { useEffect, useState, useRef, memo } from "react";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";

import Main from "../../Store/Main";
import * as Util from "@util";
import "./style.scss";

const LoginPage = (props) => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePwChange = (e) => {
        setPw(e.target.value);
    };
    const loginBtn = (e) => {
        Util.requestServer("auth/login", "POST", {
            id: id,
            pw: pw,
        }).then(function (result) {
            console.log(result);
            if (result.code == 200) {
                alert(result.body.msg);
            } else {
                alert(result.body.msg);
            }
        });
    };

    return (
        <MainLayout>
            <div className="LoginPage">
                <div className="Login">
                    <p className="Title"> 성공회대학교 과제 제출 시스템 </p>

                    <div className="InfoInput">
                        <ul>
                            <li>
                                <Input
                                    type="text"
                                    className="Id"
                                    placeholder="아이디를 입력하세요."
                                    padding="0px 0px 3px 0px"
                                    value={id}
                                    onChange={handleIdChange}
                                />
                            </li>
                            <li>
                                <Input
                                    type="password"
                                    className="Password"
                                    placeholder="비밀번호를 입력하세요."
                                    padding="0px 0px 3px 0px"
                                    value={pw}
                                    onChange={handlePwChange}
                                />
                            </li>
                        </ul>
                    </div>

                    <div className="Bottom">
                        <input
                            type="button"
                            className="IdPwButton"
                            value="아이디/비밀번호 찾기"
                        />

                        <input
                            type="button"
                            className="EnrollButton"
                            value="학생 계정 등록"
                        />

                        <Button
                            value="로그인"
                            height="50px"
                            onClick={loginBtn}
                        ></Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LoginPage;
