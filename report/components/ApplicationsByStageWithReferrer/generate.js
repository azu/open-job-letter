const { groupBy } = require("lodash");
const schemeCategory10 = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf"
];
module.exports = data => {
    // label = ステージ.concat(リファラ) ラベル
    // source = ステージ
    // target = ステージからリファラ
    // value  = ステージがリファラの数
    const ステージgroup = groupBy(data, "ステージ");
    const stageLabels = [];
    // ステージ名を先に詰める
    Object.keys(ステージgroup).forEach(ステージ => {
        // label:
        stageLabels.push(ステージ);
    });
    // [...stageLabels]
    // <-> indexをあわせる
    // [{ "Bosyu": 2, "Twitter": 1 }, ...] = stageLinks
    const stageLinks = {};
    Object.keys(ステージgroup).forEach((ステージ, index) => {
        // target:
        const items = ステージgroup[ステージ];
        const リファラgroup = groupBy(
            items.reduce((total, item) => {
                // "応募者"が複数はそれぞれ別のアイテムに切り出す
                item["リファラ"].forEach(referrer => {
                    total.push({
                        リファラ: referrer
                    });
                });
                return total;
            }, []),
            "リファラ"
        );
        Object.keys(リファラgroup).forEach(リファラ => {
            stageLinks[stageLabels[index]] = Object.assign({}, stageLinks[stageLabels[index]], {
                // "bosyu": 2
                [リファラ]: リファラgroup[リファラ].length
            });
        });
    });
    /**
     * { '上場':
           { Bosyu: 4,
             GitHub: 2,
             'Twitter Reply': 2,
             'Twitter DM': 3,
             'その他': 1 },
          '子会社': { GitHub: 2, Bosyu: 1 },
          'C. レイター': { Bosyu: 1, 'Twitter DM': 1 },
          'B. ミドル': { GitHub: 1, Bosyu: 3, 'Twitter Reply': 2, 'Twitter DM': 1 },
          'A. アーリー': { 'Twitter Reply': 2, Bosyu: 3, Mail: 2, 'Twitter DM': 1 },
          '0. シード': { Bosyu: 1, 'Twitter DM': 1 } }
     */
    const stageDimension = {
        label: "ステージ",
        values: []
    };
    const referrerDimension = {
        label: "応募方法",
        values: []
    };
    const counts = [];
    const colors = [];
    Object.entries(stageLinks).forEach(([stageName, referrerObject], index) => {
        Object.entries(referrerObject).forEach(([referrerName, referrerCount]) => {
            colors.push(schemeCategory10[index]);
            stageDimension.values.push(stageName);
            referrerDimension.values.push(referrerName);
            counts.push(referrerCount);
        });
    });
    return { dimensions: [stageDimension, referrerDimension], counts, colors };
};
