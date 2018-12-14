"use strict";
const crypto = require("crypto");
// https://ja.wikipedia.org/wiki/K-%E5%8C%BF%E5%90%8D%E6%80%A7
// https://www.dekyo.or.jp/kenkyukai/data/6th/20171125_doc1-3.pdf
// secret.jsonで定義されたデータの匿名性についての定義
// 識別子: ユニークなので公開できない値
// 準識別子: 組み合わせによっては推定できる可能性がある値
//          公開時にk=2としてK匿名性が成立するようにマスク処理を行う必要がある
// 値: 公開しても問題ない値
// 加工値: 公開しても問題ない値
const Schema = {
    Name: {
        type: "識別子"
    },
    Status: {
        type: "識別子"
    },
    URL: {
        type: "識別子"
    },
    ジャンル: {
        type: "準識別子"
    },
    ステージ: {
        type: "準識別子"
    },
    リファラ: {
        type: "値"
    },
    従業員数: {
        type: "準識別子"
    },
    応募者: {
        type: "値"
    },
    日付: {
        type: "値"
    },
    設立年: {
        // 年数によって1となる値がでる可能性がある
        // ただし社会全体で見れば十分な匿名性があると判断できる
        type: "加工値"
    }
};

const HASH_SUFFIX = crypto.randomBytes(20).toString("hex");

/**
 * `text`をハッシュ化する。
 * その計算でユニークであればいいので、その計算中にランダムな固定値を加えてからハッシュ化する
 * @param text
 * @returns {string}
 */
function toHash(text) {
    const hash = crypto.createHash("sha256");
    hash.update(text + HASH_SUFFIX);
    return hash.digest("hex");
}

/**
 * K匿名性をK=nを満たすように変換する
 * K未満のデータは `maskValue` でマスクされる
 * @param data
 * @param {number} [k]
 * @param {string} [maskValue]
 */
function anonymize(data, k = 2, maskValue = "その他") {
    Object.entries(Schema).forEach(([schemaName, prop]) => {
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key !== schemaName) {
                    return;
                }
                // 識別子はハッシュ化する
                if (prop.type === "識別子") {
                    item[key] = toHash(item[key]);
                    return;
                }
                // 準識別子に対してK匿名性をチェックする
                if (prop.type === "準識別子") {
                    const sameValueItems = data.filter(targetItem => targetItem[key] === item[key]);
                    // k匿名性を満たしていないデータはマスクする
                    if (sameValueItems.length < k) {
                        item[key] = maskValue;
                    }
                }
            });
        });
    });
    return data;
}

module.exports.anonymize = anonymize;
module.exports.Schema = Schema;
