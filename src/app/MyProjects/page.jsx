'use client'
import {
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconExternalLink,
    IconSquareRoundedPlus,
    IconWorld, IconX
} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Switch } from '@mantine/core';
import React, {useState} from "react";


export default function Home() {

    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <div className="overflow-auto min-h-[calc(100vh_-_84px)] px-4 py-10 flex flex-col">
                <header className="h-32 px-12 shadow">
                    <div className="mx-auto h-full flex items-center justify-between">
                        <h1 className="flex items-center justify-around text-3xl font-bold tracking-tight text-white">
                            My Projects
                        </h1>
                        <button
                            className="px-6 border-2 border-white flex items-center space-x-2 font-bold text-white h-12 rounded-md"
                            onClick={open}>
                            <span>New Project</span>
                            <IconSquareRoundedPlus/>
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center w-full items-start">
                    <div className="w-full grid grid-cols-2 p-6 md:w-[40vw] h-80 rounded-lg gap-x-3 border-2 border-neutral-300">
                        <div className="border-2 border-neutral-300 rounded-md h-full"></div>
                        <div className="rounded-md h-full px-6 text-white">
                            <div className="relative h-1/5 flex items-center text-2xl font-bold py-1">
                                <h3>Project Title</h3>
                                <span className="absolute top-2/4 -translate-y-2/4 right-0 text-red-500" title="Is not public">
                                <IconWorld/>
                            </span>
                            </div>
                            <div className="h-2/5 py-1 overflow-hidden text-wrap">
                                <p className="text-ellipsis">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum et ex illo incidunt inventore ipsam, magnam molestiae necessitatibus nostrum nulla perspiciatis possimus quod, quos repellat soluta tempora vero vitae voluptatem.</p>
                            </div>
                            <div className="h-1/5 flex space-x-5 items-center">
                                <span className="bg-gray-800 rounded-lg px-1 text-sm">Ecommerce</span>
                            </div>
                            <div className="h-1/5 flex space-x-5 items-center justify-center">
                                <button className="flex space-x-2">
                                    <IconEdit/>
                                    <span>Edit</span>
                                </button>
                                <button className="flex space-x-2">
                                    <IconExternalLink/>
                                    <span>Visit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {opened && <ModalContent close={ close } />}
        </>
    )
}

const ModalContent = ({ close }) => {

    const [isPublic, setIsPublicNew] = useState(false)

    const [templateSelected, setTemplateSelected] = useState(0)
    const templates = [
        {
            idTemplate: 1,
            name: 'Template 1',
            description: 'Description 1',
        },
        {
            idTemplate: 2,
            name: 'Template 2',
            description: 'Description 2',
        },
        {
            idTemplate: 3,
            name: 'Template 3',
            description: 'Description 3',
        },
    ]

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center h-screen bg-stone-950/90">
            <div className="relative p-6 w-2/4 bg-black border-2 border-white text-white rounded-lg">
                <h2 className="text-lg font-bold">Create a new project</h2>
                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <div className="mt-4">
                            <label htmlFor="project-name" className="block text-sm font-bold py-1">Project Name</label>
                            <input type="text" name="project_name" id="project_name" className="w-full h-10 rounded-md bg-stone-950 border-2 border-white" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="project-description" className="block text-sm font-bold py-1">Description</label>
                            <textarea id="project_description" name="project_description" rows={3} className="h-20 w-full rounded-md bg-stone-950 border-2 border-white" defaultValue={''} />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="project-tags" className="block text-sm font-bold py-1">Tags</label>
                            <input type="text" name="tags" id="tags" className="h-10 w-full rounded-md bg-stone-950 border-2 border-white" />
                        </div>
                        <div className="mt-4 grid grid-cols-2">
                            <div className="flex items-center justify-center">
                                <Switch
                                    classNames={{
                                        track: 'border-2 border-white ' + (isPublic ? 'bg-blue-800' : 'bg-gray-800'),
                                    }}
                                    checked={isPublic}
                                    color="blue"
                                    onChange={(event) => setIsPublicNew(event.currentTarget.checked)}
                                    label="Is Public"
                                />
                            </div>
                            <div>
                                type
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="h-full">
                            <div className="h-1/6 flex items-center justify-center font-bold text-lg">
                                <span>Template</span>
                            </div>
                            <div className="h-5/6">
                                <div className="h-5/6 flex items-center justify-center border-2 border-green-500">
                                    { templates[templateSelected].name }
                                </div>
                                <div className="relative h-1/6 text-white flex items-center">
                                    <button
                                        onClick={() => {
                                            if (templateSelected === 0) {
                                                setTemplateSelected(templates.length - 1)
                                                return
                                            }
                                            setTemplateSelected(templateSelected - 1)
                                        }}
                                        className="absolute left-2">
                                        <IconChevronLeft/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (templateSelected === templates.length - 1) {
                                                setTemplateSelected(0)
                                                return
                                            }
                                            setTemplateSelected(templateSelected + 1)
                                        }}
                                        className="absolute right-2">
                                        <IconChevronRight/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-3 mt-5">
                        <button className="w-28 rounded-md py-3 border-2 border-white font-bold">
                            Create
                        </button>
                    </div>
                </div>
                <button onClick={close} className="absolute top-3 right-3">
                    <IconX/>
                </button>
            </div>
        </div>
    )
}