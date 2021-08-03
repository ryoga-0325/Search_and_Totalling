import React, { useState } from "react";
import "./DateSelecter.css";

/*
日付範囲を選択するコンポーネント
引数
    props.setParam：入力された検索条件をパラメータにセットする
*/
const SelectDateRange = (props) => {
    // 日付範囲ここから
    const [start, setStart] = useState();
    // 日付範囲ここまで
    const [end, setEnd] = useState();

    /*
    条件入力時
    範囲開始～終了のどちらもが入力された時に、パラメータとしてセットする
    */
    const onChange = () => {
        const startMonth = document.getElementById("start").value;
        const endMonth = document.getElementById("end").value;
        if (startMonth && endMonth) {
            //props.check(false);
            setStart(startMonth);
            setEnd(endMonth);
            const param = {
                PARAM_1: "'" + document.getElementById("start").value + "-01'",
                PARAM_2: "'" + document.getElementById("end").value + "-01'",
            };
            props.setParam(param);
        }
    };

    return (
        <div className="Options">
            <input
                type="month"
                className="dateSelecter"
                id="start"
                name="start"
                value={start}
                onChange={onChange}
            />
            　～　
            <input
                type="month"
                className="dateSelecter"
                id="end"
                name="end"
                value={end}
                onChange={onChange}
            />
        </div>
    );
};

export default SelectDateRange;
