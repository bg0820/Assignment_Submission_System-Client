import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import MainLayout from "@templates/MainLayout";
import TalkLayout from "@templates/TalkLayout";
import BubbleChat from "@components/BubbleChat";

import * as Util from "@util";

const NoticeTalkView = (props) => {
    const { storeMain, storeLecture, storeChat } = props;

    const chatBoxElem = useRef(null);

    useEffect(() => {
        storeChat.init();

        Util.requestServer("course/chat", "GET", {
            courseIdx: props.match.params.courseIdx,
            type: 0,
        }).then(function (resp) {
            if (resp.code === 200) {
                storeChat.setChats(resp.body.chats);
            }
        });

        storeMain.socket.on(
            props.match.params.courseIdx + "_chat_notice",
            onMessage
        );

        return () => {
            console.log("un mount");
            storeMain.socket.off(
                props.match.params.courseIdx + "_chat_notice",
                onMessage
            );
        };
    }, []);

    const onMessage = (msg) => {
        storeChat.addChat(msg.data);

        console.log(chatBoxElem);
        chatBoxElem.current.scrollTop = chatBoxElem.current.scrollHeight;
    };

    let chats = storeChat.chats.map((item, i) => {
        return (
            <BubbleChat
                key={i}
                data={item}
                color={item.userIdx == storeMain.userIdx ? "green" : "default"}
            ></BubbleChat>
        );
    });

    return (
        <TalkLayout refElem={chatBoxElem} title="공지 톡" type="notice">
            {chats}
        </TalkLayout>
    );
};

export default inject(
    "storeMain",
    "storeLecture",
    "storeChat"
)(observer(NoticeTalkView));
