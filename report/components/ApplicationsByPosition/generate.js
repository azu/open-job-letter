const { pickBy } = require("../../helper/pick-by.js");
module.exports = data => {
    const expandData = data.reduce((total, item) => {
        // "応募者"が複数はそれぞれ別のアイテムに切り出す
        item["応募者"].forEach(person => {
            total.push({
                応募者: person
            });
        });
        return total;
    }, []);
    return pickBy(expandData, "応募者");
};
