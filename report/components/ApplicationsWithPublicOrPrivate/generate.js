const OPEN_TYPE = ["Twitter Reply", "GitHub"];
module.exports = data => {
    const opened = data.filter(item => {
        return OPEN_TYPE.some(type => item["リファラ"].includes(type));
    });
    const labels = ["Public", "Private"];
    const values = [opened.length, data.length - opened.length];
    return { labels, values };
};
