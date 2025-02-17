'use client'
import "@/settings/assets/tailwindcss";
import { getPublicProject } from '@/data/data'
import {useEffect, useState} from "react";
import {Project} from "./Project";
export default function Home({params}){

    const [items, setItems] = useState()
    const [title, setTitle] = useState()

    useEffect(() => {
        getProject()
    }, []);
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
            <body>
            {
                (items && viewportType) ? (
                    <Project components={items?.pages?.index} path={params.slug} viewport={viewportType} />
                ) : ""
            }
            </body>
        </>
    )

async function getProject() {
    try {
        getPublicProject(params.slug).then(( resp ) => {
            if (resp.project.length > 0){
                setTitle(resp.project[0]?.projectname)
                setItems(resp.project[0]?.items ? JSON.parse(resp.project[0]?.items) : undefined)
            }
            else {
                window.location.href = "/"
            }
        });

    } catch (error) {
        console.error('Error fetching itemsDashboard:', error);
    }
}
}