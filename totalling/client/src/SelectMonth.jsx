import { useState } from "react";
import "./DateSelecter.css";

/*
月指定コンポーネント
引数
    props.setParam：入力された検索条件をパラメータにセットする
*/
const SelectMonth = (props) => {
    const [month, setMonth] = useState();

    const onChange = () => {
        setMonth(document.getElementById("selectMonth").value);
        const param = {
            PARAM_1:
                "'" + document.getElementById("selectMonth").value + "-01'",
        };
        props.setParam(param);
    };

    return (
        <div className="Options">
            <input
                type="month"
                className="dateSelecter"
                id="selectMonth"
                name="selectMonth"
                value={month}
                onChange={onChange}
            />
        </div>
    );
};

export default SelectMonth;
