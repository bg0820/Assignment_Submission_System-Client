import React, { useEffect, useState, useRef, memo } from "react"; 
import { observer, inject } from "mobx-react";

import Input from "@components/Input"; 
import Button from "@components/Button"; 
import MainLayout from "@templates/MainLayout"; 

import * as Util from "@util";
import "./style.scss"; 
 
const MyPage = (props) => { 

    const { storeMain } = props;
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
    
    }, []);

    const handlePwChange = (e) => {
        setPw(e.target.value);
    };

    const handlePwConfirmChange = (e) => {
        setPwConfirm(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const modifiedBtn = async (e) => {
        let isValidate = validation();

        if(isValidate) {
            Util.requestServer("mypage/change", "POST", {
                pw:pw,
                email:email,
            }).then(function (result) {
                if(result.code == 200) {
                    alert(result.body.msg);
                    setId(result.body.id);
                    sessionStorage.clear();
                    props.history.push('/login');
                } else {
                    alert(result.body.msg);
                }
            });
        }
    };


    const validation = () => {
        let emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

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
            <div className="MyPage"> 
                <div className="MyPageTop"> 
                    <p className="Title"> 회원 정보 수정 </p> 
 
                    <div className="InfoInput"> 
                        <div className="wrap"> 
                            <Input 
                                type="text" 
                                className="Id" 
                                value={storeMain.id}
                                margin="0px 0px 10px 0px" 
                            disabled/> 
                            <Input 
                                type="password" 
                                className="Password" 
                                placeholder="비밀번호를 입력하세요." 
                                value={pw}
                                onChange={handlePwChange}
                                margin="0px 0px 10px 0px" 
                            /> 
                            <Input 
                                type="password" 
                                className="Password" 
                                placeholder="비밀번호 확인을 입력하세요." 
                                value={pwConfirm}
                                onChange={handlePwConfirmChange}
                                margin="0px 0px 10px 0px" 
                            /> 
                            <Input 
                                type="text" 
                                className="Password" 
                                placeholder="이메일을 입력하세요" 
                                value={email}
                                onChange={handleEmailChange}
                                margin="0px 0px 10px 0px" 
                            /> 
                        </div> 
                    </div> 
 
                    <div className="Bottom"> 
                        <p className="error">{error}</p>
                        <Button 
                            value="수정" 
                            height="50px"
                            onClick={modifiedBtn}> 
                        </Button> 
                    </div> 
                </div> 
            </div> 
        </MainLayout> 
    ); 
}; 
 
export default inject("storeMain")(memo(MyPage)); 
