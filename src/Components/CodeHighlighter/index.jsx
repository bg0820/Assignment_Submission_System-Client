import React, { useEffect, useState, memo, useRef } from "react";
import { observer, inject } from "mobx-react";

import "./style.scss";

const CodeHighlighter = (props) => {
    const { storeMain, storeCode } = props;

    const editor = useRef(null);
    const [highlight, setHighlight] = useState("");

    const [lines, setLines] = useState([]);
    // const [lastSelectPos, setLastSelectPos] = useState(0);
    let lastSelectPos = 0;
    let lastHtml = "";
    //let code = '';

    const visualization = (word, isBracket = false) => {
        const accessTypes = [
            "static",
            "void",
            "public",
            "private",
            "protected",
            "return",
        ];
        const dataTypes = [
            "int",
            "float",
            "short",
            "long",
            "dobule",
            "byte",
            "bool",
            "unsigned",
        ];

        if (isBracket) word = "(" + word + ")";

        if (dataTypes.includes(word)) {
            return "<span class='dataType'>" + word + "</span>";
        } else if (accessTypes.includes(word)) {
            return "<span class='accessType'>" + word + "</span>";
        } else if (word === "\n") {
            return "<br/>";
        } else if (word === "\t") {
            return "<span>  </span>";
        } else {
            return "<span>" + word + "</span>";
        }
    };

    const handleWord = (text) => {
        text = text.replace(/</g, "&lt").replace(/>/g, "&gt");

        const words = text.split(/([()\s]+)/g);
        const output = words.map((word) => {
            // 소괄호 있는지 검사
            if (/[^()]+(?=\))/g.test(word)) {
                // 소괄호 안에 있는 내용
                let smallBracket = word.match(/[^()]+(?=\))/g);

                return visualization(smallBracket);
            } else {
                return visualization(word);
            }
        });

        return output.join("");
    };

    const handleCode = (e) => {
        // console.log(e.target.value);
        // setCode(e.target.value);

        // console.log(storeCode.code);

        storeCode.setCode(e.target.value);

        let out = handleWord(e.target.value);

        setHighlight(out);
        console.log("handleCode");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
        }
    };

    return (
        <div className="CodeHighlighter">
            <div
                className="codeEditor"
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: highlight }}
            ></div>
            <textarea
                ref={editor}
                onChange={handleCode}
                value={storeCode.code}
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );
};

export default inject("storeMain", "storeCode")(observer(CodeHighlighter));
