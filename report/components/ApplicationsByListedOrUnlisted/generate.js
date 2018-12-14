module.exports = data => {
    const 上場 = data.filter(item => {
        return item["ステージ"] === "上場";
    });
    const labels = ["上場", "非上場"];
    const values = [上場.length, data.length - 上場.length];
    return { labels, values };
};
