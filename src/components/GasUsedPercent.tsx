"use client";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// register the elements before using them
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function GasUsedPercent({
    gasUsedPercentage,
}: {
    gasUsedPercentage: {
        labels: [];
        datasets: [
            {
                label: "Token Volume";
                data: [];
                borderColor: "rgb(75, 192, 192)";
            }
        ];
    };
}) {
    console.log("gas used Percent data", gasUsedPercentage);

    const options = {};

    // const data = gasUsedPercentage;

    return (
        <>
            <div className="my-5 text-center">
                <h1 className="my-5 font-extrabold">
                    Gas Used Percentage Per Block Chart
                </h1>
                <p className="text-sm text-gray-400">
                    This chart represents the percentage of gas used out of gas
                    limit for every block.
                </p>
                <p className="text-sm text-gray-400">
                    x-axis represents the block number whereas y-axis represents
                    the percentage of gas used.
                </p>
                <Line
                    options={options}
                    data={gasUsedPercentage}
                    className="m-5 h-96 bg-slate-800 rounded-2xl"
                />
            </div>
        </>
    );
}
