import ExcelJS from "exceljs";
import "./ExportButton.css";

/** ヘッダ行の背景色 */
const headerFillStyle = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "dcdcdc" },
};
/** ヘッダ行のフォント */
const headerFontStyle = {
    bold: true,
};

/*
エクセルファイルに出力するボタンコンポーネント
*/
const ExportButton = (props) => {
    const exportExcelAsync = async (event) => {
        event.preventDefault();

        // Workbookの作成
        const workbook = new ExcelJS.Workbook();
        // Workbookに新しいWorksheetを追加
        workbook.addWorksheet(props.tableName);
        // ↑で追加したWorksheetを参照し変数に代入
        const worksheet = workbook.getWorksheet(props.tableName);

        // 列を定義
        // worksheet.columns = [
        //     { header: "ID", key: "id" },
        //     { header: "氏名", key: "name" },
        //     { header: "価格", key: "price" },
        // ];
        const keys = Object.keys(props.users[0]);

        // key値の文字列長(列幅指定に利用する)
        const keyLength = {};
        keys.forEach((key) => {
            keyLength[key] = key.length;
        });

        // 列の定義
        const columns = [];
        keys.map((key) =>
            columns.push({
                header: key,
                key: key,
            })
        );
        worksheet.columns = columns;

        // 行の定義
        // worksheet.addRow({ ID: 1001, NAME: "ハンバーガー", price: 170 });
        // worksheet.addRow({ id: 1002, name: "チーズバーガー", price: 200 });
        // worksheet.addRow({
        //     id: 1003,
        //     name: "照り焼きチキンバーガー",
        //     price: 260,
        // });
        props.users.forEach((user) => {
            worksheet.addRow(user);
            Object.keys(user).forEach((key) => {
                if (user[key].length > keyLength[key]) {
                    keyLength[key] = user[key].length;
                }
            });
        });

        // 列幅を指定(EXCELの仕様によりズレる)
        worksheet.columns.forEach((column) => {
            column.width = keyLength[column.key];
        });

        // すべての行を走査
        worksheet.eachRow((row, rowNumber) => {
            // すべてのセルを走査
            if (rowNumber === 1) {
                row.eachCell((cell, colNumber) => {
                    // ヘッダ行のスタイルを設定
                    cell.fill = headerFillStyle;
                    cell.font = headerFontStyle;
                });
            }
            // 行の設定を適用
            row.commit();
        });

        // UInt8Arrayを生成
        const uint8Array = await workbook.xlsx.writeBuffer();
        // Blobを生成
        const blob = new Blob([uint8Array], {
            type: "application/octet-binary",
        });
        // DL用URLを生成し、aタグからダウンロードを実行
        const url = window.URL.createObjectURL(blob);
        // aタグを生成
        const a = document.createElement("a");
        // aタグのURLを設定
        a.href = url;
        // aタグにdownload属性を付け、URLをダウンロード対象に設定
        a.download = props.tableName + ".xlsx";
        // aタグをクリックさせます
        a.click();
        // ダウンロード後は不要なのでaタグを除去
        a.remove();
    };

    return (
        <button id="ExportButton" onClick={(e) => exportExcelAsync(e)}>
            エクセルに出力する
        </button>
    );
};

export default ExportButton;
