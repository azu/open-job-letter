const { groupBy } = require("lodash");
const { pickBy } = require("../../helper/pick-by.js");

module.exports = data => {
    const dataObject = groupBy(data, "日付");
    const sortedByDate = Object.keys(dataObject).sort();
    const results = [];
    sortedByDate.forEach(dateName => {
        dataObject[dateName].forEach(item => {
            // "応募者"が複数はそれぞれ別のアイテムに切り出す
            results.push({
                設立年: item["設立年"],
                日付: dateName
            });
        });
    });
    const groupBy設立年 = groupBy(results, "設立年");
    const traces = Object.keys(groupBy設立年).map(position => {
        const groupByDate = groupBy(groupBy設立年[position], "日付");
        const dateNames = Object.keys(groupByDate).sort();
        return {
            x: dateNames.map(dateName => new Date(dateName)),
            y: dateNames.map(dateName => groupByDate[dateName].length),
            name: position,
            type: "bar"
        };
    });
    return traces;
};
