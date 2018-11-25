import React from "react";
import Plot from "react-plotly.js";

const traces = require("./data.json");

export function ApplicationsByDateWithReferrer() {
    return (
        <Plot
            data={traces}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                barmode: "stack",
                title: "応募数/応募方法/日",
                xaxis: {
                    tickformat: "%Y-%m-%d",
                    tickmode: "linear",
                    automargin: true
                }
            }}
        />
    );
}
