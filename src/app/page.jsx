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
import SessionProvider from './SessionProvider';
import '@mantine/core/styles.css';
import "../settings/assets/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {MantineProvider} from '@mantine/core';
import { Index } from './Index';

config.autoAddCss = false

const inter = Inter({subsets: ["latin"]});
export default function Home() {

    const session = getServerSession(authOptions);
    return (
        <>
            <body className={"bg-black text-white min-h-screen overflow-x-hidden"}>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Analytics/>
                    <MantineProvider>
                        <div className="">
                            <NavBar/>
                            <div className="min-h-[calc(100vh_-_84px)]">
                                <Index/>
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