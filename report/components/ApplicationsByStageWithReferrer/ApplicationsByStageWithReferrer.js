import React from "react";
import Plot from "react-plotly.js";

const { dimensions, counts, colors } = require("./data.json");

export function ApplicationsByStageWithReferrer() {
    return (
        <Plot
            data={[
                {
                    type: "parcats",
                    dimensions: dimensions,
                    counts: counts,
                    line: {
                        color: colors
                    }
                }
            ]}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                title: "ステージと応募方法の対応関係"
            }}
        />
    );
}
