const { uniqByCompany } = require("../../helper/uniq-by.js");
const { validValidApplicationTypes } = require("../definitions.js");
module.exports = data => {
    // 同じ企業が複数回応募していることを考慮、
    const uniqData = uniqByCompany(data);
    return uniqData.filter(item => {
        return validValidApplicationTypes.some(type => {
            return item["リファラ"].includes(type);
        });
    }).length;
};
