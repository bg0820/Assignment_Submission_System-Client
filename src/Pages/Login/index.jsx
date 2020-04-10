import React, { useEffect, useState, useRef, memo } from "react";
import "./login.scss";

const LoginPage = props => {
    return (

        <div className="MainLayout">
            <div className="Login">
                <div className="Title">
                    <p> 성공회대학교 과제 제출 시스템 </p>
                </div>

                <div className="InfoInput">
                    <ul>
                        <li>
                            <input className="Id" placeholder="아이디를 입력하세요."/>
                        </li>
                        <li>
                            <input className="Password" placeholder="비밀번호를 입력하세요." />
                        </li>
                    </ul>
                </div>

                <div className="Bottom">
                    <input type="button" className="IdPwButton" value="아이디/비밀번호 찾기">
    
                    </input>

                    <input type="button" className="EnrollButton" value="학생 계정 등록">
    
                    </input>

                    <input type="button" className="LoginButton" value="로그인">
    
                    </input>
                </div>

            </div>
        </div>

    );
};

export default LoginPage;
