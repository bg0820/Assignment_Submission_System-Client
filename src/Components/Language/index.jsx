import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Language = props => {
    let clsName = "Language ";
    let colorClsName = "color-default";

    if(props.language.toLowerCase() === 'c') 
        colorClsName = "color-blue";
    else if(props.language.toLowerCase() === 'c++')
        colorClsName = "color-blue";
     else if(props.language.toLowerCase() === 'java') 
        colorClsName = "color-green";
     else if(props.language.toLowerCase() === 'html') 
        colorClsName = "color-pink";
     else if(props.language.toLowerCase() === 'python') 
        colorClsName = "color-yellow";
    

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
