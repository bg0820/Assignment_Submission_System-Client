import React, { useEffect, useState, useRef, memo } from "react";

import Input from '@components/InputType';
import Button from '@components/Button';
import MainLayout from '@templates/MainLayout';

import "./style.scss";
import Main from "../../Store/Main";

const CreateLecturePage = props => {
    return (
        <MainLayout>
            <div className="CreateLecturePage">
                <div className="CreateLecture">
                    <p className="Title"> 강의 생성 </p>
                

                    <div className="InfoInput">
                        <ul>
                            <li>
                                <Input className="Id" placeholder="강의명을 입력하세요." padding="0px 0px 3px 0px"/>
                            </li>
                            <li>
                                <select className="selectLanguage">
                                
                                    <option value = "default">언어를 선택하세요.</option>
                                    <option value = "java">Java</option>
                                    <option value = "html">Html</option>
                                    <option value = "python">Python</option>
                                    <option value = "c">C</option>
                                
                                </select>
                            </li>
                            <li>
                                <Input className="Password" placeholder="학생 이름" padding="0px 0px 3px 0px" />
                            </li>
                        </ul>

                        <Button value="강의 생성" height="50px" ></Button>
                    </div>

                    

                </div>
            </div>
        </MainLayout>
    );
};

export default CreateLecturePage;
