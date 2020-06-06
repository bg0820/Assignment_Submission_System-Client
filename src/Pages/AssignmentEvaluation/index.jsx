import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import AssignmentCodeBox from "@components/AssignmentCodeBox";
import AssignmentHtmlBox from "@components/AssignmentHtmlBox";

import "./style.scss";

const AssignmentEvaluation = (props) => {
    const { storeMain, storeLecture, storeTask } = props;
    const [list, setList] = useState([]);
    let assignmentElem = null;

    if(props.language == "HTML") {
        assignmentElem = (
            <AssignmentHtmlBox></AssignmentHtmlBox>
        );
    } else {
        assignmentElem = (
            <AssignmentCodeBox></AssignmentCodeBox>
        );
    }
    return (
        <MainLayout>
            <div className="AssignmentEvaluation">
                {assignmentElem}
            </div>
            
        </MainLayout>
    );
};

export default AssignmentEvaluation;