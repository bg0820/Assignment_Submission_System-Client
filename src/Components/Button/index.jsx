import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Button = props => {
    let clsName = "Button ";
    let colorClsName = "color-default";

    if (props.color) colorClsName = "color-" + props.color;

    clsName += colorClsName;

    const buttonOnClick = event => {
        props.onClick(event);
    };

    return (
        <input
            type="button"
            className={clsName}
            value={props.value}
            style={{
                width: props.width ? props.width : "100%",
                margin: props.margin ? props.margin : "0"
            }}
            onClick={buttonOnClick}
        ></input>
    );
};

export default Button;
