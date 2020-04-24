import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const FloatingMenu = props => {
    let clsName = "FloatingMenu ";
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
                width: props.width ? props.width : "50px",
                height: props.height ? props.height: "50px",
                margin: props.margin ? props.margin : "0"
            }}
            onClick={buttonOnClick}
        ></input>
    );
};

export default FloatingMenu;
