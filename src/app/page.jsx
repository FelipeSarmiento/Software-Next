'use client'

import {MacbookScroll} from "./components/AceternityUI/macbook-scroll";
import {HeroParallax} from "@/app/components/AceternityUI/hero-parallax";

export default function Home() {
    return (
        <>
            <div className=" min-h-[calc(100vh_-_84px)]">

                {/*
            <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="flex items-center isolate overflow-hidden border-2 border-indigo-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-12 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            <span
                                className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-700 to-purple-950">My Portfolio:</span>
                            <br/>
                            Tu Espacio Digital de Desarrollador
                        </h2>
                        <div className="h-48 items-start cursor-auto">
                            <Carousel leftControl="." rightControl="." indicators={false} slideInterval={3000}>
                                <p className="mt-3 text-lg leading-8 text-gray-300">
                                    ¡Bienvenido a nuestra plataforma de creación de portafolios para desarrolladores! En
                                    un
                                    mundo donde la presencia digital es crucial, hemos simplificado el proceso para que
                                    cada
                                    desarrollador pueda destacar su trabajo de manera única y profesional.
                                </p>
                                <p className="mt-3 text-lg leading-8 text-gray-300">
                                    Con una interfaz fácil de usar, similar a WordPress, te invitamos a explorar las
                                    infinitas
                                    posibilidades de personalización y destacar tus habilidades de manera efectiva.
                                    ¡Convierte
                                    tu experiencia y proyectos en una impresionante carta de presentación online en
                                    minutos!
                                </p>
                            </Carousel>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/Dashboard"
                                className="rounded-md bg-gradient-to-r from-indigo-700 to-purple-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Empezar
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-10 h-80 lg:mt-8">
                        <img
                            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                            alt="App screenshot"
                            width={1824}
                            height={1080}
                        />
                    </div>
                </div>
            </div>
            */}
                <HeroParallax products={products} />;
            </div>
        </>

    )
}

export const products = [
    {
        title: "Moonbeam",
        link: "https://gomoonbeam.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
        title: "Rogue",
        link: "https://userogue.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },

    {
        title: "Editorially",
        link: "https://editorially.org",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
        title: "Editrix AI",
        link: "https://editrix.ai",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
        title: "Pixel Perfect",
        link: "https://app.pixelperfect.quest",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },

    {
        title: "Algochurn",
        link: "https://algochurn.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
        title: "Aceternity UI",
        link: "https://ui.aceternity.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
        title: "Tailwind Master Kit",
        link: "https://tailwindmasterkit.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
        title: "SmartBridge",
        link: "https://smartbridgetech.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
        title: "Renderwork Studio",
        link: "https://renderwork.studio",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },

    {
        title: "Creme Digital",
        link: "https://cremedigital.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
        title: "Golden Bells Academy",
        link: "https://goldenbellsacademy.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
        title: "Invoker Labs",
        link: "https://invoker.lol",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
        title: "E Free Invoice",
        link: "https://efreeinvoice.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
];