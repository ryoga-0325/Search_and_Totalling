import React, { useEffect, useState } from "react";
import Select from "./Select";
import Button from "./Button";
import "./SendForm.css";

/*
検索項目等のフォームコンポーネント
引数
    props.setData：DBから取得したデータをセットする
*/
const SendForm = (props) => {
    // 送信ボタン有効可否を管理するフラグ(disabledに直接渡す)
    const [flag, setFlag] = useState(true);
    // フラグリセット
    const resetFlag = () => {
        setFlag(true);
    };

    // SQLに投げるパラメータを格納する
    const [param, setParam] = useState({});
    // パラメータをセットし、送信ボタンを有効化する
    const setParamWrapper = (param) => {
        setParam(param);
        setFlag(false);
    };

    /*
    関数概要：送信ボタン押下、Expressサーバーに接続してDBからデータを取得する
    引数：event(フォーム内のsubmitイベント)
    戻り値：なし(Appコンポーネントのdataに取得したデータをセット)
    */
    const onSubmit = (event) => {
        event.preventDefault(); // 画面更新のキャンセル
        // (*DBG)console.log("onSubmit");
        const reqData = param;
        reqData.queryId = document.getElementById("Selecter").value;
        // (*DBG)console.log(reqData);
        fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(reqData),
        })
            .then((res) => res.json())
            .then((data) => props.setData(data));
    };

    return (
        <form id="SendForm" onSubmit={onSubmit}>
            <div id="SelectAndInput">
                <Select
                    resetFlag={resetFlag}
                    setParam={setParamWrapper}
                ></Select>
            </div>
            <Button flag={flag} />
        </form>
    );
};

export default SendForm;
