import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";
import Table from "@components/Table";
import Language from "@components/Language";
import FloatingMenu from "@components/FloatingMenu";

import editIcon from "@asset/edit.svg";
import deleteIcon from "@asset/trash.svg";

import * as Util from "@util";

const LectureListView = (props) => {
    const { storeMain, storeModal, storeLecture } = props;
    const [list, setList] = useState([]);

    let headerItem = [];
    let childElement = null;
    let createBtnElem = null;

    useEffect(() => {
        Util.requestServer("course/list", "GET", {}).then(function (result) {
            if (result.code === 200) {
                setList(result.body.list);
            }

            Util.requestServer("task/list/nonAssignment", "GET", {}).then(
                async function (result) {
                    if (result.code === 200) {
                        storeMain.setNonAssignment(result.body.list.length);
                    }
                }
            );
        });

        return () => {
            
        };
    }, []);

    const handleLecture = (item) => {
        storeLecture.selectLectureItem(item);

        props.history.replace("/" + item.courseIdx);
        storeMain.socket.emit("message", {
            token: sessionStorage.token,
            type: "join",
            data: {
                courseIdx: item.courseIdx,
            }
        });

        Util.requestServer("course/info", "GET", {
            courseIdx: item.courseIdx
        }).then(async function (result) {
            storeLecture.selectLectureItem(result.body.info);
            storeMain.setMenu("assignmentList");
        });
    };

    const handleFloating = (e) => {
        storeModal.modalCall({
            modalView: "createLecture",
            modalTitle: "강의 생성",
        });
    };

    const clickEdit = (item) => {
        storeModal.modalCall({
            modalView: "createLecture",
            modalTitle: "강의 수정",
            modalData: item.courseIdx,
        });
    };

    const clickDelete = (item) => {
        console.log(item.courseIdx);

        Util.requestServer("course/delete", "POST", {
            courseIdx: item.courseIdx,
        }).then(function (result) {});
    };

    if (storeMain.userType === 0) {
        headerItem = [
            {
                text: "교수 이름",
                width: "100px",
                align: "center",
            },
            {
                text: "수강 강의명",
                align: "left",
            },
            {
                text: "언어",
                width: "100px",
            },
            {
                text: "성적",
                width: "100px",
            },
            {
                text: " ",
                width: "50px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr key={item.courseIdx} onClick={(e) => handleLecture(item)}>
                    <td align="center">{item.professorName}</td>
                    <td align="left">{item.courseName}</td>
                    <td align="center">
                        <Language language={item.language}></Language>
                    </td>
                    <td align="center">
                        {item.grade ? item.grade + "점" : "없음"}
                    </td>
                    <td align="center">
                        <div>
                            <img
                                className="lectureIcon"
                                src={deleteIcon}
                                onClick={(e) => {
                                    window.confirm("삭제 하시겠습니까?")
                                        ? clickDelete(item)
                                        : "";
                                    window.location.reload(false);
                                }}
                            ></img>
                        </div>
                    </td>
                </tr>
            );
        });
    } else {
        headerItem = [
            {
                text: "강의명",
                align: "left",
            },
            {
                text: "학생수",
                width: "100px",
            },
            {
                text: "언어",
                width: "100px",
            },
            {
                text: " ",
                width: "100px",
            },
        ];
        childElement = list.map((item, idx) => {
            return (
                <tr
                    key={item.courseIdx}
                    data-num={idx}
                    onClick={(e) => handleLecture(item)}
                >
                    <td align="left">{item.courseName}</td>
                    <td align="center">{item.count}</td>
                    <td align="center">
                        <Language language={item.language}></Language>
                    </td>
                    <td align="center">
                        <div>
                            <img
                                className="lectureIcon"
                                src={editIcon}
                                onClick={(e) => clickEdit(item)}
                            ></img>
                            <img
                                className="lectureIcon"
                                src={deleteIcon}
                                onClick={(e) => {
                                    window.confirm("삭제 하시겠습니까?")
                                        ? clickDelete(item)
                                        : "";
                                    window.location.reload(false);
                                }}
                            ></img>
                        </div>
                    </td>
                </tr>
            );
        });
        createBtnElem = <FloatingMenu onClick={handleFloating}></FloatingMenu>;
    }

    return (
        <React.Fragment>
            <Table header={headerItem} className="lectureTable">
                {childElement}
            </Table>
            {createBtnElem}
        </React.Fragment>
    );
};

export default inject(
    "storeMain",
    "storeModal",
    "storeLecture"
)(observer(LectureListView));
