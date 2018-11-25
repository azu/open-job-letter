const { groupBy } = require("lodash");
const { pickBy } = require("../../helper/pick-by.js");

module.exports = data => {
    const dataObject = groupBy(data, "日付");
    const sortedByDate = Object.keys(dataObject).sort();
    const results = [];
    sortedByDate.forEach(dateName => {
        dataObject[dateName].forEach(item => {
            // "応募者"が複数はそれぞれ別のアイテムに切り出す
            item["応募者"].forEach(person => {
                results.push({
                    応募者: person,
                    日付: dateName
                });
            });
        });
    });
    const groupBy応募者 = groupBy(results, "応募者");
    const traces = Object.keys(groupBy応募者).map(position => {
        const groupByDate = groupBy(groupBy応募者[position], "日付");
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
