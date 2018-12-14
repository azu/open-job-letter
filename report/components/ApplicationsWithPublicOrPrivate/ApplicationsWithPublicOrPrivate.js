import React from "react";
import Plot from "react-plotly.js";

const { labels, values } = require("./data.json");

export function ApplicationsWithPublicOrPrivate() {
    return (
        <Plot
            data={[
                {
                    values: values,
                    labels: labels,
                    type: "pie"
                }
            ]}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                title: "応募方法の公開状態について"
            }}
        />
    );
}
