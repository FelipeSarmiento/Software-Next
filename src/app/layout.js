import "../settings/assets/globals.css";

export const metadata = {
    title: "Software Next - Alpha version",
    favicon: "/favicon.ico",
    description: "Software Next: The Next Generation of Software Development",
};

export default function RootLayout({children}) {
    return (
        <html className="dark" lang="en">
        <head>
            <link rel="icon" href="https://cdn.hugeicons.com/icons/snow-stroke-rounded.svg" />
        </head>
        { children}
        </html>
    );
}
