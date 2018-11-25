const uniqByCompany = require("../../helper/uniq-by.js").uniqByCompany;
module.exports = data => {
    // 同じ企業が複数回応募していることを考慮する
    return uniqByCompany(data).length;
};
