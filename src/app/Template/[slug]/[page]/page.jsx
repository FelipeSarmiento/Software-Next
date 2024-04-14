'use client'
import "@/settings/assets/tailwindcss";
import { getPublicTemplate} from '@/data/data'
import {useEffect, useState} from "react";
import {Template} from "./Template";
export default function Home({params}){
    const [items, setItems] = useState()
    const [title, setTitle] = useState()

    useEffect(() => {
        getItemsDashboard()
    }, []);

    const [viewport, setViewport] = useState()
    let width = screen.width;
    let viewportType;

    if (width <= 640) {
        viewportType = "Mobile"
    }
    if (width > 640) {
        viewportType = "Tablet"
    }
    if (width > 768) {
        viewportType = "Laptop"
    }
    if (width > 1024) {
        viewportType = "Desktop"
    }
    if (width > 1280) {
        viewportType = "TV"
    }

    return (
        <>
            <head>
                <title>{ title }</title>
            </head>
            <body className="">
            {
                (items && viewportType) ? (
                    <Template components={items?.pages[params.page]} path={params.slug} viewport={viewportType} />
                ) : ""
            }
            </body>
        </>
    )


async function getItemsDashboard() {
    try {
        getPublicTemplate(params.slug).then(( resp ) => {
            setTitle(resp.templates[0]?.templatename)
            setItems(resp.templates[0]?.items ? JSON.parse(resp.templates[0]?.items) : undefined)
        });

    } catch (error) {
        console.error('Error fetching template:', error);
    }
}
}