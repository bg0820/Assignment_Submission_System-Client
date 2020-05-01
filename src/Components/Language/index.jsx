import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Language = props => {
    let clsName = "Language ";
    let colorClsName = "color-default";

    let lang = props.language;
    if(!lang)
        lang = '';
    
    if(lang.toLowerCase() === 'c') 
        colorClsName = "color-blue";
    else if(lang.toLowerCase() === 'c++')
        colorClsName = "color-blue";
     else if(lang.toLowerCase() === 'java') 
        colorClsName = "color-green";
     else if(lang.toLowerCase() === 'html') 
        colorClsName = "color-pink";
     else if(lang.toLowerCase() === 'python') 
        colorClsName = "color-yellow";
    

    clsName += colorClsName;

    return (
        <div className={clsName}>
            <p>
              {lang}  
            </p>
        </div>
    );
};

export default Language;
