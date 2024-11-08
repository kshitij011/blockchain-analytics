"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";

// register the elements before using them
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import React from "react";

export default function BarChart({
    baseFeeData,
}: {
    baseFeeData: ChartData<"bar">;
}) {
    const options = {};

    const data = baseFeeData;

    return (
        <>
            <div className="my-10 text-center">
                <h1 className="my-5 font-extrabold ">Base Fee Chart</h1>
                <p className="text-sm text-gray-400">
                    This chart represents the base fee of every single block.
                </p>
                <p className="text-sm text-gray-400">
                    x-axis represents the block number whereas y-axis represents
                    fee value converted to gewi.
                </p>
                <Bar
                    options={options}
                    data={data}
                    className="m-5 h-96 bg-slate-800 rounded-2xl"
                />
            </div>
        </>
    );
}
