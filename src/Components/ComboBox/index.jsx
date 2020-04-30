import React, { useEffect, useState, memo } from "react";

import "./style.scss";

/*
    * value
    width - %, px,
    height - %, px
    color - zzz
*/
const ComboBox = props => {
    let clsName = "ComboBox ";
    let colorClsName = "color-default";

    if (props.color) colorClsName = "color-" + props.color;

    clsName += colorClsName;

    const handleClick = event => {
        props.onClick(event);
    };

    return (
        <select
            className={clsName}
            onClick={props.onClick ? handleClick : null}
            
            style={{
                width: props.width ? props.width : "100%",
                height: props.height ? props.height: "100%",
                margin: props.margin ? props.margin : "0",
                padding: props.padding ? props.padding : "0"
            }}
        >
            <option selected disabled hidden>언어를 선택하세요.</option>
            <option>Java</option>
            <option>Html</option>
            <option>Python</option>
            <option>C</option>
        </select>
    );
};

export default ComboBox;
