import {Disclosure} from "@headlessui/react";
import {PopUpMain} from "@/app/components/PopUpMain";
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
    IconPackages, IconRowInsertBottom, IconEyeOff, IconMenu2,
    IconChevronRight,
    IconChevronUp,
} from '@tabler/icons-react';

export const Menu = ({items, functions, addSection, optionSelected, currentPage, viewport}) => {
    const selectItem = (event, value) => {
        functions(event, value)
    }

    const createContent = (section) => {
        return section.map((section, sectionIndex) => (
            section !== undefined ? (
                <Disclosure defaultOpen={true} as="div" key={section.idUniqueIdentifier} id={section.idUniqueIdentifier} className="span-end">
                    {({open}) => (
                        <>
                            <h3 className="relative flow-root">
                                <div onClick={(event) => selectItem(event, section)}
                                     className={`relative focus:border-stone-800 border-2 rounded-md mt-1 h-10 xl:h-8 2xl:h-10 z-50 flex w-full items-center justify-between text-sm xl:text-[10px] 2xl:text-sm  px-2 bg-black ${(optionSelected?.idUniqueIdentifier === section?.idUniqueIdentifier ? "border-cyan-400 " : "border-stone-800 ")}`}>
                                    <span className={`font-medium flex items-center text-nowrap truncate "  ${(optionSelected?.idUniqueIdentifier === section?.idUniqueIdentifier ? "text-cyan-400" : "text-white")}`}>
                                        {section.type === "container" ? (
                                            <IconContainer  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "article" ? (
                                            <IconArticle  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "section" ? (
                                            <IconSection  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "div" ? (
                                            <IconCrop54  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "main" ? (
                                            <IconPackage  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "header" ? (
                                            <IconLayoutNavbar  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "nav" ? (
                                            <IconLayoutNavbarCollapse  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "footer" ? (
                                            <IconLayoutBottombar  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "aside" ? (
                                            <IconLayoutSidebar  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "image" ? (
                                            <IconPhoto  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "button" ? (
                                            <IconRowInsertBottom  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "text" ? (
                                            <IconLetterCase  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "link" ? (
                                            <IconLink  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "form" ? (
                                            <IconForms  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        {section.type === "menu" ? (
                                            <IconMenu2  stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                        <span className="pl-1">{section?.nameHTML ? section?.nameHTML : section.label}</span>
                                        {
                                            section['settings' + viewport.type]?.display === 'hidden' ? (
                                                <span className="pl-2 text-[1px] text-red-500">
                                                    <IconEyeOff />
                                                </span>
                                            ) : ''
                                        }
                                    </span>
                                    <div className="relative flex items-center ">
                                        {
                                            section.group === 'container' ? (
                                                <div className=" right-6">
                                                    <PopUpMain addSection={addSection}
                                                               idUniqueIdentifier={section.idUniqueIdentifier}
                                                               title="Add Item"/>
                                                </div>
                                            ) : ''
                                        }
                                        <div
                                            className="ml-1 flex items-center right-0 hover:text-gray-500">
                                            {
                                                section.items?.length > 0 ? (
                                                    <Disclosure.Button className="h-full">
                                                        <span className="flex items-center text-white">
                                                          {open ? (
                                                              <IconChevronUp/>
                                                          ) : (
                                                              <IconChevronRight />
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
                                                <div key={option.idUniqueIdentifier} id={option.idUniqueIdentifier}
                                                     className="relative flex items-center">
                                                    <Disclosure as="div" className="w-full flex items-center relative pl-3">
                                                        <h3
                                                            onClick={(event) => {
                                                                selectItem(event, option)
                                                            }}
                                                            className="relative flow-root w-full">
                                                            <Disclosure.Button
                                                                className={"flex w-full bg-black rounded-md border-2 px-2 mt-1 h-10 xl:h-8 2xl:h-10 items-center justify-between text-sm xl:text-[10px] 2xl:text-sm text-white " + (optionSelected?.idUniqueIdentifier === option?.idUniqueIdentifier ? "border-cyan-400 " : "border-stone-800 ")} >
                                                                <span
                                                                    className={`font-medium flex items-center text-nowrap size-auto truncate pr-5 ${(optionSelected?.idUniqueIdentifier === option?.idUniqueIdentifier ? "text-cyan-400" : "text-white")}`}>
                                                                    {option.type === "container" ? (
                                                                        <IconContainer stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "article" ? (
                                                                        <IconArticle stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "section" ? (
                                                                        <IconSection stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "div" ? (
                                                                        <IconCrop54 stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "main" ? (
                                                                        <IconPackage stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "header" ? (
                                                                        <IconLayoutNavbar stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "nav" ? (
                                                                        <IconLayoutNavbarCollapse stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "footer" ? (
                                                                        <IconLayoutBottombar stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "aside" ? (
                                                                        <IconLayoutSidebar stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "image" ? (
                                                                        <IconPhoto stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "button" ? (
                                                                        <IconRowInsertBottom stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "text" ? (
                                                                        <IconLetterCase stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "link" ? (
                                                                        <IconLink stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "form" ? (
                                                                        <IconForms stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    {option.type === "menu" ? (
                                                                        <IconMenu2 stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>) : ""}
                                                                    <span className="pl-1 text-nowrap truncate w-full">
                                                                        { option.type === "text" ? option.text !== "" ? option.text : option.label : option?.nameHTML ? option?.nameHTML : option?.label }
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
    }
    return (
        <Disclosure defaultOpen={true} as="div" className="w-full span-end">
            {({open}) => (
                <>
                    <h3 className="relative flow-root w-full">
                        <div
                            onClick={ () => selectItem()}
                            className={`relative focus:border-stone-800 border-2 border-cyan-500 rounded-md mt-1 h-10 xl:h-8 2xl:h-10 text-sm xl:text-[10px] 2xl:text-sm  z-50 flex w-full items-center justify-between px-2 bg-black`}>
                                    <span className={`font-medium flex items-center text-cyan-500 text-nowrap truncate`}>
                                        <IconPackages stroke={2} className=" size-6 xl:size-5 2xl:size-6 "/>
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
                                                              <IconChevronUp  stroke={2}/>
                                                          ) : (
                                                              <IconChevronRight stroke={2}/>
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