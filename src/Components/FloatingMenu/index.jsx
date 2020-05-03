import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const FloatingMenu = (props) => {
    let clsName = "FloatingMenu ";
    let colorClsName = "color-default";

    if (props.color) colorClsName = "color-" + props.color;

    clsName += colorClsName;

    const buttonOnClick = (event) => {
        props.onClick(event);
    };

    return (
        <input
            type="button"
            className={clsName}
            value="+"
            onClick={buttonOnClick}
        ></input>
    );
};

export default FloatingMenu;
