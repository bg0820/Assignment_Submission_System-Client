import React, { useEffect, useState, useRef, memo } from "react";
import { observer, inject } from "mobx-react";

import TalkLayout from "@templates/TalkLayout";
import BubbleChat from "@components/BubbleChat";

import * as Util from "@util";

const QnATalkView = (props) => {
    const { storeMain, storeLecture, storeChat } = props;

    useEffect(() => {
        storeChat.init();

        Util.requestServer("course/chat", "GET", {
            courseIdx: props.match.params.courseIdx,
            type: 1,
        }).then(function (resp) {
            if (resp.code === 200) {
                storeChat.setChats(resp.body.chats);
            }
        });

        storeMain.socket.on(
            props.match.params.courseIdx + "_chat_qna",
            onMessage
        );

        return () => {
            console.log("un mount");
            storeMain.socket.off(
                props.match.params.courseIdx + "_chat_qna",
                onMessage
            );
        };
    }, []);

    const onMessage = (msg) => {
        storeChat.addChat(msg.data);
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
        <TalkLayout title="강의 톡" type="qna">
            {chats}
        </TalkLayout>
    );
};

export default inject(
    "storeMain",
    "storeLecture",
    "storeChat"
)(observer(QnATalkView));
