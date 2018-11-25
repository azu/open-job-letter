const { groupBy } = require("lodash");

module.exports = data => {
    const dataObject = groupBy(data, "日付");
    const sortedByDate = Object.keys(dataObject).sort();
    const results = [];
    sortedByDate.forEach(dateName => {
        dataObject[dateName].forEach(item => {
            item["リファラ"].forEach(リファラ => {
                results.push({
                    リファラ: リファラ,
                    日付: dateName
                });
            });
        });
    });
    const groupByリファラ = groupBy(results, "リファラ");
    const traces = Object.keys(groupByリファラ).map(position => {
        const groupByDate = groupBy(groupByリファラ[position], "日付");
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
