const { pickBy } = require("../../helper/pick-by.js");
module.exports = data => {
    const expandData = data.reduce((total, item) => {
        // "応募者"が複数はそれぞれ別のアイテムに切り出す
        item["リファラ"].forEach(person => {
            total.push({
                リファラ: person
            });
        });
        return total;
    }, []);
    return pickBy(expandData, "リファラ");
};
