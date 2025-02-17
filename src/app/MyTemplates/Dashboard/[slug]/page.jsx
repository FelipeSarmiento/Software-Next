'use client'
import React, {useEffect, useState} from 'react'
import { IconBadge4k } from '@tabler/icons-react'
import {DropMenu} from "../components/DropMenu";
import {DashboardPreview} from "./DashboardPreview.jsx";
import {
    IconClipboard,
    IconCopy,
    IconDeviceDesktop,
    IconDeviceIpadHorizontal,
    IconDeviceLaptop,
    IconDeviceMobile,
    IconDeviceTv,
    IconDeviceFloppy,
    IconComponents, IconX, IconCheck, IconBinaryTree, IconSettings, IconExternalLink, IconTrash, IconQuestionMark
} from '@tabler/icons-react';
import {Button, Drawer, Group, HoverCard, Text, Menu, Select} from '@mantine/core';
import Link from "next/link";
import { getSession, getTemplate, updateTemplate } from "@/data/data";

export default function Dashboard({params}) {
    const [session, setSession] = useState()
    useEffect(() => {
        getSession().then((session) => setSession(session.username))
    }, []);

    const viewports = [
        {value: "390px", type: "Mobile", breakpointID: "", icon: <IconDeviceMobile/>},
        {value: "680px", type: "Tablet", breakpointID: "sm", icon: <IconDeviceIpadHorizontal/>},
        {value: "1024px", type: "Laptop", breakpointID: "md", icon: <IconDeviceLaptop/>},
        {value: "1280px", type: "Desktop", breakpointID: "lg", icon: <IconDeviceDesktop/>},
        {value: "1536px", type: "TV", breakpointID: "xl", icon: <IconDeviceTv/>}
    ]

    const [itemsDashboard, setItemsDashboard] = useState();
    const [template, setTemplate] = useState()
    const [actualPage, setActualPage] = useState("")
    const [itemCopied, setItemCopied] = useState()
    const [optionItem, setOptionItem] = useState();
    const [unSaved, setUnSaved] = useState(false)
    const [viewport, setViewport] = useState({
        value: "1024px",
        type: "Laptop",
        breakpointID: "md"
    });
    const [keepOptions, setKeepOptions] = useState(true)

    useEffect(() => {
        if (session && itemsDashboard === undefined) {
            getItemsDashboard()
        }
    }, [session]);

    async function saveItemsDashboard(bodySet) {
        const resp = await updateTemplate(bodySet);
        setUnSaved(false)
    }

    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const parent = element.closest(".scrollable-container"); // Ajusta según el contenedor que deseas evitar mover
            if (parent) {
                const elementRect = element.getBoundingClientRect();
                const parentRect = parent.getBoundingClientRect();

                // Solo hacer scroll si el elemento está fuera de la vista del contenedor
                if (elementRect.top < parentRect.top || elementRect.bottom > parentRect.bottom) {
                    parent.scrollTo({
                        top: parent.scrollTop + elementRect.top - parentRect.top,
                        behavior: "smooth"
                    });
                }
            }
        }
    }

    const onSelectItem = async (event, value) => {
        setOptionItem(value);
        scrollToElement(value.idUniqueIdentifier);
        event?.stopPropagation();
    }
    const modifyItemsDashboard = (valorBuscado, nuevoValor) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj)
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    newObj[key] = modify(newObj[key]);
                } else if (newObj[key] === valorBuscado) {
                    if (newObj.hasOwnProperty('settings' + viewport.type)) {
                        if (keepOptions) {
                            nuevoValor.settingsMobile = {
                                ...nuevoValor.settingsMobile,
                                className: classNames(nuevoValor.settingsMobile, "")
                            };
                            nuevoValor.settingsTablet = {
                                ...nuevoValor.settingsTablet,
                                className: classNames(nuevoValor.settingsTablet, "sm")
                            };
                            nuevoValor.settingsLaptop = {
                                ...nuevoValor.settingsLaptop,
                                className: classNames(nuevoValor.settingsLaptop, "md")
                            };
                            nuevoValor.settingsDesktop = {
                                ...nuevoValor.settingsDesktop,
                                className: classNames(nuevoValor.settingsDesktop, "lg")
                            };
                            nuevoValor.settingsTV = {
                                ...nuevoValor.settingsTV,
                                className: classNames(nuevoValor.settingsTV, "xl")
                            };
                            newObj.settingsMobile = nuevoValor.settingsMobile;
                            newObj.settingsTablet = nuevoValor.settingsTablet;
                            newObj.settingsLaptop = nuevoValor.settingsLaptop;
                            newObj.settingsDesktop = nuevoValor.settingsDesktop;
                            newObj.settingsTV = nuevoValor.settingsTV;
                        } else {
                            nuevoValor['settings' + viewport.type] = {
                                ...nuevoValor['settings' + viewport.type],
                                className: classNames(nuevoValor['settings' + viewport.type], viewport.breakpointID)
                            };
                            newObj['settings' + viewport.type] = nuevoValor['settings' + viewport.type];
                        }

                    }
                    if (newObj.hasOwnProperty('value')) {
                        newObj.value = nuevoValor.value;
                    }
                    if (newObj.hasOwnProperty('text')) {
                        newObj.text = nuevoValor.text;
                    }
                    if (newObj.hasOwnProperty('href')) {
                        newObj.href = nuevoValor.href;
                    }
                    if (newObj.hasOwnProperty('target')) {
                        newObj.target = nuevoValor.target;
                    }
                    if (newObj.hasOwnProperty('src')) {
                        newObj.src = nuevoValor.src;
                    }
                    if (newObj.hasOwnProperty('alt')) {
                        newObj.alt = nuevoValor.alt;
                    }
                    if (nuevoValor.hasOwnProperty('idHTML')) {
                        newObj.idHTML = nuevoValor.idHTML;
                    }
                    if (nuevoValor.hasOwnProperty('nameHTML')) {
                        newObj.nameHTML = nuevoValor.nameHTML;
                    }
                }
            }
            return newObj;
        };
        setItemsDashboard({...modify(itemsDashboard)});
        setUnSaved(true)
    };
    const deletePage = (page) => {
        const newObj = structuredClone(itemsDashboard);
        delete newObj.pages[page];
        setItemsDashboard(newObj);
        setNewPage(undefined)
        setActualPage("index")
        setUnSaved(true)
        setOptionItem(undefined)
    }
    const deleteItemDashboard = (valorBuscado) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj);
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    if (newObj[key].idUniqueIdentifier === valorBuscado) {
                        delete newObj[key]
                    } else {
                        newObj[key] = modify(newObj[key])
                    }
                }
            }
            return newObj;
        };

        function eliminarNulos(obj) {
            for (let clave in obj) {
                if (obj[clave] === null) {
                    delete obj[clave];
                } else if (typeof obj[clave] === 'object') {
                    if (Array.isArray(obj[clave])) {
                        obj[clave] = obj[clave].filter(item => item !== null);
                    }
                    eliminarNulos(obj[clave]);
                }
            }
            return obj;
        }

        setItemsDashboard(eliminarNulos(modify(itemsDashboard)));
        setUnSaved(true)
        setOptionItem(undefined)
    };
    const addPage = (page) => {
        page = page.replace(" ", "-")
        setItemsDashboard({
            ...itemsDashboard,
            pages: {
                ...itemsDashboard.pages,
                [page]: {
                    sections: [],
                    order: []
                }
            }
        })
    }

    const addSection = (section, idItem) => {
        const setId = (obj) => {
            const item = structuredClone(obj);
            for (let key in item) {
                if (typeof item[key] === 'object' && !key.includes('settings')) {
                    item[key] = setId(item[key]);
                }
                if (item.hasOwnProperty('idUniqueIdentifier')) {
                    let id = window.crypto.randomUUID() + item.label;
                    item.id = id;
                    item.idUniqueIdentifier = id;
                }
            }
            return item;
        }
        section = setId(section);

        if (idItem) {
            const addItemToSection = (obj) => {
                const newObj = structuredClone(obj)
                for (let key in newObj) {
                    if (newObj[key].hasOwnProperty('items')) {
                        newObj[key].items = addItemToSection(newObj[key].items);
                    }

                    if (newObj[key].idUniqueIdentifier === idItem) {
                        newObj[key].items = [
                            ...newObj[key].items,
                            section
                        ]
                        break
                    }
                }
                return newObj;
            };

            const sectionsToModify = addItemToSection(itemsDashboard.pages[actualPage].sections);
            setItemsDashboard({
                ...itemsDashboard,
                pages: {
                    ...itemsDashboard.pages,
                    [actualPage]: {
                        ...itemsDashboard.pages[actualPage],
                        sections: sectionsToModify
                    }

                }
            })

            return
        }
        setItemsDashboard({
            ...itemsDashboard,
            pages: {
                ...itemsDashboard.pages,
                [actualPage]: {
                    ...itemsDashboard.pages[actualPage],
                    sections: [
                        ...itemsDashboard.pages[actualPage].sections,
                        section
                    ]
                }

            }
        })
        setUnSaved(true)
    }

    function classNames(classes, query) {
        const elements = Object.entries(classes).map(([key, value]) => {
            if (value === "" || key === "className") return "";
            return (query ? query + ":" : "") + value;
        });
        return elements.join(' ');
    }
    const [openDrawerSettings, setOpenDrawerSettings] = useState(false)
    const [openDrawerTreeView, setOpenDrawerTreeView] = useState(false)
    const [newPage, setNewPage] = useState()
    const [pages, setPages] = useState()

    useEffect(() => {
        if (itemsDashboard) {
            setPages(Object.keys(itemsDashboard?.pages).map((page, index) => { return (page) }))
        }
    }, [itemsDashboard]);

    if (itemsDashboard) {
        return (
            <div className="min-h-full bg-black text-white lg:bg-transparent pt-4">
                <header className=" shadow">
                    <div className="mx-auto relative grid grid-cols-2 xl:grid-cols-5 xl:flex justify-between px-4 py-3 sm:px-6 xl:px-24">
                        <h1 className="col-span-2 flex flex-col xl:flex-row items-center justify-center xl:justify-around text-3xl font-bold tracking-tight text-white">
                            Template <span className="hidden xl:flex px-3">-</span><span className="text-cyan-500 py-2 2xl:py-0 font-extrabold"> {template?.templatename}</span>
                        </h1>
                        <div className="col-span-2 xl:absolute xl:top-2/4 xl:left-2/4 xl:-translate-x-2/4 xl:-translate-y-2/4 flex items-center justify-center">
                            <div className="size-10 flex items-center justify-center">
                                <Group justify="center">
                                    <HoverCard width={300} shadow="md">
                                        <HoverCard.Target>
                                            <Button classNames={{
                                                root: "h-full m-0 px-1 bg-transparent hover:bg-transparent hover:text-cyan-500",
                                            }}>
                                                <IconQuestionMark/>
                                            </Button>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown classNames={{
                                            root: "z-50",
                                            dropdown: "hidden lg:block bg-stone-950 z-50 h-min m-0 p-0"
                                        }}>
                                            <Text className="text-white h-full py-1 px-2" size="xs">
                                                <span className="text-cyan-500 font-bold">Select Page: </span> Select the page you want to edit
                                            </Text>
                                            <Text className="text-white h-full py-1 px-2" size="xs">
                                                <span className="text-cyan-500 font-bold">Create Page: </span> Type the name of the page you want to create and click on the button
                                            </Text>
                                            <Text className="text-white h-full py-1 px-2" size="xs">
                                                <span className="text-cyan-500 font-bold">Delete Page: </span> Click on the trash icon to delete the page
                                            </Text>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                </Group>
                            </div>
                            <Select
                                classNames={{
                                    root: "py-2 lg:py-0",
                                    input: "bg-stone-950 text-white border-2 border-stone-800 rounded-md h-12 text-lg font-bold text-center",
                                    dropdown: "bg-stone-950 text-white z-40",
                                    option: "hover:bg-stone-950 border-2 border-transparent hover:border-cyan-500 hover:text-cyan-500 text-white font-bold text-md",

                                }}
                                allowDeselect={false}
                                defaultValue={actualPage}
                                value={actualPage}
                                defaultSearchValue={newPage}
                                placeholder="Select a Page"
                                data={pages}
                                onChange={(value) => {
                                    setActualPage(value.toLowerCase())
                                    setOptionItem(undefined)
                                }}
                                onSearchChange={ (value) => {
                                    setNewPage(value.toLowerCase())
                                }}
                                searchable
                                checkIconPosition="right"
                                nothingFoundMessage={ <button onClick={ () => { addPage(newPage); setUnSaved(true); setNewPage(undefined) } } className="w-full h-full text-white">Add <span className="text-cyan-500 font-bold">{ newPage?.charAt(0).toUpperCase() + newPage?.slice(1)}</span> page</button> }
                            />
                            <div className="size-10 flex items-center justify-center">
                                {
                                    actualPage !== "index" ? (
                                        <Menu
                                            classNames={{
                                                dropdown: "bg-stone-950 hover:bg-stone-950 h-min m-0 p-0 text-center text-white",
                                                item: "text-white bg-transparent hover:bg-transparent",
                                                root: "text-white hover:bg-transparent bg-transparent"
                                            }}
                                        >
                                            <Menu.Target>
                                                <Button classNames={{
                                                    root: "text-white hover:bg-transparent bg-transparent p-0 mx-2 my-0 h-auto",
                                                }}>
                                                    <IconTrash/>
                                                </Button>
                                            </Menu.Target>

                                            <Menu.Dropdown>
                                                <Menu.Item>
                                                    <div>
                                                        Are you sure you want to delete the <span className="text-cyan-500 font-bold">{ actualPage }</span> page?
                                                    </div>
                                                    <div className="flex items-center justify-around h-10">
                                                        <button
                                                            onClick={() => {
                                                                deletePage(actualPage)
                                                            }}
                                                            className="text-green-500">
                                                            <IconCheck/>
                                                        </button>
                                                        <button className="text-red-500">
                                                            <IconX/>
                                                        </button>
                                                    </div>
                                                </Menu.Item>

                                                {/* Other items ... */}
                                            </Menu.Dropdown>
                                        </Menu>
                                    ) : ''
                                }
                            </div>
                        </div>
                        <div className="col-span-2 py-2 flex space-x-4 justify-center">
                            <Link target="_blank" href={'/Template/' + template.templatepublicid}>
                                <button className="text-white text-nowrap flex items-center justify-center border-2 border-white hover:bg-gradient-to-r py-2 from-black via-zinc-700 to-black px-4 rounded-md">
                                    Preview &nbsp;<IconExternalLink/>
                                </button>
                            </Link>
                            <button onClick={() => {
                                saveItemsDashboard({
                                    idTemplate: template?.idtemplate,
                                    template_name: template?.templatename,
                                    template_description: template?.templatedescription,
                                    isPublic: template?.ispublic,
                                    type_template: template?.type,
                                    tags: template?.tags,
                                    items: itemsDashboard,
                                })
                            }}
                                    className="text-white text-nowrap flex items-center justify-center border-2 border-white hover:bg-gradient-to-r py-2 from-black via-zinc-700 to-black px-4 rounded-md">
                                Save &nbsp;<span className={unSaved ? 'text-red-500' : 'text-white'}>
                        <IconDeviceFloppy stroke={2}/>
                            </span>
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto w-full min-h-[calc(80vh_-_64px)]">
                        <div className="h-full">
                            <div className="h-full">
                                <main className="mx-auto max-w-11/12 px-4 sm:px-6 lg:px-8 pt-6">
                                    <section aria-labelledby="products-heading" className="h-[56vh] pt-3">
                                        <div className="grid grid-cols-1 relative xl:gap-x-5 gap-y-4 xl:grid-cols-5 h-full">
                                            <div className="col-span-1 xl:col-span-5 grid grid-cols-2 xl:grid-cols-5 gap-y-3 py-2 h-15 rounded-md w-full bg-stone-950 border-2 border-stone-800">
                                                <div className="col-span-1 hidden order-2 xl:order-1 xl:flex justify-end xl:justify-start items-center px-2">
                                                    <button
                                                        disabled={optionItem === undefined}
                                                        onClick={() => {
                                                            let id = window.crypto.randomUUID() + optionItem?.type;
                                                            setItemCopied({
                                                                ...optionItem,
                                                                id,
                                                                idUniqueIdentifier: id

                                                            })
                                                        }}
                                                        title="Copy"
                                                        className={`mx-2 rounded-md border-2 disabled:border-red-500 ${itemCopied !== undefined ? 'text-cyan-400 border-cyan-400' : 'text-white'}`}>
                                                        <IconCopy/>
                                                    </button>
                                                    <button
                                                        disabled={(!(itemCopied !== undefined && optionItem?.group !== "element"))}
                                                        onClick={() => {
                                                            optionItem ? addSection(itemCopied, optionItem?.idUniqueIdentifier) : addSection(itemCopied)
                                                            setItemCopied(undefined)
                                                        }}
                                                        title="Paste" className="mx-2 disabled:text-red-500">
                                                        <IconClipboard/>
                                                    </button>
                                                    {
                                                        optionItem !== undefined ?
                                                            <>
                                                                <Menu
                                                                    position="right"
                                                                    classNames={{
                                                                        dropdown: "bg-stone-950 hover:bg-stone-950 h-min m-0 p-0 text-center text-white",
                                                                        item: "text-white bg-transparent hover:bg-transparent",
                                                                        root: "text-white hover:bg-transparent bg-transparent"
                                                                    }}
                                                                >
                                                                    <Menu.Target>
                                                                        <Button classNames={{
                                                                            root: "text-white hover:bg-transparent bg-transparent p-0 mx-2 my-0 h-auto",
                                                                        }}>
                                                                            <IconTrash/>
                                                                        </Button>
                                                                    </Menu.Target>

                                                                    <Menu.Dropdown>
                                                                        <Menu.Item>
                                                                            <div>
                                                                                Are you sure you want to delete the item?
                                                                            </div>
                                                                            <div className="flex items-center justify-around h-10">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        deleteItemDashboard(optionItem.idUniqueIdentifier)
                                                                                    }}
                                                                                    className="text-green-500">
                                                                                    <IconCheck/>
                                                                                </button>
                                                                                <button className="text-red-500">
                                                                                    <IconX/>
                                                                                </button>
                                                                            </div>
                                                                        </Menu.Item>

                                                                        {/* Other items ... */}
                                                                    </Menu.Dropdown>
                                                                </Menu>
                                                            </> : ""
                                                    }
                                                </div>
                                                <div className="col-span-2 order-1 xl:order-2 xl:col-span-3 relative flex items-center justify-center">
                                                    {/*
                                                MOBILE Components
                                                MOBILE Components
                                                MOBILE Components
                                                MOBILE Components
                                                MOBILE Components
                                                MOBILE Components
                                                MOBILE Components
                                                */}
                                                    <div className="absolute xl:hidden xl:invisible top-2/4 left-0 -translate-y-2/4">
                                                        <div className="relative">
                                                            <Drawer
                                                                closeOnEscape={false}
                                                                classNames={{
                                                                    root: "block xl:hidden",
                                                                    body: "bg-stone-950",
                                                                    content: "bg-stone-950",
                                                                    header: "bg-stone-950"
                                                                }}
                                                                radius="md" opened={openDrawerTreeView} onClose={ () => { setOpenDrawerTreeView(!openDrawerTreeView) } }>
                                                                <div className="flex justify-start py-2 lg:justify-start items-center px-2">
                                                                    <button
                                                                        disabled={optionItem === undefined}
                                                                        onClick={() => {
                                                                            let id = window.crypto.randomUUID() + optionItem?.type;
                                                                            setItemCopied({
                                                                                ...optionItem,
                                                                                id,
                                                                                idUniqueIdentifier: id

                                                                            })
                                                                        }}
                                                                        title="Copy"
                                                                        className={`mx-2 rounded-md border-2 disabled:border-red-500 ${itemCopied !== undefined ? 'text-cyan-400 border-cyan-400' : 'text-white'}`}>
                                                                        <IconCopy/>
                                                                    </button>
                                                                    <button
                                                                        disabled={(!(itemCopied !== undefined && optionItem?.group !== "element"))}
                                                                        onClick={() => {
                                                                            optionItem ? addSection(itemCopied, optionItem?.idUniqueIdentifier) : addSection(itemCopied)
                                                                            setItemCopied(undefined)
                                                                        }}
                                                                        title="Paste" className="mx-2 disabled:text-red-500">
                                                                        <IconClipboard/>
                                                                    </button>

                                                                    {
                                                                        optionItem !== undefined ?
                                                                            <>
                                                                                <Menu
                                                                                    position="bottom"
                                                                                    classNames={{
                                                                                        dropdown: "bg-stone-950 hover:bg-stone-950 h-min m-0 p-0 text-center text-white",
                                                                                        item: "text-white bg-transparent hover:bg-transparent",
                                                                                        root: "text-white bg-transparent hover:bg-transparent"
                                                                                    }}
                                                                                >
                                                                                    <Menu.Target>
                                                                                        <Button classNames={{
                                                                                            root: "text-white hover:bg-transparent bg-transparent p-0 mx-2 my-0 h-auto",
                                                                                        }}>
                                                                                            <IconTrash/>
                                                                                        </Button>
                                                                                    </Menu.Target>

                                                                                    <Menu.Dropdown>
                                                                                        <Menu.Item>
                                                                                            <div>
                                                                                                Are you sure you want to delete the item?
                                                                                            </div>
                                                                                            <div className="flex items-center justify-around h-10">
                                                                                                <button
                                                                                                    onClick={() => {
                                                                                                        deleteItemDashboard(optionItem.idUniqueIdentifier)
                                                                                                    }}
                                                                                                    className="text-green-500">
                                                                                                    <IconCheck/>
                                                                                                </button>
                                                                                                <button className="text-red-500">
                                                                                                    <IconX/>
                                                                                                </button>
                                                                                            </div>
                                                                                        </Menu.Item>

                                                                                        {/* Other items ... */}
                                                                                    </Menu.Dropdown>
                                                                                </Menu>
                                                                            </> : ""
                                                                    }
                                                                </div>
                                                                <DropMenu viewport={viewport} currentPage={actualPage} items={itemsDashboard?.pages[actualPage]}
                                                                          optionSelected={optionItem}
                                                                          title="Components"
                                                                          type="tree-view"
                                                                          functions={onSelectItem} addSection={addSection}
                                                                          deleteItemDashboard={deleteItemDashboard}/>
                                                            </Drawer>
                                                            <Button
                                                                classNames={{
                                                                    root: "bg-transparent hover:bg-transparent flex items-center text-white m-0 h-auto",
                                                                }}
                                                                onClick={ () => { setOpenDrawerTreeView(!openDrawerTreeView) } }>
                                                        <span className="italic text-xs">
                                                            <IconBinaryTree/>
                                                        </span>
                                                                <span className="hidden lg:block px-2 font-bold">Components</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {viewports.map((item, index) => {
                                                            return (
                                                                <Group key={index} justify="center">
                                                                    <HoverCard shadow="md" closeDelay={0}>
                                                                        <HoverCard.Target>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setViewport({
                                                                                        value: item.value,
                                                                                        type: item.type,
                                                                                        breakpointID: item.breakpointID
                                                                                    })
                                                                                }}
                                                                                classNames={{
                                                                                    root: "h-full m-0 px-1 bg-transparent active:bg-transparent hover:bg-transparent " + (viewport.type === item.type ? "text-cyan-400" : " text-white"),
                                                                                    dropdown: "hidden lg:block"
                                                                                }}>
                                                                                {item.icon}
                                                                            </Button>
                                                                        </HoverCard.Target>
                                                                        <HoverCard.Dropdown classNames={{
                                                                            dropdown: "hidden lg:block bg-stone-950 h-min m-0 p-0 text-center"
                                                                        }}>
                                                                            <Text className="text-white h-full py-1 px-2"
                                                                                  size="sm">
                                                                                {item.type} view
                                                                            </Text>
                                                                            <Text className="text-white h-full italic py-1 px-2"
                                                                                  size="sm">
                                                                                width: {item.value}
                                                                            </Text>
                                                                        </HoverCard.Dropdown>
                                                                    </HoverCard>
                                                                </Group>
                                                            )
                                                        }
                                                    )}
                                                    {/*
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                MOBILE SETTINGS
                                                */}
                                                    <div className="absolute xl:hidden xl:invisible top-2/4 right-0 -translate-y-2/4">
                                                        <Drawer
                                                            closeOnEscape={false}
                                                            classNames={{
                                                                root: "block xl:hidden",
                                                                body: "bg-stone-950",
                                                                content: "bg-stone-950",
                                                                header: "bg-stone-950"
                                                            }}
                                                            radius="md" opened={openDrawerSettings} position="right" onClose={ () => { setOpenDrawerSettings(!openDrawerSettings) }}>
                                                            <button
                                                                onClick={() => {
                                                                    setKeepOptions(!keepOptions)
                                                                }}
                                                                className={"h-full m-0 flex  py-2 px-1 hover:bg-transparent bg-transparent hover:text-cyan-400 " + (keepOptions ? ' text-cyan-400' : ' text-white')}>
                                                                <span>Keep Settings</span>
                                                                <IconComponents className="mx-2"/>
                                                            </button>
                                                            <DropMenu pages={Object.keys(itemsDashboard?.pages).map((page, index) => { return (page.charAt(0).toUpperCase() + page.slice(1)) })} items={optionItem} viewport={viewport} keepOptions={keepOptions}
                                                                      modifyItemsDashboard={modifyItemsDashboard}
                                                                      title={optionItem !== undefined ? "Settings for " + optionItem.label : "Settings"}
                                                                      type="options"/>
                                                        </Drawer>
                                                        <Button
                                                            classNames={{
                                                                root: "bg-transparent hover:bg-transparent flex items-center text-white m-0 h-auto"
                                                            }}
                                                            onClick={ () => { setOpenDrawerSettings(!openDrawerSettings) } }>
                                                            <span className="hidden lg:block px-2 font-bold">Settings</span>
                                                        <span className="italic text-xs">
                                                            <IconSettings/>
                                                        </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 hidden xl:flex items-center justify-end relative order-3">
                                                    <div className="absolute">
                                                        <Group justify="center">
                                                            <HoverCard shadow="md" closeDelay={0}>
                                                                <HoverCard.Target>
                                                                    <Button
                                                                        onClick={() => {
                                                                            setKeepOptions(!keepOptions)
                                                                        }}
                                                                        classNames={{
                                                                            root: "h-full m-0 px-1 hover:bg-transparent bg-transparent hover:text-cyan-400 " + (keepOptions ? " text-cyan-400" : " text-white"),
                                                                        }}>
                                                                        <span>Keep Settings</span>
                                                                        <IconComponents/>
                                                                    </Button>
                                                                </HoverCard.Target>
                                                                <HoverCard.Dropdown classNames={{
                                                                    dropdown: "hidden lg:block bg-stone-950 h-min m-0 p-0 text-center"
                                                                }}>
                                                                    <Text className="text-white h-full py-1 px-2" size="sm">
                                                                        Allow to apply the styles<br/>values of the
                                                                        component for<br/>all views.This option allow
                                                                        you <br/> to design faster on responsive design
                                                                    </Text>
                                                                </HoverCard.Dropdown>
                                                            </HoverCard>
                                                        </Group>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden xl:block xl:col-span-1">
                                                <DropMenu viewport={viewport} currentPage={actualPage} items={itemsDashboard?.pages[actualPage]}
                                                          optionSelected={optionItem}
                                                          title="Components"
                                                          type="tree-view"
                                                          functions={onSelectItem} addSection={addSection}
                                                          deleteItemDashboard={deleteItemDashboard}/>
                                            </div>
                                            <div className="xl:col-span-3 bg-stone-950 overflow-x-auto  border-dotted border-2 flex justify-start rounded-md border-stone-800 h-[60vh] shrink-0 p-1">
                                                <div className={`outline outline-offset-2 relative outline-1 mx-auto outline-white overflow-x-auto rounded-md h-full p-1`} style={{"width": viewport.value, "min-width": viewport.value}}>
                                                    <DashboardPreview idUniqueIdentifier={optionItem?.idUniqueIdentifier}
                                                                      viewport={viewport} onSelectItem={onSelectItem}
                                                                      components={itemsDashboard?.pages[actualPage]}/>
                                                </div>
                                            </div>
                                            <div className="hidden xl:block xl:col-span-1">
                                                <DropMenu pages={Object.keys(itemsDashboard?.pages).map((page, index) => { return (page.charAt(0).toUpperCase() + page.slice(1)) })} items={optionItem} viewport={viewport} keepOptions={keepOptions}
                                                          modifyItemsDashboard={modifyItemsDashboard}
                                                          title={optionItem !== undefined ? "Settings for " + optionItem.label : "Settings"}
                                                          type="options"/>
                                            </div>
                                        </div>
                                    </section>
                                </main>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center text-white pt-36">
            <p>Loading dashboard... please wait</p>
        </div>
    );


    async function getItemsDashboard() {
        try {
            await getTemplate(params.slug).then((itemsDashboardResp) => {
                if (itemsDashboardResp.template[0] !== undefined) {
                    setTemplate(itemsDashboardResp?.template[0] ?? undefined);
                    setItemsDashboard(JSON.parse(itemsDashboardResp.template[0]?.items) ?? {
                        pages:
                            {
                                index: {
                                    sections: [],
                                    order: []
                                }
                            }
                    });
                    setActualPage("index")
                } else {
                    window.location.href = "/MyTemplates"
                }
            })
        } catch (error) {
            console.error('Error fetching itemsDashboard:', error);
        }
    }
}