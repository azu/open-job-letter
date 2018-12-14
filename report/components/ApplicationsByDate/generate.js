const { groupBy } = require("lodash");
module.exports = data => {
    const dataObject = groupBy(data, "日付");
    const sortedByDate = Object.keys(dataObject).sort();
    const x = sortedByDate.map(dateName => {
        return new Date(dateName);
    });
    const y = sortedByDate.map(dateName => {
        return dataObject[dateName].length;
    });
    return { x, y };
};
