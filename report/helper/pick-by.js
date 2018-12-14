const lodash = require("lodash");

/**
 * propertyNameでグループ分けして、それぞれラベルに対する値の配列を返す
 * {
 *   labels: [a, b, c]
 *   values: [1, 2, 3]
 * }
 * @param {*[]} data
 * @param {string} propertyName
 * @param {function} [sortBy]
 * @returns {{labels: *, values: *}}
 */
module.exports.pickBy = function pickBy(data, propertyName, sortBy) {
    const entries = lodash
        .chain(data)
        .groupBy(propertyName)
        .toPairs()
        .map(entry => {
            // [ラベル, 数]
            return [entry[0], entry[1].length];
        })
        // デフォルトは値でソートする
        .sortBy(sortBy ? sortBy : entry => entry[1])
        .values();
    const labels = entries.map(([name]) => {
        return name;
    });
    const values = entries.map(([name, value]) => {
        return value;
    });
    return { labels, values };
};
