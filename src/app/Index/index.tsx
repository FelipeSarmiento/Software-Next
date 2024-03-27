"use client";
import React from "react";
import { SparklesCore } from "@/../src/app/components/AceternityUI/sparkles";
import { TextGenerateEffect } from "../components/AceternityUI/text-generate-effect";

export function Index() {
    const words = `Welcome to Software Next, where creativity meets simplicity in website creation!
Are you looking to build a stunning website without the hassle of coding? Look no further! Our intuitive platform empowers individuals and businesses to bring their ideas to life online, effortlessly.`

    return (
        <div className="h-[40rem] w-full flex flex-col items-center pt-12 md:justify-center overflow-hidden rounded-md">
            <h1 className="md:text-6xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
                Software Next
            </h1>
            <div className="w-full md:w-[40rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.5}
                    maxSize={1}
                    particleDensity={1000}
                    className="w-full h-full"
                    particleColor="#1fbdd8"
                />
                <div className="absolute w-full px-4 lg:w-[200%] left-2/4 -translate-x-2/4 top-12 z-50 text-white">
                    <TextGenerateEffect className="text-center leading-normal text-2xl md:text-3xl" words={words} />
                </div>

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    );
}
