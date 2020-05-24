import React, { useEffect, useState, memo } from "react"; 
 
import MainLayout from "@templates/MainLayout"; 
import BubbleChat from "@components/BubbleChat"; 
 
import "./style.scss"; 
 
const NoticeChat = (props) => { 
 
    return ( 
        <MainLayout> 
        <div> 
 
            <BubbleChat color="green"> 
 
            </BubbleChat> 
 
            <BubbleChat> 
 
            </BubbleChat> 
 
        </div> 
        </MainLayout> 
    ); 
}; 
 
export default NoticeChat;