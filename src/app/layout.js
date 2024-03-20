import SessionProvider from './SessionProvider';
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

import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';

config.autoAddCss = false

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Software Next - Alpha version",
    favicon: "/favicon.ico",
    description: "Software Next: The Next Generation of Software Development",
};

export default function RootLayout({children}) {


    const session = getServerSession(authOptions);
    return (
        <html className="dark" lang="en">
        <head>
            <link rel="icon" href="https://cdn.hugeicons.com/icons/snow-stroke-rounded.svg" />
            <ColorSchemeScript defaultColorScheme="auto" />
        </head>
            <body className={inter.className + "bg-black min-h-screen from-30% [::-webkit-scrollbar{display:none;}] shrink-0 overflow-x-hidden"}>
                    <SessionProvider session={session}>
                        <StoreProvider>
                            <Analytics/>
                            <MantineProvider>
                            <NavBar/>
                            {children}
                            <div className="hidden lg:block">
                                <BackgroundBeams />
                            </div>
                            </MantineProvider>
                        </StoreProvider>
                    </SessionProvider>
                    <script src="https://cdn.tailwindcss.com"></script>
            </body>
        </html>
    );
}
