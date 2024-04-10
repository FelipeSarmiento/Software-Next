import {NavBar} from "../components/NavBar";
import "../../settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import StoreProvider from "../../lib/redux/StoreProvider";
import { Analytics } from "@vercel/analytics/react"

import { MantineProvider } from '@mantine/core';

config.autoAddCss = false

export default function RootLayout({children}) {
    return (
        <body className={" bg-black min-h-screen from-30% [::-webkit-scrollbar{display:none;}] shrink-0 overflow-x-hidden"}>
            <StoreProvider>
                <Analytics/>
                <MantineProvider>
                    <div className="bg-black lg:bg-transparent">
                        <NavBar/>
                        <div className="relative min-h-[calc(100vh_-_84px)]">
                            {children}
                        </div>
                    </div>
                </MantineProvider>
            </StoreProvider>
        <script src="https://cdn.tailwindcss.com"></script>
        </body>
    );
}
