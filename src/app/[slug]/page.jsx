'use client'
import "@/settings/assets/tailwindcss";
import { getPublicProject } from '@/data/page'
import {useEffect, useState} from "react";
import {Project} from "./Project";
export default function Home({params}){

    const [items, setItems] = useState()

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
        <body className="">
            {
                (items && viewportType) ? (
                    <Project components={items?.pages?.index} viewport={viewportType} />
                ) : ""
            }
        </body>
    )


async function getItemsDashboard() {
    try {
        getPublicProject(params.slug).then(( resp ) => {
            setItems(JSON.parse(resp.project[0]?.items))
        });

    } catch (error) {
        console.error('Error fetching itemsDashboard:', error);
    }
}
}