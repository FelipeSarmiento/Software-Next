import '@mantine/core/styles.css';
import "@/settings/assets/globals.css";
import { Analytics } from "@vercel/analytics/react"

import {MantineProvider} from '@mantine/core';
;

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
