import React, { useEffect, useState, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import TalkLayout from "@templates/TalkLayout";
import BubbleChat from "@components/BubbleChat";

import "./style.scss";

const NoticeChat = (props) => {
    const { storeMain, storeLecture, storeChat } = props;

    useEffect(() => {
        storeChat.init();
        storeMain.socket.on(
            storeLecture.selectLecture.courseIdx + "_chat_notice",
            onMessage
        );

        return () => {
            console.log('un mount');
            storeMain.socket.off(
                storeLecture.selectLecture.courseIdx + "_chat_notice",
                onMessage
            );
        };
    }, []);

    const onMessage = (msg) => {
        if (storeMain.userIdx == msg.data.userIdx) {
            storeChat.addChat(
                {
                    type: 0,
                    data: msg.data,
                }
            );
        } else {
            storeChat.addChat(
                {
                    type: 1,
                    data: msg.data,
                }
            );
        }
    };

    let chats = storeChat.chats.map((item, i) => {
        return item.type == 0 ? (
            <BubbleChat key={i} data={item.data} color="green"></BubbleChat>
        ) : (
            <BubbleChat key={i} data={item.data}></BubbleChat>
        );
    });

    return (
        <MainLayout>
            <TalkLayout title="공지 톡" type="notice">
                {chats}
            </TalkLayout>
        </MainLayout>
    );
};

export default inject("storeMain", "storeLecture", "storeChat")(observer(NoticeChat));
