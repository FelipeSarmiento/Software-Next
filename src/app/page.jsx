import {NavBar} from "./components/NavBar";
import '@mantine/core/styles.css';
import "../settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "../lib/redux/StoreProvider";
import {BackgroundBeams} from "./components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"
import '@mantine/core/styles.css';
import "../settings/assets/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {MantineProvider} from '@mantine/core';
import { Index } from './Index';

config.autoAddCss = false
export default function Home() {
    return (
        <>
            <body className={"bg-black text-white min-h-screen overflow-x-hidden"}>
                <StoreProvider>
                    <Analytics/>
                    <MantineProvider>
                        <div className="">
                            <NavBar/>
                            <div className="min-h-[calc(100vh_-_84px)]">
                                <Index/>
                            </div>
                        </div>
                    </MantineProvider>
                </StoreProvider>
            <script src="https://cdn.tailwindcss.com"></script>
            </body>
        </>

    )
}