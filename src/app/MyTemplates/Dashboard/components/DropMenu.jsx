﻿import {Menu, Options} from "./subComponents"
import {useEffect, useRef, useState} from "react";
import {PopUpMain} from "@/app/components/PopUpMain";
import { IconBinaryTree, IconSettings  } from '@tabler/icons-react';

export const DropMenu = ({items, title, type, functions, modifyItemsDashboard, addSection, deleteItemDashboard, optionSelected, viewport, keepOptions, currentPage, pages}) => {


    const [itemsPrimary, setItemsPrimary] = useState(items ?? undefined)

    useEffect(() => {
        setItemsPrimary(items)
    }, [items]);


    return (
        <>
            <div className="h-full lg:block lg:h-[80vh] xl:h-[60vh] relative w-full bg-stone-950 border-2 border-stone-800 rounded-md p-1">
                <h3 className="sr-only">{title}</h3>
                <ul role="list" className="border-b border-stone-800 mb-1 text-sm font-medium text-white">
                    <li className="relative flex items-center justify-center h-10 text-white font-bold text-lg xl:text-sm 2xl:text-lg">
                        <a>
                            <span className="absolute top-2/4 -translate-y-2/4 left-2">
                                { title !== 'Components' ? <IconSettings/>: "" }
                            </span>
                            <span className="">
                            {title}
                            </span>
                            { title === 'Components' ? <span className="absolute top-2/4 -translate-y-2/4 right-2"> <IconBinaryTree/> </span> : '' }</a>
                    </li>
                </ul>
                <section className="menuContainer overflow-auto h-[calc(100%_-_48px)] snap-mandatory scroll-pr-0 scroll-smooth">
                    {
                        type === 'options' ? <Options pages={pages} viewport={viewport} keepOptions={keepOptions} options={itemsPrimary} modifyItemsDashboard={modifyItemsDashboard}/> : <Menu viewport={viewport} deleteItemDashboard={deleteItemDashboard} currentPage={currentPage} addSection={addSection} items={itemsPrimary.sections} functions={functions} optionSelected={optionSelected}/>
                    }

                </section>
            </div>
        </>
    )
}