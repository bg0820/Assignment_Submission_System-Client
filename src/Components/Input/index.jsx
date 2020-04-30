import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Input = props => {
    const handleChange = e => {
        props.onChange(e);
    };

    const handleBlur = e => {
        props.onBlur(e);
    };

    const handleClick = e => {
        props.onClick(e);
    };

    let clsName = "form-control";
    let style = {
        width: "100%",
        margin: "0"
    };

    if (props.height) {
        clsName += " height-" + props.height;
    } else clsName += " height-default";
    
    if (props.width) {
        style.width = props.width;
    }

    if (props.margin) {
        style.margin = props.margin;
    }

    if (props.padding) {
        style.padding = props.padding;
    }

    return (
        <input
            ref={props.ref ? props.ref : null}
            type={props.type}
            className={clsName}
            placeholder={props.placeholder}
            style={style}
            disabled={props.disabled === undefined ? false : true}
            value={
                props.value === null || props.value === undefined
                    ? ""
                    : props.value
            }
            min={props.min}
            onChange={handleChange}
            onClick={props.onClick ? handleClick : null}
            onBlur={props.onBlur ? handleBlur : null}
        ></input>
    );
};

export default Input;