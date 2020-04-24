import React, { useEffect, useState, memo } from "react";

import "./style.scss";

const Table = props => {
    let clsName = "Table";

    let headerElem = props.header.map((item, idx) => {
        return (
            <th key={idx} style={{
                width: item.width,
                textAlign: item.align
            }}>{item.text}</th>
        )
    })

    

    return (
        <table className="Table">
            <thead>
                <tr>
                    {headerElem}
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
};

export default Table;
