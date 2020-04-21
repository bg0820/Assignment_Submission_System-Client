import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import CodeViewerLayout from "@templates/CodeViewerLayout";
import Button from "@components/Button";

import "./style.scss";

const EditorPage = props => {
   
    return (
        <MainLayout>
            <CodeViewerLayout></CodeViewerLayout>
        </MainLayout>
    );
};

export default EditorPage;