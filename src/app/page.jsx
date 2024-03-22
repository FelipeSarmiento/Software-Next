
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import {Inter} from "next/font/google";
import {NavBar} from "./components/NavBar";
import '@mantine/core/styles.css';
import "../settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "../lib/redux/StoreProvider";
import {BackgroundBeams} from "./components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"
import {MacbookScroll} from "./components/AceternityUI/macbook-scroll";
import {HeroParallax} from "@/app/components/AceternityUI/hero-parallax";
import SessionProvider from './SessionProvider';
import '@mantine/core/styles.css';
import "../settings/assets/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'

import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';

config.autoAddCss = false

const inter = Inter({subsets: ["latin"]});
export default function Home() {

    const session = getServerSession(authOptions);
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
            <body className={inter.className + " bg-black min-h-screen from-30% [::-webkit-scrollbar{display:none;}] shrink-0 overflow-x-hidden"}>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Analytics/>
                    <MantineProvider>
                        <div className="bg-black lg:bg-transparent">
                            <NavBar/>
                            <div className="min-h-[calc(100vh_-_84px)]">
                                <div className="bg-black lg:bg-transparent min-h-[calc(100vh_-_84px)]">
                                    <HeroParallax products={products} />
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <BackgroundBeams />
                            </div>
                        </div>
                    </MantineProvider>
                </StoreProvider>
            </SessionProvider>
            <script src="https://cdn.tailwindcss.com"></script>
            </body>
        </>

    )
}