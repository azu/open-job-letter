const { pickBy } = require("../../helper/pick-by.js");
module.exports = data => {
    return pickBy(data, "ジャンル");
};
