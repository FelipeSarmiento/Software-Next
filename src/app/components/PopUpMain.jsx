import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

import Image from "next/image";
import {Tabs} from "./AceternityUI/tabs";
import {useRef, useState} from "react";
import { IconPhoto, IconPackage, IconLetterCase, IconLink, IconForms, IconSection, IconLayoutNavbar, IconContainer, IconArticle, IconCrop54, IconLayoutNavbarCollapse,IconLayoutBottombar, IconLayoutSidebar } from '@tabler/icons-react';
import {useSelector} from "react-redux";

export const PopUpMain = ({title, idUniqueIdentifier, addSection}) => {

    const items = [
        {label: "Section", type: "section", group: "container"},
        {label: "Article", type: "article", group: "container"},
        {label: "Div", type: "div", group: "container"},
        {label: "Main", type: "main", group: "container"},
        {label: "Header", type: "header", group: "container"},
        {label: "Nav", type: "nav", group: "container"},
        {label: "Footer", type: "footer", group: "container"},
        {label: "Aside", type: "aside", group: "container"},
        {label: "Form", type: "form", group: "container"},
        {label: "Link", type: "link", group: "container"},
        {label: "Text", type: "text", group: "element"},
        {label: "Image", type: "image", group: "element"}
    ]

    const viewPort = useSelector((state) => state.itemsDashboard.mediaQuery);

    const buildSection = ({label : section, type, group}) => {
        let id = window.crypto.randomUUID() + section;
        let settings = {
            id: "",
            idUniqueIdentifier: "",
            className: "",
            textColor: "text-[rgba(255,255,255,1)]",
            textSize: "text-[16px]",
            textWeight: "font-bold",
            textAlign: "text-center",
            textSpacing: "spacing-3",
            textDecoration: "text-underline",
            decorationColor: "decoration-[rgba(255,255,255,1)]",
            backgroundColor: "bg-[rgba(0,0,0,0)]",
            borderWidth: "",
            borderRadius: "rounded-[6px]",
            borderColor: "border-[rgba(0,0,0,1)]",
            justifyContent: "justify-center",
            itemsAlign: "items-center",
            display: "flex",
            position: "relative",
            paddingRight: "pr-[0px]",
            paddingLeft: "pl-[0px]",
            paddingTop: "pt-[0px]",
            paddingBottom: "pb-[0px]",
            marginRight: "mr-[0px]",
            marginLeft: "ml-[0px]",
            marginTop: "mt-[0px]",
            marginBottom: "mb-[0px]",
            height: "h-[50%]",
            width: "w-[100%]",
            borderRight: "border-r-[1px]",
            borderLeft: "border-l-[1px]",
            borderTop: "border-t-[1px]",
            borderBottom: "border-b-[1px]",
            opacity: "opacity-2"
        }
        let newSection = {
            id: id,
            idUniqueIdentifier: id,
            type: type,
            group: group,
            label: section.includes('-') ? section.split('-').join(' ').toUpperCase()[0] + section.split('-').join(' ').slice(1) : section.toUpperCase()[0] + section.slice(1),
            settingsMobile: {
                ...settings,
                className: classNames(settings, "")
            },
            settingsTablet: {
                ...settings,
                className: classNames(settings, "sm")
            },
            settingsLaptop: {
                ...settings,
                className: classNames(settings, "md")
            },
            settingsDesktop: {
                ...settings,
                className: classNames(settings, "lg")
            },
            settingsTV: {
                ...settings,
                className: classNames(settings, "xl")
            },
        }
        if (group === "container") {
            newSection = {
                ...newSection,
                items: []
            }
        } else {
            newSection = {
                ...newSection,
                value: type
            }
        }
        idUniqueIdentifier ? addSection(newSection, idUniqueIdentifier) : addSection(newSection);
    }
    const tabs = [
        {
            title: "Items",
            value: "product",
            content: (
                <div
                    className="w-full overflow-y-auto relative h-full rounded-2xl pt-3 lg:p-10 text-xl md:text-4xl font-bold text-white bg-black border-2 border-stone-800">
                    <p>Items</p>
                    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 place-items-center text-white w-full p-2">
                        {items.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        buildSection(item)
                                        ref.current.close()
                                    }}
                                    key={index}
                                    className="rounded-md relative hover:border-white flex flex-col items-center justify-center border-2 text-white border-gray-500 size-24 lg:size-32">
                                    { item.type === "container" ? ( <IconContainer stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "article" ? ( <IconArticle stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "section" ? ( <IconSection stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "div" ? ( <IconCrop54 stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "main" ? ( <IconPackage stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "header" ? ( <IconLayoutNavbar stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "nav" ? ( <IconLayoutNavbarCollapse stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "footer" ? ( <IconLayoutBottombar stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "aside" ? ( <IconLayoutSidebar stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "image" ? ( <IconPhoto stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "text" ? ( <IconLetterCase stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "link" ? ( <IconLink stroke={2} className="size-16" /> ) : ""}
                                    { item.type === "form" ? ( <IconForms stroke={2} className="size-16" /> ) : ""}
                                    <div className="text-sm">
                                        {item.label}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </div>
            ),
        }
    ];

    function classNames(classes, query) {
        classes.className = ""
        const elements = Object.entries(classes).map(([key, value]) => {
            if (value === "" ) return "";
            return (query ? query + ":" : "") + value;
        });
        return elements.join(' ');
    }

    const ref = useRef();


    return (
        <>
            <Popup className="animate__animated animate__pulse" ref={ref}
                   trigger={<button><FontAwesomeIcon icon={faPlus}/></button>} arrow={false}
                   position="center center" title={title}>
                <div
                    className="fixed flex left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 h-screen bg-stone-800/90 w-screen  z-50 justify-center items-center">
                    <div
                        className="relative flex bg-stone-950 border-2 rounded-md border-stone-700 w-[90vw] h-[80vh] overflow-y-auto">
                        <button className="absolute right-6 top-3 text-white text-2xl" onClick={() => {
                            ref.current.close()
                        }} title={title}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                        <header className="w-full text-center justify-center py-4">
                            <h1 className="text-3xl font-bold tracking-tight text-white my-2">{title}</h1>
                            <div
                                className="h-full [perspective:1000px] py-5 relative flex flex-col w-10/12 mx-auto  items-start justify-start">
                                <Tabs contentClassName="mt-10" tabs={tabs}/>
                            </div>
                        </header>
                    </div>
                </div>
            </Popup>
        </>
    )
};

const DummyContent = () => {
    return (
        <Image
            src="/linear.webp"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};