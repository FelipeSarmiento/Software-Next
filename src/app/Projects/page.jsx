'use client'
import {
    IconEdit,
    IconExternalLink, IconSettings,
    IconWorld
} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import {getProjects} from "@/data/page";
import Image from 'next/image'
import emptyBox from '@/settings/assets/images/emptyBox.png'
import SoftwareNextLogo from '@/settings/assets/images/software-next-logo.png'
import '@mantine/core/styles.css';
import Link from "next/link";


export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getAllProjects()
    }, []);

    return (
        <>
            <div className="min-h-[calc(100vh_-_84px)] px-4">
                <header className="h-32 md:px-12 mb-5 shadow">
                    <div className="mx-auto h-full flex items-center justify-center">
                        <h1 className="flex items-center justify-center text-2xl md:text-4xl font-bold tracking-tight text-white">
                            Projects
                        </h1>
                    </div>
                </header>
                <div className="grid grid-cols-1 2xl:grid-cols-2 justify-center place-items-center xl:w-max mx-auto gap-8">
                    {
                        projects.length > 0 ? projects.map((project, index) => (
                            <Link key={ project.idproject * index } target="_blank" href={ "/" + project.projectpublicid }>
                                <div className="relative grid grid-cols-1 lg:grid-cols-2 p-2 w-full  md:p-6 md:w-[750px] lg:h-72 lg:max-h-72 rounded-lg border-2 border-neutral-300">
                                    <div className="border-2 flex items-center justify-center select-none border-neutral-300 rounded-md lg:h-full">
                                        <Image src={ SoftwareNextLogo } alt="Software Next Logo" width={500} height={500} className="size-52 object-cover rounded-md"/>
                                    </div>
                                    <div className="rounded-md max-h-60 flex flex-wrap lg:h-full px-3 md:px-3 lg:px-3 py-2 text-white">
                                        <div className="w-full relative h-1/5 flex flex-wrap items-center text-2xl font-bold ">
                                            <h3 className="text-cyan-500 text-nowrap truncate pr-8">{ project.projectname }</h3>
                                        </div>
                                        <div className="w-full h-2/5 max-h-2/5 overflow-hidden py-2">
                                            <div className="overflow-y-auto h-full">
                                                <p className="text-sm md:text-base">{ project.projectdescription }</p>
                                            </div>
                                        </div>
                                        <div className="w-2/4 md:w-full h-1/5 flex overflow-x-auto items-center space-x-2 justify-start">
                                            { project.tags.map((tag, index) => (
                                                <span key={tag + index} className="bg-stone-800 rounded-lg p-1 text-xs md:text-sm border-2 border-stone-900">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 text-white font-extrabold flex items-center justify-center space-x-2 p-2">
                                        by <span className="text-cyan-500 px-1">{ project.user.username }</span>
                                    </span>
                                </div>
                            </Link>
                        )): (
                            <div className="col-span-2 w-full py-24 h-full flex flex-col items-center justify-center">
                            <span className="text-white">
                                <Image width={500} height={100} src={emptyBox} alt="Empty box" className="size-32 md:size-60"/>
                            </span>
                                <span className="text-white font-bold text-2xl md:text-4xl">
                                No projects yet
                            </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )

     async function getAllProjects(){
        setProjects(await getProjects().then((response) => {
            console.log("response: ", response)
            return response.projects
        }))
    }
}