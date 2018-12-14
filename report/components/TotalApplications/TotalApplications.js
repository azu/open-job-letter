import React from "react";

const total = require("./data.json");

export function TotalApplications() {
    return <span>{total}</span>;
}
