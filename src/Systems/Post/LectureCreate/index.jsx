import React, { Fragment, useEffect, useState, memo } from "react";
import { observer, inject } from "mobx-react";

import Input from "@components/Input";
import Button from "@components/Button";
import ComboBox from "@components/ComboBox";
import Table from "@components/Table";
import Modal from "@templates/Modal";

import deleteIcon from "@asset/trash.svg";
import * as Util from "@util";

import "./style.scss";

const LectureCreate = (props) => {
    const { storeMain, storeModal, storeLecture } = props;

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("none");
    const [studentName, setStudentName] = useState("");
    const [visible, setVisible] = useState(false);
    const [originalUserList, setOriginalUserList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        Util.requestServer("user/list", "GET", {}).then(function (resp) {
            if (resp.code === 200) {
                console.log(resp.body);
                setOriginalUserList(resp.body.list);
            } else {
                alert(resp.body.msg);
            }
        });

        if (storeModal.modalTitle != "강의 생성"){
            Util.requestServer("course/info", "GET", {
                courseIdx: storeModal.modalData,
            }).then(function (resp) {
                if (resp.code === 200) {
                    let data = resp.body.info;

                    setTitle(data.courseName);
                    setLanguage(data.language);
                    setData(data.userList);
                } else {
                    alert(resp.body.msg);
                }
            });
        }
    }, []);


    const clickUserDelete = (idx, item) => {
        let newArr = [];
        for(var i = 0 ; i < data.length; i++) {
            if(data[i].userIdx != item.userIdx)
                newArr.push(data[i]);
        }

        setData(newArr);
    }

    const handleStudentName = (e) => {
        setStudentName(e.target.value);

        let listItem = originalUserList.filter((item) => {
            return (item.id + " - " + item.name).includes(studentName);
        });
        setUserList(listItem);

        if (studentName.length !== 0) setVisible(true);
        else setVisible(false);
    };

    const handleItemClick = (idx, e) => {
        setData(data.concat(userList[idx]));
        setVisible(false);
    };

    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    };

    const handleCreateLecture = (e) => {
        if (language === "none") {
            alert("언어를 선택해주세요.");
            return;
        }

        let userIdxList = [];
        for (var i = 0; i < data.length; i++) userIdxList.push(data[i].userIdx);

        if(storeModal.modalData) {
            Util.requestServer("course/edit", "POST", {
                courseIdx: storeModal.modalData,
                courseName: title,
                language: language,
                userIdxList: userIdxList,
            }).then(function (resp) {
                if (resp.code === 200) {
                    alert(resp.body.msg);
                    window.location.reload(true);
                }
            });
        } else {
            Util.requestServer("course/create", "POST", {
                courseName: title,
                language: language,
                userIdxList: userIdxList,
            }).then(function (resp) {
                if (resp.code === 200) {
                    alert(resp.body.msg);
                    window.location.reload(true);
                }
            });
        }
    };

    let headerItem = [
        {
            text: "이름",
            align: "left",
            width: "100px",
        },
        {
            text: "학번",
            align: "left",
        },
    ];

    let userListElem = userList.map((item, idx) => {
        return (
            <p key={idx} onClick={(e) => handleItemClick(idx, e)}>
                {item.id} - {item.name}{" "}
            </p>
        );
    });

    let childElement = null;

    if(storeModal.modalData) {
        childElement = data.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td align="left">{item.name}</td>
                    <td align="left">{item.id}</td>
                    <td align="center">
                        <div>
                            <img
                                className="lectureIcon"
                                src={deleteIcon}
                                onClick={(e) =>{clickUserDelete(idx, item)}}
                            ></img>
                        </div>
                    </td>
                </tr>
            );
        });
    }
    else {
        childElement = data.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td align="left">{item.name}</td>
                    <td align="left">{item.id}</td>
                </tr>
            );
        });
    }

    let searchResultVisible = "none";
    if (visible) searchResultVisible = "block";
    if (userList.length === 0 || studentName.length === 0)
        searchResultVisible = "none";

    return (
        <Modal>
            <div className="LectureCreate">
                <Input
                    className="Id"
                    placeholder="강의명을 입력하세요."
                    height="small"
                    margin="0px 0px 15px 0px"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                />
                <ComboBox
                    className="selectLanguage"
                    height="40px"
                    margin="0px 0px 15px 0px"
                    value={language}
                    onChange={handleLanguage}
                />
                <p className="item_title">학생 추가</p>

                <div className="studentSearch">
                    <Input
                        className="Password"
                        placeholder="학생 이름"
                        height="small"
                        onChange={handleStudentName}
                        value={studentName}
                    />
                    <div
                        className="searchResult"
                        style={{ display: searchResultVisible }}
                    >
                        {userListElem}
                    </div>
                </div>

                <div className="tableStyle">
                    <Table header={headerItem} className="studentTable">
                        {childElement}
                    </Table>
                </div>

                <Button
                    value={storeModal.modalData ? "강의 수정" : "강의 생성"}
                    height="50px"
                    onClick={handleCreateLecture}
                ></Button>
            </div>
        </Modal>
    );
};

export default inject(
    "storeModal"
)(LectureCreate);
