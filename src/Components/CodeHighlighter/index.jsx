import React, { useEffect, useState, memo, useRef } from "react";

import "./style.scss";

const CodeHighlighter = (props) => {
    const editor = useRef(null);
    const [code, setCode] = useState("");
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
        let lines = text.split(/\n/g);

        for (var i = 0; i < lines.length; i++) {
            const words = lines[i].split(/([(){}\s]+)/g);

            const output = words.map((word) => {
                return visualization(word);
            });

            lines[i] = output.join("");
        }

        /*
        text = text.replace(/</g, "&lt").replace(/>/g, "&gt");
        let functionRegex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g;

        let functions = text.match(functionRegex);

        for (var i = 0; i < functions.length; i++) {
            text = text.replace(
                functionRegex,
                "<span class='functionType'>" + functions[0] + "</span>"
            );
            console.log("function : " + functions[i]);
        }

        const words = text.split(/([(){}\s]+)/g);

        const output = words.map((word) => {
            // 첫글자는 숫자가 올수 없고 영문만 가능 두번째부터는 숫자 영어 언더바가능 '(' 소괄호 앞까지의 문자 찾기

            if (functionRegex.test(word)) {
                let functions = word.match(functionRegex);
                // console.log(functions);
                return "<span class='functionType'>" + functions[0] + "</span>";
            } else {
                return visualization(word);
            }
        });

        var result = output.join("");

        console.log("result", result);

        /*
        functions.map((word) => {
            result = result.replace(
                /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g,
                "<span class='functionType'>" + word + "</span>"
            );
        });*/
        /*for (var i = 0; i < functions.length; i++) {
            result.replace(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g, functions[i]);
        }*/

        return lines.join("<br/>");
    };

    const handleCode = (e) => {
        console.log(e.target.value);
        setCode(e.target.value);

        let out = handleWord(e.target.value);

        setHighlight(out);
        console.log("handleCode");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            e.target;
            console.log(e.target.selectionStart);
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
                spellCheck="false"
                onChange={handleCode}
                value={code}
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );
};

export default CodeHighlighter;
