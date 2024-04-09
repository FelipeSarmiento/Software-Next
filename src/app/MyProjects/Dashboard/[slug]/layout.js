import {Inter} from "next/font/google";
import {NavBar} from "@/app/components/NavBar";
import '@mantine/core/styles.css';
import "@/settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "@/lib/redux/StoreProvider";
import {BackgroundBeams} from "@/app/components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"

import {MantineProvider} from '@mantine/core';

config.autoAddCss = false;

export default function RootLayout({children}) {

    return (
        <>
            <Analytics/>
            <MantineProvider>
                <div className="bg-black text-white lg:bg-transparent">
                    <div className="min-h-[calc(100vh_-_84px)]">
                        {children}
                    </div>
                </div>
            </MantineProvider>
            <script src="https://cdn.tailwindcss.com"></script>
        </>
    );
}
