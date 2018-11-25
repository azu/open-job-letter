// 匿名化
const path = require("path");
const fs = require("fs");
const globby = require("globby");
const secret = require("./secret.json");
const anonymize = require("./data-schema.js").anonymize;
/**
 * 応募者が複数人いる場合は"CTO,エンジニア"のようになっている
 * @param 応募者
 * @returns {string[]}
 */
const normalize応募者 = 応募者 => {
    return 応募者.split(",");
};
const normalizeリファラ = リファラ => {
    return リファラ
        .replace(/\(フライング\)/g, "")
        .replace(/TwitterDM/g, "Twitter DM")
        .replace(/^Twitter$/g, "Twitter Reply")
        .split(",");
};
const normalize従業員数 = 従業員数 => {
    if (従業員数 <= 10) {
        return "0-10";
    } else if (従業員数 <= 50) {
        return "11-50";
    } else if (従業員数 <= 100) {
        return "51-100";
    } else if (従業員数 <= 250) {
        return "101-250";
    } else if (従業員数 <= 500) {
        return "251-500";
    } else if (従業員数 <= 1000) {
        return "501-1000";
    } else {
        return "1000+";
    }
};
/**
 *
 * @param 設立年 実際の設立年数
 * @returns {string} ノーマイライズした年数
 */
const normalize設立年 = 設立年 => {
    if (設立年 <= 1990) {
        return "1900年-1990年";
    } else if (設立年 <= 2000) {
        return "1991年-2000年";
    } else if (設立年 <= 2010) {
        return "2001年-2010年";
    }
    return `${設立年}年`;
};

const normalizedSecret = anonymize(
    secret.map(item => {
        return {
            ...item,
            従業員数: normalize従業員数(item["従業員数"]),
            応募者: normalize応募者(item["応募者"]),
            リファラ: normalizeリファラ(item["リファラ"]),
            設立年: normalize設立年(item["設立年"])
        };
    })
);

globby.sync(__dirname + "/**/*/generate.js").forEach(generatePath => {
    const generate = require(generatePath);
    const generatedData = generate(normalizedSecret);
    fs.writeFileSync(
        path.join(path.dirname(generatePath), "data.json"),
        JSON.stringify(generatedData, null, 4),
        "utf-8"
    );
});
