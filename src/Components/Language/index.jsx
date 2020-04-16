import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Language = props => {
    let clsName = "Language ";
    let colorClsName = "color-default";

    if(props.language === 'C/C++') {
        colorClsName = "color-blue";
    } else if(props.language === 'Java') {
        colorClsName = "color-green";
    } else if(props.language === 'Html') {
        colorClsName = "color-pink";
    } else if(props.language === 'Python') {
        colorClsName = "color-yellow";
    }

    clsName += colorClsName;

    return (
        <div className={clsName}>
            <p>
              {props.language}  
            </p>
        </div>
    );
};

export default Language;
