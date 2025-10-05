import React from "react";
import "@/settings/assets/globals.css";
import {SparklesCore} from "@/../src/app/components/AceternityUI/sparkles";
import {TextGenerateEffect} from "../components/AceternityUI/text-generate-effect";
import Image from "next/image";

// @ts-ignore
import login from '@/settings/assets/images/login.png'
// @ts-ignore
import createProject from '@/settings/assets/images/createProject.png'
// @ts-ignore
import dashboard from '@/settings/assets/images/dashboard.png'
// @ts-ignore
import previewPage from '@/settings/assets/images/previewPage.png'
// @ts-ignore
import contact from '@/settings/assets/images/contact.png'
export default function Home() {
    const words = `Welcome to our platform! Here's a guide on how to use our website builder`

    return (
        <>
            <div className="h-[calc(80vh_-_80px)] w-full flex flex-col items-center pt-24 sm:pt-36 xl:pt-40 2xl:pt-60 overflow-hidden rounded-md">
                <h1 className="md:text-6xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
                    <span className="text-cyan-500">How to use?</span>
                </h1>
                <div className="w-full md:w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4"/>
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>

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
                        <TextGenerateEffect className="text-center leading-normal text-2xl md:text-3xl" words={words}/>
                    </div>

                    {/* Radial Gradient to prevent sharp edges */}
                    <div
                        className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
            <div className="px-12 md:px-32 py-4 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 place-items-center">
                <div className="w-full h-72 flex flex-col items-center order-1 md:order-1 justify-center px-6 text-center shadow-lg shadow-cyan-100 rounded-md">
                    <span className="text-2xl font-extrabold">Sign Up/Login</span>
                    <span className="text-lg font-bold">Start by creating an account or logging in if you already have one.</span>
                </div>
                <div className="w-full h-72 flex flex-col items-center order-2 md:order-2 justify-center border-green-500 shadow-lg shadow-cyan-500 rounded-md">
                    <Image width={500} height={100} className="object-contain h-5/6" src={login} alt=""/>
                </div>
                <div className="w-full h-72 flex order-4 flex-col items-center md:order-4 justify-center border-green-500 shadow-lg shadow-cyan-500 rounded-md">
                    <Image width={500} height={100} className="object-contain h-5/6" src={createProject} alt=""/>
                </div>
                <div className="w-full h-72 flex flex-col order-3 items-center md:order-5 justify-center px-6 text-center shadow-lg shadow-cyan-100 rounded-md">
                    <span className="text-2xl font-extrabold">Create a project</span>
                    <span className="text-lg font-extrabold">Browse through our selection of pre-designed templates and choose the one that best fits your needs.</span>
                </div>
                <div className="w-full h-72 flex flex-col order-5 items-center md:order-6 justify-center px-6 text-center shadow-lg shadow-cyan-100 rounded-md">
                    <span className="text-2xl font-extrabold">Customize Your Site</span>
                    <span className="text-lg font-extrabold">Add components or predefined sections to your website. You can also edit styles and configurations to match your preferences.</span>
                </div>
                <div className="w-full h-72 flex flex-col order-6 items-center md:order-7 justify-center border-green-500 shadow-lg shadow-cyan-500 rounded-md">
                    <Image width={500} height={100} className="object-contain h-5/6" src={dashboard} alt=""/>
                </div>
                <div className="w-full h-72 flex flex-col items-center order-8 md:order-8 justify-center border-green-500 shadow-lg shadow-cyan-500 rounded-md">
                    <Image width={500} height={100} className="object-contain h-5/6" src={previewPage} alt=""/>
                </div>
                <div className="w-full h-72 flex flex-col items-center order-7 md:order-9 justify-center px-6 text-center shadow-lg shadow-cyan-100 rounded-md">
                    <span className="text-2xl font-extrabold">Preview and Publish</span>
                    <span className="text-lg font-extrabold">Preview your website to see how it looks. Once satisfied, simply publish your changes. Your website will be live immediately without the need for separate hosting.</span>
                </div>
                <div className="w-full h-72 flex flex-col items-center order-8 md:order-10 justify-center px-6 text-center shadow-lg shadow-cyan-100 rounded-md">
                    <span className="text-2xl font-extrabold">Need Assistance?</span>
                    <span className="text-lg font-extrabold">If you find the process tedious or need help, you can opt for services such as site creation assistance or dedicated developer support.</span>
                </div>
                <div className="w-full h-72 flex flex-col items-center order-9 md:order-12 justify-center border-green-500 shadow-lg shadow-cyan-500 rounded-md">
                    <Image width={500} height={100} className="object-contain h-5/6" src={contact} alt=""/>
                </div>

            </div>
        </>
    );
}