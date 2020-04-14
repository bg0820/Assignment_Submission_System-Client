import React, { useEffect, useState, useRef, memo } from "react";

import MainLayout from "@templates/MainLayout";
import Button from "@components/Button";

import "./style.scss";

const EditorPage = props => {
   
    return (
        <MainLayout>
            <div className="main">
                <div className="explain">
                    <div className="title">
                        <div className="language">C</div>
                        <p className="text">* 을 이용하여 삼각형을 출력 하세요. 글이 길어서 줄을 바꿀때는 이런식 으로 표시됩니다.</p>
                    </div>
                    <div className="middle">
                        <div className="description">
                            <p className="content">. 다음 지식에 대해

 

지식: 사람은 동물이다. 동물은 죽는다. 소크라테스는 사람이다.

질문: 소크라테스는 죽는가?



1) 술어논리로 표현하고, 추론과정 ( 논리융합 이용)을 그리시오.
2) Prover9 (과제 첨부파일 또는 https://www.cs.unm.edu/~mccune/prover9/ 에서 다운로드)을 이용하여 추론하고 그 결과화면을 캡처해서 올리세요.

2. 다음 지식을 술어논리로 표현하고 논리융합을 통해 답을 찾는과정을 쓰시오.



 지식: 아버지의 아버지는 할아버지이다. A의 아버지는 B이다. B의 아버지는 C이다.



 질문: A의 할아버지는?





힌트)   father(X, Y) ^ father (Y, Z) -> grandfather(X, Z).

 father(a, b).

father(b, c).



Q&A : grandfather(a, G).
. 다음 지식에 대해

 

  지식: 사람은 동물이다. 동물은 죽는다. 소크라테스는 사람이다.

  질문: 소크라테스는 죽는가?

 

  1) 술어논리로 표현하고, 추론과정 ( 논리융합 이용)을 그리시오.
  2) Prover9 (과제 첨부파일 또는 https://www.cs.unm.edu/~mccune/prover9/ 에서 다운로드)을 이용하여 추론하고 그 결과화면을 캡처해서 올리세요.
 
2. 다음 지식을 술어논리로 표현하고 논리융합을 통해 답을 찾는과정을 쓰시오.

 

   지식: 아버지의 아버지는 할아버지이다. A의 아버지는 B이다. B의 아버지는 C이다.

 

   질문: A의 할아버지는?

 

 

힌트)   father(X, Y) ^ father (Y, Z) -> grandfather(X, Z).

   father(a, b).

  father(b, c).

 

  Q&A : grandfather(a, G).</p>
                        </div>
                        <div className="bottom">
                            <p className="escape">[Escape 설명]</p>
                            <p>줄바꿈</p>
                            <div className="example">
                                <p>[예시] 입력/출력 1.</p>
                                <div className="input">3</div>
                                <div className="output">
                                    *<br/>
                                    **<br/>
                                    ***
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="codeEditor"></div>
            </div>
        </MainLayout>
    );
};

export default EditorPage;