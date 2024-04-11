'use client'
import "@/settings/assets/tailwindcss";
import { getPublicProject } from '@/data/page'
import {useEffect, useState} from "react";
import {Project} from "./Project";
import "./globals.css";
import setGlobalCSS from './config'
export default function Home({params}){

    const [items, setItems] = useState()
    const [title, setTitle] = useState()

    useEffect(() => {
        getItemsDashboard()
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

    useEffect(() => {
        if (items) {
            setGlobalCSS(items?.pages?.index.sections, viewportType, title+params.slug)
        }
    }, [items]);

    return (
        <>
            <head>
                <title>{ title }</title>
            </head>
            <body>
            {
                (items && viewportType) ? (
                    <Project components={items?.pages?.index} viewport={viewportType} />
                ) : ""
            }
            </body>
        </>
    )

async function getItemsDashboard() {
    try {
        getPublicProject(params.slug).then(( resp ) => {
            setTitle(resp.project[0]?.projectname)
            setItems(resp.project[0]?.items ? JSON.parse(resp.project[0]?.items) : undefined)
        });

    } catch (error) {
        console.error('Error fetching itemsDashboard:', error);
    }
}
}