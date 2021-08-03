import React from "react";
import Table from "./Table";

/*
DBから取得したデータを受け取り、表示するテーブル表示コンポーネント
引数
    props.data：表示するデータ
*/
const ShowTable = (props) => {
    if (props.data.length !== 0 || props.data === 0) {
        return (
            <React.Fragment>
                <Table
                    datas={props.data}
                    pageCount={props.pageCount}
                    setPageCount={props.setPageCount}
                ></Table>
            </React.Fragment>
        );
    }
    return null;
};

export default ShowTable;
