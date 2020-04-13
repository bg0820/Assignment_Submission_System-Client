import React, { useEffect, useState, memo } from "react";

import "./style.scss";

/*
    * value
    width - %, px,
    height - %, px
    color - zzz
*/
const InputType = props => {
    let clsName = "InputType ";
    let colorClsName = "color-default";

    if (props.color) colorClsName = "color-" + props.color;

    clsName += colorClsName;

    const handleClick = event => {
        props.onClick(event);
    };

    return (
        <input type="input"
            className={clsName}
            value={props.value}
            placeholder={props.placeholder}
            onClick={props.onClick ? handleClick : null}
            
            style={{
                width: props.width ? props.width : "100%",
                height: props.height ? props.height: "100%",
                margin: props.margin ? props.margin : "0",
                padding: props.padding ? props.padding : "0"
            }}
            
        ></input>
    );
};

export default InputType;
