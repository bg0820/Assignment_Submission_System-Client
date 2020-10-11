import React, { useEffect, useState, memo } from "react";

import "./style.scss";

/*
    * value
    width - %, px,
    height - %, px
    color - zzz
*/
const ComboBox = (props) => {
    let clsName = "ComboBox ";
    let colorClsName = "color-default";
    let style = {
        width: "100%",
    };

    if (props.width) style.width = props.width;

    if (props.margin) style.margin = props.margin;

    if (props.padding) style.padding = props.padding;

    if (props.color) colorClsName = "color-" + props.color;

    clsName += colorClsName;

    const handleClick = (event) => {
        props.onClick(event);
    };

    const handleChange = (event) => {
        props.onChange(event);
    }; 

    return (
        <select
            className={clsName}
            onClick={props.onClick ? handleClick : null}
            onChange={props.onChange ? handleChange : null}
            value={props.value}
            style={style}
        >
            <option value="none" disabled hidden>
                프로그래밍 언어를 선택하세요.
            </option>
            <option value="java">Java</option>
            <option value="html">Html</option>
            <option value="python">Python</option>
            <option value="c">C</option>
        </select>
    );
};

export default memo(ComboBox);
