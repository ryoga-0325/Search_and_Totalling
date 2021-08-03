import React, { useState } from "react";
import Header from "./Header";
import SendForm from "./SendForm";
import ShowTable from "./ShowTable";

/*
Appコンポーネント
*/
const App = () => {
    // DBから取得したデータを保持するState
    const [data, setData] = useState([]);
    // データ表示件数を管理するState
    const [pageCount, setPageCount] = useState(0);

    // データをセットし、表示件数のカウントをリセットする
    const setDataWrapper = (data) => {
        setData(data);
        setPageCount(0);
    };
    // setStateを子コンポーネントに渡すためのラッピング
    const setPageCountWrapper = (pageCount) => {
        setPageCount(pageCount);
    };

    return (
        <React.Fragment>
            <Header></Header>
            <SendForm setData={setDataWrapper}></SendForm>
            <ShowTable
                data={data}
                pageCount={pageCount}
                setPageCount={setPageCountWrapper}
            ></ShowTable>
        </React.Fragment>
    );
};

export default App;
