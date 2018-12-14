const { uniqBy } = require("lodash");
/**
 * 企業名でユニークにしたデータを返す
 * @param data
 * @returns {*}
 */
module.exports.uniqByCompany = function uniqByCompany(data) {
    return uniqBy(data, item => item["Name"]);
};
