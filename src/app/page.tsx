"use client";

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
