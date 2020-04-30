import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";

import * as Util from "@util";
//import { isComputingDerivation } from "mobx/lib/internal";

const MainPage = props => {

    const [info, setInfo] = useState({
        lectureName: '',
        professorName: []
    });

    return (
        <MainLayout
        lectureName={info.lectureName} professorName={info.professorName} >
            <div>sadsafdaf</div>
        </MainLayout>
    );
};

export default MainPage;
