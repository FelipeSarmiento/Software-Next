'use client'

import {MacbookScroll} from "./components/AceternityUI/macbook-scroll";
import {HeroParallax} from "@/app/components/AceternityUI/hero-parallax";

export default function Home() {
    const products = [
        {
            title: "Moonbeam",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
        },
        {
            title: "Cursor",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/cursor.png",
        },
        {
            title: "Rogue",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/rogue.png",
        },

        {
            title: "Editorially",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/editorially.png",
        },
        {
            title: "Editrix AI",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/editrix.png",
        },
        {
            title: "Pixel Perfect",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
        },

        {
            title: "Algochurn",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
        },
        {
            title: "Aceternity UI",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
        },
        {
            title: "Tailwind Master Kit",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
        },
        {
            title: "SmartBridge",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
        },
        {
            title: "Renderwork Studio",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
        },

        {
            title: "Creme Digital",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
        },
        {
            title: "Golden Bells Academy",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
        },
        {
            title: "Invoker Labs",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/invoker.png",
        },
        {
            title: "E Free Invoice",
            link: "",
            thumbnail:
                "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
        },
    ];
    return (
        <>
            <div className=" min-h-[calc(100vh_-_84px)]">
                <HeroParallax products={products} />
            </div>
        </>

    )
}