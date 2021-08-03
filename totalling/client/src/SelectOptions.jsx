import SelectDateRange from "./SelectDateRange";
import SelectMonth from "./SelectMonth";
import InputSearchWord from "./InputSearchWord";
import SelectYear from "./SelectYear";

/*
検索条件を入力するコンポーネント
引数
    props.type：検索項目のタイプ
*/
const SelectOptions = (props) => {
    console.log("props.type : " + props.type);
    switch (props.type) {
        case 1:
            return (
                <SelectDateRange setParam={props.setParam}></SelectDateRange>
            );
        case 2:
            return <SelectMonth setParam={props.setParam}></SelectMonth>;
        case 3:
            return (
                <InputSearchWord setParam={props.setParam}></InputSearchWord>
            );
        case 4:
            return <SelectYear setParam={props.setParam}></SelectYear>;
        default:
            return null;
    }
};

export default SelectOptions;
