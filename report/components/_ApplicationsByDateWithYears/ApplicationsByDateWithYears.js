import React from "react";
import Plot from "react-plotly.js";

const traces = require("./data.json");

export function ApplicationsByDateWithYears() {
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
                title: "応募数/設立年/日",
                xaxis: {
                    tickformat: "%Y-%m-%d",
                    tickmode: "linear",
                    automargin: true
                }
            }}
        />
    );
}
