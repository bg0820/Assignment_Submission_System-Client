import React, { useEffect, useState, useRef, memo } from "react";
import MainLayout from "@templates/MainLayout";
import Table from "@components/Table";
import Language from "@components/Language";

import * as Util from "@util";
import './style.scss';

const LectureStudentPage = props => {

    const [list, setList] = useState([]);

    useEffect(() => {
        Util.requestServer('course/list', 'GET', {}).then(function(result) {
            console.log(result);
            if(result.code === 200) {
                setList(result.body.list);
            } else {
                //alert(result.body.msg);
            }
        });
    }, []);


    /*
    let data = [
        {
            professorName: '이승진',
            courseName: 'ㄱ',
            language: 'C/C++',
            grade: 100
        },
        {
            professorName: '이승진',
            courseName: 'ㄴ',
            language: 'Python',
            grade: 100
        },
        {
            professorName: '이승진',
            courseName: 'ㄷ',
            language: 'Java',
            grade: 100
        },
        {
            professorName: '이승진',
            courseName: 'ㄹ',
            language: 'Html',
            grade: 100
        },*/


    let headerItem= [
        {
            text: '교수 이름',
            width: '100px',
            align: 'center'
        },
        {
            text: '수강 강의명',
            align: 'left'
        },
        {
            text: '언어',
            width: '100px'
        },
        {
            text: '성적',
            width: '100px'
        }
    ]

    let childElement = list.map((item, idx) => {

        return (
            <tr key={idx}>
                <td align="center">{item.professorName}</td>
                <td align="left" >{item.courseName}</td>
                <td align="center">
                    <Language language={item.language}>
                    </Language>
                </td>
                <td align="center" >{item.grade}</td>
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

export default LectureStudentPage;