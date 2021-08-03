import { useEffect } from "react";
import "./Button.css";

/*
送信ボタンコンポーネント
ボタン有効フラグによって有効・無効が切り替わる
引数
    props.flag：ボタン有効可否
*/
const Button = (props) => {
    useEffect(() => {
        document.getElementById("sendButton").disabled = props.flag;
    });

    return (
        <button type="submit" id="sendButton">
            この内容で送信する
        </button>
    );
};

export default Button;
