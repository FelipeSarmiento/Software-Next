'use client'
import {
    IconEdit,
    IconExternalLink, IconSettings,
    IconSquareRoundedPlus,
    IconWorld
} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
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
                <div className="grid grid-cols-1 md:grid-cols-2 md:w-max mx-auto gap-8">
                {
                    projects.length > 0 ? projects.map((project, index) => (
                            <Link target="_blank" href={ "/" + project.projectpublicid }>
                                <div key={ project.idproject * index } className="w-full grid grid-cols-1 md:grid-cols-2 p-2 md:p-6 md:w-[40vw] h-full md:h-72 max-h-72 rounded-lg border-2 border-neutral-300">
                                    <div className="border-2 flex items-center justify-center select-none border-neutral-300 rounded-md h-40 md:h-full">
                                        <Image src={ SoftwareNextLogo } alt="Software Next Logo" width={500} height={500} className="size-52 object-cover select-none rounded-md"/>
                                    </div>
                                    <div className="rounded-md h-52 flex flex-wrap md:h-full px-3 md:px-6 py-2 text-white">
                                        <div className="w-full relative h-1/5 flex flex-wrap items-center text-2xl font-bold py-1">
                                            <h3 className="text-cyan-500">{ project.projectname }</h3>
                                            <span className={`absolute top-2/4 -translate-y-2/4 right-0 ${project.ispublic ? 'text-green-500' : 'text-red-500'}`} title={ project.ispublic ? 'Is public' : 'Is not public' }>
                                            <IconWorld/>
                                        </span>
                                        </div>
                                        <div className="w-full h-2/5 py-1 overflow-hidden text-wrap">
                                            <p className="text-ellipsis">{ project.projectdescription }</p>
                                        </div>
                                        <div className="w-2/4 md:w-full h-1/5 flex flex-wrap space-x-2 items-center justify-center md:justify-start">
                                            { project.tags.map((tag, index) => (
                                                <span className="bg-stone-900 rounded-lg p-1 text-xs md:text-sm">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    )): (
                        <div className="col-span-2 w-full py-24 h-full flex flex-col items-center justify-center">
                            <span className="text-white">
                                <Image width={500} height={100} src={emptyBox} alt="Empty box" className="size-32 md:size-60"/>
                            </span>
                            <span className="text-white font-bold text-2xl md:text-4xl">
                                No public projects yet
                            </span>
                        </div>
                    )
                }
                </div>
            </div>
        </>
    )

     async function getAllProjects(){
        setProjects(await getProjects().then((response) => {return response.projects}))
    }
}