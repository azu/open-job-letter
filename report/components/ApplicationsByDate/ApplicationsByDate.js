import React from "react";
import Plot from "react-plotly.js";

const { x, y } = require("./data.json");

export function ApplicationsByDate() {
    return (
        <Plot
            data={[
                {
                    x: x,
                    y: y,
                    type: "bar",
                    text: y.map(String),
                    textposition: "auto",
                    hoverinfo: "y",
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
                title: "応募数/日",
                xaxis: {
                    tickformat: "%Y-%m-%d",
                    tickmode: "linear",
                    automargin: true
                }
            }}
        />
    );
}
