import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import AssignmentCodeBox from "@components/AssignmentCodeBox";

import "./style.scss";

const AssignmentEvaluation = (props) => {
    return (
        <MainLayout>
            <AssignmentCodeBox>
            </AssignmentCodeBox>
            
        </MainLayout>
    );
};

export default AssignmentEvaluation;