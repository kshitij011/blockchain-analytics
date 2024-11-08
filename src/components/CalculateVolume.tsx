"use client";
import { ethers, Contract, JsonRpcProvider, EventLog, Log } from "ethers";
import { useState, useEffect } from "react";
import React from "react";
import { ChartData } from "chart.js";
import LineGraph from "./LineGraph";
import BarChart from "./BarChart";
import GasUsedPercent from "./GasUsedPercent";

export default function CalculateVolume() {
    const [lineData, setData] = useState<ChartData<"line"> | null>(null);
    const [loading, setLoading] = useState(true);
    const [baseFeeData, setBaseFeeData] = useState<ChartData<"bar"> | null>(
        null
    );
    const [gasUsedPercentage, setGasUsedPercentage] =
        useState<ChartData<"line"> | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const provider: JsonRpcProvider = new JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`
    );
    const abi = [
        "event Transfer(address indexed from, address indexed to, uint value)",
    ];
    const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const contract: Contract = new Contract(contractAddress, abi, provider);

    const getData = async () => {
        try {
            const latestBlock = await provider.getBlockNumber();
            const lastBlock = latestBlock - 9;

            const transferEvents: (EventLog | Log)[] =
                await contract.queryFilter("Transfer", lastBlock, latestBlock);

            console.log("Transfer Events: ", transferEvents);

            const chartData: ChartData<"line"> = calculateData(transferEvents);
            setData(chartData); // Use setData only after data is calculated

            await getBlockData();
            setLoading(false);
        } catch (error) {
            console.error("Error fetching volumes", error);
        }
    };

    const calculateData = (events: (EventLog | Log)[]): ChartData<"line"> => {
        const blockLabels: number[] = [];
        const volumes: bigint[] = [];
        let currentBlockVolume: bigint = BigInt(0);
        let previousBlockNumber = events[0]?.blockNumber;

        events.forEach((event) => {
            const { blockNumber, args } = event as EventLog;
            if (blockNumber === previousBlockNumber) {
                currentBlockVolume += args.value;
            } else {
                volumes.push(currentBlockVolume);
                blockLabels.push(blockNumber - 1);
                currentBlockVolume = args.value;
                previousBlockNumber = blockNumber;
            }
        });

        volumes.push(currentBlockVolume);
        blockLabels.push(previousBlockNumber);

        return {
            labels: blockLabels,
            datasets: [
                {
                    label: "Token Volume",
                    data: volumes.map((volume) => Number(volume)), // Convert BigInt to number for Chart.js
                    borderColor: "rgb(75, 192, 192)",
                },
            ],
        };
    };

    async function getBlockData() {
        const baseFees: number[] = [];
        const labels: number[] = [];
        const gasUsedPercent: number[] = [];

        const latestBlock = await provider.getBlockNumber();

        for (let i = 9; i >= 0; i--) {
            const blockNumber = latestBlock - i;
            const block = await provider.getBlock(blockNumber);
            const baseFee = ethers.formatUnits(
                Number(block?.baseFeePerGas),
                "gwei"
            );
            baseFees.push(Number(baseFee));
            labels.push(Number(block?.number));

            const percentage = Number(
                (
                    (Number(block?.gasUsed) / Number(block?.gasLimit)) *
                    100
                ).toFixed(2)
            );
            gasUsedPercent.push(percentage);
        }

        console.log("Gas used in percentage values: ", gasUsedPercent);

        setGasUsedPercentage({
            labels: labels,
            datasets: [
                {
                    label: "Gas Used (%)",
                    data: gasUsedPercent, // Convert BigInt to number for Chart.js
                    borderColor: "rgb(75, 192, 192)",
                },
            ],
        });

        setBaseFeeData({
            labels: labels,
            datasets: [
                {
                    label: "Gas Fee (gwei)",
                    data: baseFees, // Convert BigInt to number for Chart.js
                    backgroundColor: "rgba(225, 99, 132, 0.2)",
                    borderColor: "rgb(75, 192, 192)",
                    borderWidth: 1,
                },
            ],
        });
    }

    useEffect(() => {
        getData();

        provider.on("block", () => {
            getData(); // Fetch and update volumes with each new block
        });

        // Clean up the listener when component unmounts
        return () => {
            provider.off("block");
        };
    }, []);

    return (
        <>
            {loading ? (
                <h1 className="my-5 font-extrabold">Loading charts...</h1>
            ) : (
                <>
                    {lineData && <LineGraph lineData={lineData} />}
                    {baseFeeData && <BarChart baseFeeData={baseFeeData} />}
                    {gasUsedPercentage !== null && (
                        <GasUsedPercent gasUsedPercentage={gasUsedPercentage} />
                    )}
                </>
            )}
        </>
    );
}
