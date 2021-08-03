import React, { useState, useEffect } from "react";
import SelectOptions from "./SelectOptions";
import "./Select.css";

/*
検索項目を選択するセレクタコンポーネント
引数
    props.resetFlag：送信ボタンを無効化する
    props.setParam：SQLのパラメータをセットする
*/
const Select = (props) => {
    // 検索項目
    const [options, setOptions] = useState([]);
    // 検索条件のタイプ
    const [type, setType] = useState();

    // 初回レンダリング時にDBからMST_QUERYに登録されている検索項目を取得する
    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((optionsData) => setOptions(optionsData));
    }, []);

    /*
    関数概要：検索項目が変更された時に、送信ボタンを無効化し、条件タイプを設定する
    */
    const onChange = (event) => {
        // 選択されたoptionのvalue値とQUERY_IDが一致するレコードを抽出
        // Warning：select.valueが文字列、option[n].QUERY_IDが数値のため、比較演算子は==を使うか、いずれかをparseする必要がある
        const selected = options.find((n) => n.QUERY_ID == event.target.value);
        setType(selected.QUERY_TYPE);

        // ワード検索の時のみボタン有効可否フラグの切り替えがうまくいかなかったため、暫定処理
        if (selected.QUERY_TYPE != 3) {
            props.resetFlag();
        }
    };

    return (
        <React.Fragment>
            <div id="SelecterBox">
                <select id="Selecter" onChange={onChange}>
                    <option hidden>項目を選択</option>
                    {options.map((option) => (
                        <option value={option.QUERY_ID}>
                            {option.QUERY_NAME}
                        </option>
                    ))}
                </select>
            </div>
            <SelectOptions
                type={type}
                setParam={props.setParam}
            ></SelectOptions>
        </React.Fragment>
    );
};

export default Select;
