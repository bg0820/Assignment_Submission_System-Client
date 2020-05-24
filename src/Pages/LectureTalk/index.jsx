import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import TalkLayout from "@templates/TalkLayout";


import "./style.scss";

const LectureTalk = (props) => {
    return (
    <MainLayout>
        <TalkLayout title="강의 톡"></TalkLayout>
    </MainLayout>);
}

export default LectureTalk;