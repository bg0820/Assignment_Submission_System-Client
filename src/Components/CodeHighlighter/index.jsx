import React, { useEffect, useState, memo, useRef } from "react";
import { observer, inject } from "mobx-react";
import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';

import 'codemirror/keymap/sublime.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/addon/display/autorefresh.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/edit/matchbrackets.js';

import "./code.css";
import "./style.scss";

const CodeHighlighter = (props) => {
    const { storeMain, storeCode } = props;
    const [code, setCode] = useState("");
    let instance = null;

    /*
    useEffect(() => {
        console.log(editor, editor.current);
        codeEditor = new CodeMirror(editor.current);
    }, []);*/
    /*
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
            return "<span>    </span>";
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
        storeCode.setCode(e.target.value);

        let out = handleWord(e.target.value);

        setHighlight(out);
        console.log("handleCode");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();

            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;

            var output = [
                storeCode.code.slice(0, start),
                "\t",
                storeCode.code.slice(start),
            ].join("");

            console.log(start);
            console.log(output);

            storeCode.setCode(output);

            let out = handleWord(output);

            setHighlight(out);

            setTimeout(() => {
                editor.current.selectionStart = start + 4;
                editor.current.selectionEnd = end + 4;
            }, 100);
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
    );*/

    let mode = '';

    if(props.language == 'c' || props.language == 'cpp') {
        mode = 'text/x-c++src'
    } else  if(props.language == 'java') {
        mode = 'text/x-java'
    } else  if(props.language == 'html') {
        mode = 'text/html'
    }
    console.log(props.language, mode);

    let options = {
        theme: 'darcula',
        tabSize: 4,
        mode: mode,
        lineNumbers: true,
        indentUnit: 4,
        spellcheck: false
    }; 

    return (
        <div className="CodeHighlighter">
            <CodeMirror
                editorDidMount={editor => { instance = editor }}
                value={storeCode.code}
                options={options}
                onBeforeChange={(editor, data, value) => {
                    storeCode.setCode(value);
                }}
                onChange={(editor, data, value) => {
                    console.log(editor, data, value);
                }}
            />
        </div>
    )
};

export default inject("storeMain", "storeCode")(observer(CodeHighlighter));
