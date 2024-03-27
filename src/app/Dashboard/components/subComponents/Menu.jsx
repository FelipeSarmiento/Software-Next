import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faChevronRight, faTrash} from '@fortawesome/free-solid-svg-icons'
import {PopUpMain} from "../../../components/PopUpMain.jsx";
import {
    IconPackage,
    IconLetterCase,
    IconPhoto,
    IconContainer,
    IconArticle,
    IconSection,
    IconCrop54,
    IconLayoutNavbar,
    IconLayoutNavbarCollapse,
    IconLayoutBottombar,
    IconLayoutSidebar,
    IconLink,
    IconForms,
    IconPackages, IconRowInsertBottom
} from '@tabler/icons-react';

export const Menu = ({items, functions, deleteItemDashboard, addSection, optionSelected, currentPage}) => {
    const selectItem = (value) => {
        functions(value)
    }

    const createContent = (section) => {
        let content = section.map((section, sectionIndex) => (
            section !== undefined ? (
                <Disclosure as="div" key={section.idUniqueIdentifier} className="span-end">
                    {({open}) => (
                        <>
                            <h3 className="relative flow-root">
                                <div onClick={() => selectItem(section)}
                                     className={`relative focus:border-stone-800 border-2 rounded-md mt-1 h-10 z-50 flex w-full items-center justify-between text-sm  px-2 bg-black ${(optionSelected?.idUniqueIdentifier === section?.idUniqueIdentifier ? "border-cyan-400 " : "border-stone-800 ")}`}>
                                    <span className={`font-medium flex items-center text-nowrap truncate "  ${(optionSelected?.idUniqueIdentifier === section?.idUniqueIdentifier ? "text-cyan-400" : "text-white")}`}>
                                        {section.type === "container" ? (
                                            <IconContainer stroke={2}/>) : ""}
                                        {section.type === "article" ? (
                                            <IconArticle stroke={2}/>) : ""}
                                        {section.type === "section" ? (
                                            <IconSection stroke={2}/>) : ""}
                                        {section.type === "div" ? (
                                            <IconCrop54 stroke={2}/>) : ""}
                                        {section.type === "main" ? (
                                            <IconPackage stroke={2}/>) : ""}
                                        {section.type === "header" ? (
                                            <IconLayoutNavbar stroke={2}/>) : ""}
                                        {section.type === "nav" ? (
                                            <IconLayoutNavbarCollapse stroke={2}/>) : ""}
                                        {section.type === "footer" ? (
                                            <IconLayoutBottombar stroke={2}/>) : ""}
                                        {section.type === "aside" ? (
                                            <IconLayoutSidebar stroke={2}/>) : ""}
                                        {section.type === "image" ? (
                                            <IconPhoto stroke={2}/>) : ""}
                                        {section.type === "button" ? (
                                            <IconRowInsertBottom stroke={2}/>) : ""}
                                        {section.type === "text" ? (
                                            <IconLetterCase stroke={2}/>) : ""}
                                        {section.type === "link" ? (
                                            <IconLink stroke={2}/>) : ""}
                                        {section.type === "form" ? (
                                            <IconForms stroke={2}/>) : ""}
                                        <span className="pl-1">{section.label}</span>
                                    </span>
                                    <div className="relative">
                                        {
                                            section.group === 'container' ? (
                                                <div className="absolute top-2/4 text-white -translate-y-2/4 right-6">
                                                    <PopUpMain addSection={addSection}
                                                               idUniqueIdentifier={section.idUniqueIdentifier}
                                                               title="Add Item"/>
                                                </div>
                                            ) : ''
                                        }
                                        <div
                                            className="ml-1 absolute top-2/4 -translate-y-2/4 flex items-center right-0 hover:text-gray-500">
                                            {
                                                section.items?.length > 0 ? (
                                                    <Disclosure.Button className="h-full">
                                                        <span className="flex items-center text-white">
                                                          {open ? (
                                                              <FontAwesomeIcon icon={faChevronUp}/>
                                                          ) : (
                                                              <FontAwesomeIcon icon={faChevronRight}/>
                                                          )}
                                                        </span>
                                                    </Disclosure.Button>
                                                ) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </h3>
                            <Disclosure.Panel className="relative h-full">
                                {
                                    section.items?.length > 0 ? (
                                        <div className="h-full left-2 py-1 w-1 absolute">
                                            <div className="border-cyan-400 h-full w-full border-2 bg-cyan-400 rounded-md"/>
                                        </div>
                                    ) : ''
                                }
                                <div className="ml-3 w-full">
                                    {section.items?.map((option, optionIndex) => (
                                        <>
                                            {option.group === "container" ? (
                                                <div key={option.idUniqueIdentifier} className="relative pl-3">
                                                    {createContent([option])}
                                                </div>
                                            ) : (
                                                <div key={option.idUniqueIdentifier}
                                                     className="relative flex items-center">
                                                    <Disclosure as="div" className="w-full flex items-center relative pl-3">
                                                        <h3
                                                            onClick={() => {
                                                                selectItem(option)
                                                            }}
                                                            className="relative flow-root w-full">
                                                            <Disclosure.Button
                                                                className={"flex w-full bg-black rounded-md border-2 px-2 mt-1 h-10 items-center justify-between text-sm text-white " + (optionSelected?.idUniqueIdentifier === option?.idUniqueIdentifier ? "border-cyan-400 " : "border-stone-800 ")} >
                                                                <span
                                                                    className={`font-medium flex items-center text-nowrap size-auto truncate pr-5 ${(optionSelected?.idUniqueIdentifier === option?.idUniqueIdentifier ? "text-cyan-400" : "text-white")}`}>
                                                                    {option.type === "container" ? (
                                                                        <IconContainer stroke={2}/>) : ""}
                                                                    {option.type === "article" ? (
                                                                        <IconArticle stroke={2}/>) : ""}
                                                                    {option.type === "section" ? (
                                                                        <IconSection stroke={2}/>) : ""}
                                                                    {option.type === "div" ? (
                                                                        <IconCrop54 stroke={2}/>) : ""}
                                                                    {option.type === "main" ? (
                                                                        <IconPackage stroke={2}/>) : ""}
                                                                    {option.type === "header" ? (
                                                                        <IconLayoutNavbar stroke={2}/>) : ""}
                                                                    {option.type === "nav" ? (
                                                                        <IconLayoutNavbarCollapse stroke={2}/>) : ""}
                                                                    {option.type === "footer" ? (
                                                                        <IconLayoutBottombar stroke={2}/>) : ""}
                                                                    {option.type === "aside" ? (
                                                                        <IconLayoutSidebar stroke={2}/>) : ""}
                                                                    {option.type === "image" ? (
                                                                        <IconPhoto stroke={2}/>) : ""}
                                                                    {option.type === "button" ? (
                                                                        <IconRowInsertBottom stroke={2}/>) : ""}
                                                                    {option.type === "text" ? (
                                                                        <IconLetterCase stroke={2}/>) : ""}
                                                                    {option.type === "link" ? (
                                                                        <IconLink stroke={2}/>) : ""}
                                                                    {option.type === "form" ? (
                                                                        <IconForms stroke={2}/>) : ""}
                                                                    <span className="pl-1">
                                                                        { option.type === "text" ? option.text !== "" ? option.text : option.label : "" }
                                                                        { option.type === "image" ? "Image" : "" }
                                                                    </span>
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                    </Disclosure>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ) : ''
        ))
        return content
    }
    return (
        <Disclosure as="div" className="w-full span-end">
            {({open}) => (
                <>
                    <h3 className="relative flow-root w-full">
                        <div
                            onClick={ () => selectItem()}
                             className={`relative focus:border-stone-800 border-2 border-cyan-500 rounded-md mt-1 h-10 z-50 flex w-full items-center justify-between text-sm  px-2 bg-black`}>
                                    <span className={`font-medium flex items-center text-cyan-500 text-nowrap truncate`}>
                                        <IconPackages stroke={2}/>
                                        <span className="pl-1">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1) } Page</span>
                                    </span>
                            <div className="relative">
                                <div className="absolute text-white top-2/4 -translate-y-2/4 right-6">
                                    <PopUpMain addSection={addSection}
                                               title="Add Item"/>
                                </div>
                                <div
                                    className="ml-1 absolute top-2/4 -translate-y-2/4 flex items-center right-0 text-white hover:text-gray-500">
                                    {
                                        items.length > 0 ? (
                                            <Disclosure.Button className="h-full">
                                                        <span className="flex items-center text-white">
                                                          {open ? (
                                                              <FontAwesomeIcon icon={faChevronUp}/>
                                                          ) : (
                                                              <FontAwesomeIcon icon={faChevronRight}/>
                                                          )}
                                                        </span>
                                            </Disclosure.Button>
                                        ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </h3>
                    <Disclosure.Panel className="relative h-full">
                        {
                            items.length > 0 ? (
                                <div className="h-full left-2 py-1 w-1 absolute">
                                    <div className="border-cyan-400 h-full w-full border-2 bg-cyan-400 rounded-md"/>
                                </div>
                            ) : ''
                        }
                        <div className="ml-3 w-full">
                            <div className="relative pl-3">
                                {
                                    createContent(items)
                                }
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}