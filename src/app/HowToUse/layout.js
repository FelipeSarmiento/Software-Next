import {Inter} from "next/font/google";
import {NavBar} from "@/app/components/NavBar";
import '@mantine/core/styles.css';
import "@/settings/assets/globals.css";
import StoreProvider from "../../lib/redux/StoreProvider";
import {BackgroundBeams} from "@/app/components/AceternityUI/background-beams";
import { Analytics } from "@vercel/analytics/react"

import {MantineProvider} from '@mantine/core';


const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {

    return (
        <body className={"bg-black text-white min-h-screen overflow-x-hidden"}>
                <Analytics/>
                <MantineProvider>
                    <div className="">
                        <NavBar/>
                        <div className="min-h-[calc(100vh_-_84px)]">
                            {children}
                        </div>
                    </div>
                </MantineProvider>
        <script src="https://cdn.tailwindcss.com"></script>
        </body>
    );
}
