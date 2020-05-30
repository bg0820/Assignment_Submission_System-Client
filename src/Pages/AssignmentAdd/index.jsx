import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import CodeViewerLayout from "@templates/CodeViewerLayout";
import CodeEditorLayout from "@templates/CodeEditorLayout";

import * as Util from "@util";

const AssignmentAddPage = (props) => {
    const { storeMain } = props;

    let codeElem = null;
    if (storeMain.userType === 0) {
        codeElem = <CodeViewerLayout></CodeViewerLayout>;
    } else {
        codeElem = <CodeEditorLayout></CodeEditorLayout>;
    }

    return <MainLayout>{codeElem}</MainLayout>;
};

export default inject("storeMain")(observer(AssignmentAddPage));
