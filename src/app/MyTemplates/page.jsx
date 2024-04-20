'use client'
import {
    IconEdit,
    IconSettings, IconSquareCheck,
    IconSquareRoundedPlus, IconTrash,
    IconWorld, IconX
} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import {Select, Switch, TagsInput} from '@mantine/core';
import React, {useEffect, useState} from "react";
import {getTemplatesByUser, createTemplate, updateTemplate, deleteTemplate} from "@/data/data";
import Image from 'next/image'
import emptyBox from '@/settings/assets/images/emptyBox.png'
import SoftwareNextLogo from '@/settings/assets/images/software-next-logo.png'
import '@mantine/core/styles.css';
import Link from "next/link";


export default function Home() {

    const [opened, { open, close }] = useDisclosure(false);
    const [templates, setTemplates] = useState([])
    const [currentTemplate, setCurrentTemplate] = useState()

    useEffect(() => {
        currentTemplate && open()
    }, [currentTemplate])

    useEffect(() => {
        getTemplates()
        if (!opened) {
            setCurrentTemplate()
        }
    }, [opened]);

    return (
        <>
            <div className="min-h-[calc(100vh_-_84px)] px-4">
                <header className="h-32 md:px-12 mb-5 shadow">
                    <div className="mx-auto h-full flex items-center justify-between">
                        <h1 className="flex items-center justify-around text-2xl md:text-4xl font-bold tracking-tight text-white">
                            My Templates
                        </h1>
                        <button
                            className="px-2 md:px-6 border-2 border-white text-sm flex items-center space-x-2 font-bold text-white h-10 md:h-12 rounded-md hover:text-cyan-500 hover:border-cyan-500"
                            onClick={() =>{
                                setCurrentTemplate(null)
                                open()
                            }}>
                            <span>New Template</span>
                            <IconSquareRoundedPlus/>
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-1 xl:grid-cols-2 justify-center place-items-center 2xl:w-max mx-auto gap-8">
                    {
                        templates.length > 0 ? templates.map((template, index) => (
                            <div key={ template.idtemplate * index } className="grid grid-cols-1 lg:grid-cols-2 p-2 w-full  md:p-6 md:w-[750px] xl:w-full 2xl:w-[750px] lg:h-72 lg:max-h-72 rounded-lg border-2 border-neutral-300">
                                <div className="border-2 flex items-center justify-center select-none border-neutral-300 rounded-md lg:h-full">
                                    <Image src={ SoftwareNextLogo } alt="Software Next Logo" width={500} height={500} className="size-52 object-cover rounded-md"/>
                                </div>
                                <div className="rounded-md max-h-64 flex flex-wrap lg:h-full px-3 md:px-3 lg:px-3 py-2 text-white">
                                    <div className="w-full relative min-h-1/5 flex flex-wrap items-center text-2xl font-bold ">
                                        <h3 className="text-cyan-500 text-nowrap truncate pr-8">{ template?.templatename }</h3>
                                        <span className={`absolute top-2/4 -translate-y-2/4 right-0 ${template?.ispublic ? 'text-green-500' : 'text-red-500'}`} title={ template?.ispublic ? 'Is public' : 'Is not public' }>
                                            <IconWorld/>
                                        </span>
                                        <span className={`absolute top-2/4 -translate-y-2/4 right-8 ${template?.approved ? 'text-green-500' : 'text-red-500'}`} title={ template?.approved ? 'Approved' : 'Is not Approved' }>
                                            <IconSquareCheck/>
                                        </span>
                                    </div>
                                    <div className="w-full h-2/5 overflow-hidden py-2">
                                        <div className="overflow-y-auto h-full">
                                            <p className="text-sm md:text-base">{ template.templatedescription }</p>
                                        </div>
                                    </div>
                                    <div className="w-2/4 lg:w-full min-h-1/5 flex overflow-y-hidden py-1 overflow-x-auto items-center space-x-2 justify-start">
                                        { template.tags.map((tag, index) => (
                                            <span className="bg-stone-800 rounded-lg p-1 text-xs text-nowrap md:text-sm border-stone-900">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="w-2/4 lg:w-full min-h-1/5 flex py-1 lg:py-0 items-center lg:items-end justify-end lg:justify-center space-x-5 px-2">
                                        <Link href={"/MyTemplates/Dashboard/" + template.templatepublicid}>
                                            <button className="flex space-x-2 hover:text-cyan-500">
                                                <IconEdit/>
                                                <span className="hidden md:block">Dashboard</span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setCurrentTemplate({
                                                    idtemplate: template.idtemplate,
                                                    template_name: template.templatename,
                                                    template_description: template.templatedescription,
                                                    tags: template.tags,
                                                    isPublic: template.ispublic,
                                                    typetemplate: template.typetemplate,
                                                    templatepublicid: template.templatepublicid,
                                                    items: template.items
                                                })
                                            }}
                                            className="flex space-x-2 hover:text-cyan-500">
                                            <IconSettings/>
                                            <span className="hidden md:block">Settings</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )): (
                            <div className="col-span-2 w-full py-24 h-full flex flex-col items-center justify-center">
                            <span className="text-white">
                                <Image width={500} height={100} src={emptyBox} alt="Empty box" className="size-32 md:size-60"/>
                            </span>
                                <span className="text-white font-bold text-2xl md:text-4xl">
                                No templates yet
                            </span>
                            </div>
                        )
                    }
                </div>
            </div>
            {opened && <ModalContent template={ currentTemplate } close={ close } />}
        </>
    )

    async function getTemplates(){
        setTemplates(await getTemplatesByUser().then((response) => {return response.templates}))
    }
}

const ModalContent = ({ close, template }) => {
    const [templateForm, setTemplateForm] = useState()

    useEffect(() => {
        if (template) {
            setTemplateForm({
                idTemplate: template.idtemplate,
                template_name: template.template_name,
                template_description: template.template_description,
                tags: template.tags,
                isPublic: template.isPublic,
                type_template: template.typetemplate,
                items: template.items
            })
            setTags(template.tags)
        } else {
            setTemplateForm({
                idTemplate: '',
                template_name: '',
                project_template: '',
                tags: [],
                isPublic: false,
                type_template: '',
                items: ''
            })
        }
    }, []);

    const handleTemplateForm = async(event) => {
        event.preventDefault()
        if (template) {
            await updateTemplate({...templateForm, tags: tags}).then(() => {
                close()
            })
            return
        }
        // Create project
        await createTemplate({...templateForm, tags: tags, template_public_id: templateForm.template_name.replaceAll(" ", "-") + "-" + window.crypto.randomUUID().split("-")[0]}).then(() => {
            close()
        })
    }
    const [tags, setTags] = useState([])

    return (
        <div className="fixed top-0 left-0 w-full py-20 px-2 flex items-center justify-center h-screen  bg-stone-950/90">
            <div className="relative h-max px-3 py-2 md:py-3 md:px-6 w-full md:w-2/6 bg-black border-2 overflow-y-auto border-stone-500 text-white rounded-lg">
                <h2 className="text-lg font-bold text-center">{ template ? 'Edit Template' : 'Create a new Template' }</h2>
                <div className="">
                    <form onSubmit={ handleTemplateForm }>
                        <div className="flex flex-wrap md:grid grid-cols-2 gap-x-8 w-full">
                            <div className="col-span-2 w-full">
                                <div className="mt-4">
                                    <label htmlFor="template_name" className="block text-sm font-bold py-1">Template Name</label>
                                    <input onChange={ (event) => {
                                        setTemplateForm({ ...templateForm, template_name: event.target?.value })
                                    } } type="text" name="template_name" id="template_name" value={ templateForm?.template_name } className="w-full h-10 rounded-md bg-stone-950 border-2 border-stone-800 px-2" required={true} />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="project-description" className="block text-sm font-bold py-1">Description</label>
                                    <textarea onChange={ (event) => {
                                        setTemplateForm({ ...templateForm, template_description: event.target.value })
                                    }} id="template_description" name="template_description" value={ templateForm?.template_description } rows={3} className="h-20 w-full rounded-md bg-stone-950 border-2 border-stone-800 px-2 max-h-32" required={true}/>
                                </div>
                                <div className="relative text-lg mt-4">
                                    <TagsInput
                                        classNames={{
                                            input: 'min-h-10 w-full rounded-md text-white placeholder:text-white bg-stone-950 border-2 border-stone-800 px-2',
                                            pill: 'bg-stone-800 text-white',
                                            label: 'text-sm block font-bold py-1'
                                        }}
                                        data={[]}
                                        value={ tags }
                                        onChange={setTags}
                                        label="Tags" placeholder="Tags" />
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-y-3 md:grid-cols-2">
                                    <div className="flex order-2 md:order-1 items-center justify-center">
                                        <Switch
                                            classNames={{
                                                root: '',
                                                track: 'border-2 border-stone-500 ' + (templateForm?.isPublic ? 'bg-blue-800' : 'bg-stone-800'),
                                            }}
                                            checked={templateForm?.isPublic}
                                            color="blue"
                                            onChange={(event) => { setTemplateForm({...templateForm, isPublic: event.currentTarget.checked}) }}
                                            label="Is Public"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Select
                                            classNames={{
                                                root: 'w-3/4 mx-auto',
                                                input: "bg-stone-950 text-white border-2 border-stone-800 rounded-md h-10 text-md font-bold text-center",
                                                dropdown: "bg-stone-950 border-stone-800 text-white",
                                                option: "hover:bg-stone-950 border-2 border-transparent hover:border-cyan-500 hover:text-cyan-500 text-white font-bold text-md"
                                            }}
                                            value={templateForm?.type_project}
                                            onChange={(value) => { setTemplateForm({...templateForm, type_template: value}) }}
                                            placeholder="Type of Template"
                                            data={['Ecommerce', 'Blog', 'Portfolio', 'Landing Page']}
                                            checkIconPosition="right"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative col-span-2 w-full flex items-center justify-center py-3 mt-5">
                                <button type="submit" className="w-28 rounded-md py-3 border-2 border-stone-800 font-bold">
                                    { template ? 'Update' : 'Create' }
                                </button>
                                {
                                    template ? (
                                        <button onClick={ () => { deleteTemplate(template.idtemplate).then( () => {setTemplateForm([]); close() } ) } } className="absolute right-5 text-red-500 p-5">
                                            <IconTrash/>
                                        </button>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <button onClick={close} className="absolute top-3 right-3">
                    <IconX/>
                </button>
            </div>
        </div>
    )
}