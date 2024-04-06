import {NavBar} from "@/app/components/NavBar";
import '@mantine/core/styles.css';
import "@/settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "../../lib/redux/StoreProvider";
import {BackgroundBeams} from "@/app/components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"

import {MantineProvider} from '@mantine/core';

config.autoAddCss = false

export default function RootLayout({children}) {

    return (
        <>
            <body className={"bg-transparent min-h-screen overflow-x-hidden"}>
                <StoreProvider>
                    <Analytics/>
                    <MantineProvider>
                        <div className="relative bg-black">
                            <NavBar/>
                            <div className="z-[100] min-h-[calc(100vh_-_84px)]">
                                <div className="min-h-[calc(100vh_-_84px)] snap-y">
                                    { children }
                                </div>
                            </div>
                            <div className="z-[-100]">
                                <BackgroundBeams />
                            </div>
                        </div>
                    </MantineProvider>
                </StoreProvider>
            <script src="https://cdn.tailwindcss.com"></script>
            </body>
        </>
    );
}
