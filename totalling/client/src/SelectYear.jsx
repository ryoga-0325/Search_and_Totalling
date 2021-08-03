import { useEffect, useState } from "react";

/*
年指定コンポーネント
引数
    props.setParam：入力された検索条件をパラメータにセットする
*/
const SelectYear = (props) => {
    const [year, setYear] = useState();

    const onChange = () => {
        setYear(document.getElementById("selectYear").value);
        const param = {
            PARAM_1: "'" + document.getElementById("selectYear").value + "'",
        };
        props.setParam(param);
    };

    // 初回レンダリング時に、選択できる年の範囲を指定する(2004～今年)
    useEffect(() => {
        const MAX_YEAR_RANGE = new Date().getFullYear();
        const yearListStringHTML = generateYearRange(2004, MAX_YEAR_RANGE);
        document.getElementById("selectYear").innerHTML = yearListStringHTML;
    }, []);

    function generateYearRange(start, end) {
        let years = "";
        for (let year = start; year <= end; year++) {
            years += "<option value='" + year + "'>" + year + "</option>";
        }
        return years;
    }

    return (
        <div className="Options">
            <select
                id="selectYear"
                name="selectYear"
                value={year}
                onChange={onChange}
            ></select>
        </div>
    );
};

export default SelectYear;
