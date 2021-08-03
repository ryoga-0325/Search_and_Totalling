import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ExportButton from "./ExportButton";
import "./Table.css";

/*
テーブルコンポーネント
infinite-scroll-componentを利用して、一度に表示するデータ件数を制御する
引数
    props.datas：表示する全データ
    props.pageCount：表示するデータの件数を管理する
    props.setPageCount：pageCountを更新する
*/
const Table = (props) => {
    /*
    表示するデータを100件ずつ抽出する
    */
    const extractDatas = () => {
        console.log("extractDatas done");
        const dataArray = [];
        let max = (props.pageCount + 1) * 100;
        console.log("startData:" + 0 + " - endData:" + max);
        for (let i = 0; i < max; i++) {
            if (!props.datas[i]) {
                console.log("props.datas[i] is undefined");
                break;
            }
            dataArray.push(props.datas[i]);
        }
        return dataArray;
    };
    // 表示するデータ(100件ずつ)
    const datas = extractDatas();

    // データ件数が0
    if (props.datas === 0) {
        return (
            <p id="ExceptionMessage">
                <b>該当データがありません</b>
            </p>
        );
    }

    // テーブル上部に表示するテーブル名を取得する
    const selecter = document.getElementById("Selecter");
    const idx = selecter.selectedIndex;
    const tableName = selecter.options[idx].text;

    // infinite-scroll 追加読み込み時
    const loadNext = () => {
        // (*DBG)console.log("loadNext done");
        props.setPageCount(props.pageCount + 1);
    };

    // データ件数が1以上
    if (props.datas.length !== 0) {
        const keys = Object.keys(props.datas[0]);

        return (
            <div id="TableBox">
                <div id="ResultTable">
                    <div id="infomations">
                        <h2 id="tableName">{tableName}</h2>
                        <ExportButton
                            users={props.datas}
                            tableName={tableName}
                        ></ExportButton>
                    </div>
                    <InfiniteScroll
                        dataLength={datas.length}
                        next={loadNext}
                        hasMore={!(datas.length === props.datas.length)}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>all datas loaded</b>
                            </p>
                        }
                    >
                        <table border="1" data-lang="ja">
                            <thead>
                                <tr>
                                    {keys.map((key) => (
                                        <th>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data) => (
                                    <tr>
                                        {Object.keys(data).map((key) => (
                                            <td>{data[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

    return null;
};

export default Table;
