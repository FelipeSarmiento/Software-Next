import React from "react";
import "@/settings/assets/globals.css";
import {SparklesCore} from "@/../src/app/components/AceternityUI/sparkles";
import {TextGenerateEffect} from "../components/AceternityUI/text-generate-effect";
import { Spotlight } from "../components/AceternityUI/Spotlight";
export default function Home() {
    const words = `Welcome to our About page! Here you can learn more about our platform:`

    return (
        <>
            <div className="">
                <div className="h-[25rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="white"
                    />
                    <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            About
                        </h1>
                        <p className="mt-4 font-normal text-base text-neutral-300 max-w-xl text-center mx-auto">
                            Welcome to our About page! Here you can learn more about our platform:
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <div className="h-[25rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                        <Spotlight
                            className="-top-40 left-0 md:left-60 md:-top-20"
                            fill="white"
                        />
                        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                                Our Mission
                            </h1>
                            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                                We aim to empower individuals and businesses to create stunning websites effortlessly, without the need for programming knowledge. With our intuitive website builder, anyone can bring their ideas to life online.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="h-[25rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                        <Spotlight
                            className="-top-40 left-0 md:left-60 md:-top-20"
                            fill="white"
                        />
                        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                                Our Team
                            </h1>
                            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                                We are a dedicated team of developers and designers passionate about simplifying the website creation process. Our goal is to provide the best tools and support for our users to succeed in their online ventures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}