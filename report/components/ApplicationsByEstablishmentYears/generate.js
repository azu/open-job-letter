const { pickBy } = require("../../helper/pick-by.js");
module.exports = data => {
    return pickBy(data, "設立年", entry => {
        return entry[0];
    });
};
