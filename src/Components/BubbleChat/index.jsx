import React, { useEffect, useState, memo } from "react"; 
 
import "./style.scss"; 
 
/* 
    * value 
    width - %, px, 
    height - %, px 
    color - zzz 
*/ 
const BubbleChat = props => { 
    let clsName = "BubbleChat "; 
    let colorClsName = "color-default"; 
 
    if (props.color) colorClsName = "color-" + props.color; 
 
    clsName += colorClsName; 
 
    return ( 
         
        <div className={clsName}> 
            <p className="ProName">이승진</p> 
 
            <div className="Chat"> 
                <p>안녕하세요.</p> 
            </div> 
 
            <p className="Date">2020.05.12 11:42:00</p> 
             
        </div> 
 
    ); 
}; 
 
export default BubbleChat; 
