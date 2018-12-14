import React from "react";
import Plot from "react-plotly.js";

const { labels, values } = require("./data.json");

export function ApplicationsByPosition() {
    return (
        <Plot
            data={[
                {
                    x: values,
                    y: labels,
                    orientation: "h",
                    type: "bar",
                    hoverinfo: "x",
                    automargin: true,
                    marker: {
                        color: "rgb(158,202,225)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(8,48,107)",
                            width: 1.5
                        }
                    }
                }
            ]}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                title: "応募者のポジション",
                yaxis: {
                    tickmode: "linear",
                    ticks: "outside",
                    ticklen: 8,
                    automargin: true
                }
            }}
        />
    );
}
