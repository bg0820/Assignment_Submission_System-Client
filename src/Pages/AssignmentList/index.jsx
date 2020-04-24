import React, { useEffect, useState, useRef, memo } from "react";
import MainLayout from "@templates/MainLayout";
import Table from "@components/Table";
import Language from "@components/Language";

import './style.scss';

const AssignmentListPage = props => {
    let data = [
        {
            professorName: '이승진',
            courseName: '캡스톤디자인',
            assignmentName:'1차 릴리즈 완성',
            language: 'C/C++',
            submitType:'제출',
            grade: 100,
            expireDate:'2020/04/02 PM 12:00'
        },
        {
            professorName: '이승진',
            courseName: 'ㄱ',
            assignmentName:'ㄴ',
            language: 'Python',
            submitType:'미제출',
            grade: 100,
            expireDate:'2020/04/02 PM 12:00'
        },
        {
            professorName: '이승진',
            courseName: 'ㄱ',
            assignmentName:'ㄴ',
            language: 'Java',
            submitType:'제출',
            grade: 100,
            expireDate:'2020/04/02 PM 12:00'
        },
        {
            professorName: '이승진',
            courseName: 'ㄱ',
            assignmentName:'ㄴ',
            language: 'Html',
            submitType:'미제출',
            grade: 100,
            expireDate:'2020/04/02 PM 12:00'
        }
    ]

    

    let headerItem= [
        {
            text: '교수 이름',
            width: '100px',
            align: 'center'
        },
        {
            text: '수강 강의명',
            width: '200px'
        },
        {
            text: '과제 명',
            align: 'left'
        },
        {
            text: '언어',
            width: '100px'
        },
        {
            text: '제출 여부',
            width: '100px'
        },
        {
            text: '평가',
            width: '100px'
        },
        {
            text: '제출 기간',
            width: '160px'
        }
    ]


    let childElement = data.map((item, idx) => {
        return (
            <tr key={idx}>
                <td align="center">{item.professorName}</td>
                <td align="center" >{item.courseName}</td>
                <td align="left" >{item.assignmentName}</td>
                <td align="center">
                    <Language language={item.language}>
                    </Language> 
                </td>
                <td className={item.submitType === '제출' ? "submitType color-blue" : "submitType  "} align="center" >
                    {item.submitType}
                </td>
                <td align="center">{item.grade}</td>
                <td align="center">{item.expireDate}</td>
            </tr>
        )
    });


    return (
        <MainLayout>

            <Table header={headerItem}  className="lectureTable">
                {childElement}
            </Table>

        </MainLayout>
    );
};

export default AssignmentListPage;