"use client";
import LineGraph from "@/components/LineGraph";
import BarChart from "@/components/BarChart";
import { ethers, Contract, JsonRpcProvider, EventLog, Log } from "ethers";
import { useEffect } from "react";
import CalculateVolume from "@/components/CalculateVolume";

export default function Home() {
    return (
        <>
            <div className="h-full w-full flex flex-col items-center">
                <CalculateVolume />
            </div>
        </>
    );
}
