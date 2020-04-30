import React, { useEffect, useState, useRef, memo } from "react"; 
import MainLayout from "@templates/MainLayout"; 
import Table from "@components/Table"; 
import FloatingMenu from "@components/FloatingMenu";

import * as Util from "@util";
import './style.scss'; 
 
const AssignmentListPro = props => { 

    const [list, setList] = useState([]);

    useEffect(() => {
        Util.requestServer('task/list', 'GET', {}).then(function(result) {
            console.log(result);
            if(result.code === 200) {
                setList(result.body.list);
            } else {
                //alert(result.body.msg);
            }
        });
    }, []);
 
    let headerItem= [
        { 
            text: '과제 명', 
            align: 'left' 
        }, 
        { 
            text: '과제 설명', 
            align: 'left' 
        },
        { 
            text: '제출 기간', 
            width: '160px' 
        },
        { 
            text: '연장 기간', 
            width: '160px' 
        } 
    ] 
 
 
    let childElement = list.map((item, idx) => { 
        return ( 
            <tr key={idx}>  
                <td align="left" >{item.assignmentName}</td>
                <td align="left" >{item.assignmentContet}</td>
                <td align="center" >{item.expireDate}</td> 
                <td align="center" >{item.extendDate}</td> 
            </tr> 
        ) 
    }); 
 
 
    return ( 
        <MainLayout> 
 
            <Table header={headerItem}  className="lectureTable"> 
                {childElement} 
            </Table> 
 
            <FloatingMenu value="+" className="FloatingMenu">

            </FloatingMenu>
        </MainLayout> 
    ); 
}; 
 
export default AssignmentListPro;