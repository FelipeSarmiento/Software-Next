import SessionProvider from '../SessionProvider';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/../pages/api/auth/[...nextauth]';
import {Inter} from "next/font/google";
import {NavBar} from "@/app/components/NavBar";
import '@mantine/core/styles.css';
import "@/settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "../../lib/redux/StoreProvider";
import {BackgroundBeams} from "@/app/components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"

import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';

config.autoAddCss = false

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {


    const session = getServerSession(authOptions);

    return (
        <>
            <body className={"bg-transparent min-h-screen overflow-x-hidden"}>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Analytics/>
                    <MantineProvider>
                        <div className="relative bg-black">
                            <NavBar/>
                            <div className="min-h-[calc(100vh_-_84px)]">
                                <div className="min-h-[calc(100vh_-_84px)] snap-y">
                                    { children }
                                </div>
                            </div>
                            <BackgroundBeams />
                        </div>
                    </MantineProvider>
                </StoreProvider>
            </SessionProvider>
            <script src="https://cdn.tailwindcss.com"></script>
            </body>
        </>
    );
}
