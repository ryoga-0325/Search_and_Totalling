/*
Expressサーバー側のルーティング(/users)
*/

var express = require("express");
var router = express.Router();

const connect = require("../config/connect");

/*
GET送信時：初回レンダリング時に検索項目の一覧を取得する
*/
router.get("/", async function(req, res, next) {
    const sql = "SELECT QUERY_ID, QUERY_TYPE, QUERY_NAME FROM MST_QUERY;";
    const optionData = await connect.test(sql);
    console.log(optionData);
    res.json(optionData);
});

/*
POST送信時：パラメータをSQLに埋め込み、データを取得する
取得したデータはJSON形式で返す
*/
router.post("/", async function(req, res, next) {
    const requestSql =
        "SELECT SQL_BODY, QUERY_TYPE FROM MST_QUERY WHERE QUERY_ID = " +
        parseInt(req.body.queryId);

    const queryData = await connect.test(requestSql);
    // (*DBG)console.log(queryData);

    const sql = insertParameter(queryData, req.body);
    // (*DBG)console.log(sql);

    const data = await connect.test(sql);
    // (*DBG)console.log(data);
    res.json(data);
});

/*
関数概要：SQLにパラメータを埋め込む
引数：queryData(SQL本体)、reqBody(パラメータ)
戻り値：sql(パラメータを埋め込んだSQL)
*/
const insertParameter = (queryData, reqBody) => {
    let sql;
    // replaceAll未実装 要nodeバージョン確認(case 2)
    // replaceAllが実装できれば、全てのcaseの処理を統一できる
    switch (queryData[0].QUERY_TYPE) {
        case 1:
            sql = queryData[0].SQL_BODY.replace("@PARAM_1", reqBody.PARAM_1);
            sql = sql.replace("@PARAM_2", reqBody.PARAM_2);
            break;
        case 2:
            sql = queryData[0].SQL_BODY.replace("@PARAM_1", reqBody.PARAM_1);
            sql = sql.replace("@PARAM_1", reqBody.PARAM_1);
            break;
        case 3:
            sql = queryData[0].SQL_BODY.replace("@PARAM_1", reqBody.PARAM_1);
            break;
        case 4:
            sql = queryData[0].SQL_BODY.replace("@PARAM_1", reqBody.PARAM_1);
            break;
        default:
            sql = queryData[0].SQL_BODY;
            break;
    }
    return sql;
};

module.exports = router;