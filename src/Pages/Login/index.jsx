import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import Input from "@components/Input";
import Button from "@components/Button";
import MainLayout from "@templates/MainLayout";

import * as Util from "@util";
import "./style.scss";

const LoginPage = (props) => {
    const { storeMain } = props;
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
        }).then(async function (result) {
            if (result.code == 200) {
                sessionStorage["token"] = result.body.token;

                let resp = await Util.requestServer("auth/info", "get", {});
                storeMain.login(
                    resp.body.info.id,
                    resp.body.info.name,
                    resp.body.info.userType
                );
                alert(result.body.msg);

                props.history.push("/");
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
                        <div className="wrap">
                            <Input
                                type="text"
                                className="Id"
                                placeholder="아이디를 입력하세요."
                                value={id}
                                onChange={handleIdChange}
                                margin="0px 0px 10px 0px"
                            />
                            <Input
                                type="password"
                                className="Password"
                                placeholder="비밀번호를 입력하세요."
                                value={pw}
                                onChange={handlePwChange}
                                margin="0px 0px 10px 0px"
                            />
                        </div>
                    </div>

                    <div className="Bottom">
                        <div className="findDirect">
                            <Link to="/register">아이디/비밀번호 찾기</Link>
                        </div>

                        <div className="regDirect">
                            <Link to="/register">학생 계정 등록</Link>
                        </div>
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

export default inject("storeMain")(memo(LoginPage));
