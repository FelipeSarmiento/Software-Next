"use client";
import React from "react";
import { SparklesCore } from "@/../src/app/components/AceternityUI/sparkles";
import { TextGenerateEffect } from "../components/AceternityUI/text-generate-effect";
import Image from "next/image";
import { StickyScroll } from "../components/AceternityUI/sticky-scroll-reveal";

export function Index() {
    const content = [
        {
            title: "Collaborative Editing",
            description:
                "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                    Collaborative Editing
                </div>
            ),
        },
        {
            title: "Real time changes",
            description:
                "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
            content: (
                <div className="h-full w-full  flex items-center justify-center text-white">
                    <Image
                        src="/linear.webp"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                        alt="linear board demo"
                    />
                </div>
            ),
        },
        {
            title: "Version control",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                    Version control
                </div>
            ),
        },
        {
            title: "Running out of content",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                    Running out of content
                </div>
            ),
        },
    ];
    const words = `Welcome to Software Next, where creativity meets simplicity in website creation!
Are you looking to build a stunning website without the hassle of coding? Look no further! Our intuitive platform empowers individuals and businesses to bring their ideas to life online, effortlessly.`

    return (
        <>
            <div className="h-[calc(100vh_-_84px)] w-full flex flex-col items-center pt-12 md:pt-28 xl:pt-40 2xl:pt-60 overflow-hidden rounded-md">
                <h1 className="md:text-6xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
                    <span className="text-cyan-500">Software Next</span>
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
                    <div className="absolute w-full px-4 xl:w-[200%] left-2/4 -translate-x-2/4 top-12 z-30 text-white">
                        <TextGenerateEffect className="text-center leading-normal text-2xl md:text-3xl" words={words} />
                    </div>

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
            <div className="bg-red-500">
                <div className="bg-green-500">
                    <StickyScroll contentClassName="w-full" content={content} />
                </div>
            </div>
        </>
    );
}
