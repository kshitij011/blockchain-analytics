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

export default function LineGraph({
    data,
}: {
    data: {
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
    const options = {};

    return (
        <>
            <div className="my-5 text-center">
                <h1 className="my-5 font-extrabold">Token Volume Chart</h1>
                <p className="text-sm text-gray-400">
                    This chart represents the total volume of tokens traded on
                    the in single block.
                </p>
                <p className="text-sm text-gray-400">
                    x-axis represents the block number whereas y-axis represents
                    volume.
                </p>
                <div className="h-96">
                    <Line
                        options={options}
                        data={data}
                        className="m-5 h-96 bg-slate-800 rounded-2xl"
                    />
                </div>
            </div>
        </>
    );
}
