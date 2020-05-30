import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import TalkLayout from "@templates/TalkLayout";
import BubbleChat from "@components/BubbleChat";

import "./style.scss";

const LectureTalk = (props) => {
    return (
        <MainLayout>
            <TalkLayout title="강의 톡">
                        <BubbleChat>

                        </BubbleChat>
                    
                        <BubbleChat color="green">

                        </BubbleChat>

            </TalkLayout>
        </MainLayout>
    );
}

export default LectureTalk;