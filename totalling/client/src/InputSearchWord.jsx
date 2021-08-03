import React, { useState, useEffect } from "react";
import "./InputSearchWord.css";

/*
ワード検索コンポーネント
引数
    props.setParam：入力された検索条件をパラメータにセットする
*/
const InputSearchWord = (props) => {
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        const param = {
            PARAM_1: "'%" + searchWord + "%'",
        };
        props.setParam(param);
    }, [searchWord]);

    const onChange = () => {
        setSearchWord(document.getElementById("searchWord").value);
    };

    return (
        <div className="Options">
            <label htmlFor="searchWord">検索：</label>
            <input type="text" id="searchWord" onChange={onChange} />
        </div>
    );
};

export default InputSearchWord;
