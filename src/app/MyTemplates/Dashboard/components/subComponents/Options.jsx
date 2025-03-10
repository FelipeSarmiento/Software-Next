﻿import {Disclosure} from "@headlessui/react";
import React, {useEffect, useMemo, useState} from "react";
import {
    IconArrowsVertical,
    IconArrowsHorizontal,
    IconSpacingVertical,
    IconSpacingHorizontal,
    IconAlignBoxCenterTop,
    IconAlignBoxCenterBottom,
    IconAlignBoxCenterMiddle,
    IconAlignBoxCenterStretch,
    IconAlignBoxLeftMiddle,
    IconAlignBoxRightMiddle,
    IconBorderRadius,
    IconCursorText,
    IconColumns1,
    IconGrid4x4,
    IconTextIncrease,
    IconSquareX,
    IconTag,
    IconArrowsUpDown,
    IconTextWrap,
    IconTextWrapDisabled,
    IconAlignLeft,
    IconAlignCenter,
    IconAlignRight,
    IconAlignJustified,
    IconLink,
    IconId,
    IconPhoto, IconChevronDown, IconChevronUp
} from '@tabler/icons-react';
import {ColorInput, ColorPicker, NumberInput, Select} from "@mantine/core";

export const Options = ({options, modifyItemsDashboard, viewport, keepOptions, pages}) => {

    const units = ['auto', 'px', 'rem', 'vw', 'vh', '%'];

    const [optionItem, setOptionItem] = useState(options);
    const [viewportState, setViewportState] = useState(viewport);

    useEffect(() => {
        updateViewport(viewport)
    }, [viewport]);

    const onChangeInput = ({target}) => {
        let option;
        switch (target.id) {
            case 'valueInput':
                option = {
                    ...optionItem,
                    [target.name]: target.value
                }
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                updateOptionItem(option)
                break
            default:
                if (keepOptions) {
                    option = {
                        ...optionItem,
                        settingsMobile: {...optionItem.settingsMobile, [target.name]: target.value},
                        settingsTablet: {...optionItem.settingsTablet, [target.name]: target.value},
                        settingsLaptop: {...optionItem.settingsLaptop, [target.name]: target.value},
                        settingsDesktop: {...optionItem.settingsDesktop, [target.name]: target.value},
                        settingsTV: {...optionItem.settingsTV, [target.name]: target.value}
                    }
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                    updateOptionItem(option)
                } else {
                    option = {
                        ...optionItem,
                        ['settings' + viewportState.type]: {
                            ...optionItem['settings' + viewportState.type],
                            [target.name]: target.value
                        }
                    }
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                    updateOptionItem(option)
                }
                break
        }
    }


    useEffect(() => {
        updateOptionItem(options)
    }, [options])
    const [colorOptions, setColorOptions] = useState({})
    const [specificAttributes, setSpecificAttributes] = useState({
        text: "",
        src: "",
        alt: "",
        href: "",
        hrefType: "",
        target: "",
    })
    const [borderWidth, setBorderWidth] = useState({
        borderRight: "",
        borderLeft: "",
        borderTop: "",
        borderBottom: ""
    })
    const [paddings, setPaddings] = useState({
        paddingRight: "",
        paddingLeft: "",
        paddingTop: "",
        paddingBottom: ""
    })
    const [margins, setMargins] = useState({
        marginRight: "",
        marginLeft: "",
        marginTop: "",
        marginBottom: ""
    })
    const [size, setSize] = useState({
        width: {
            value: "",
            unit: ""
        },
        height: {
            value: "",
            unit: ""
        }
    })
    const [rounded, setRounded] = useState({
        value: "",
        unit: ""
    })
    const [fontSize, setFontSize] = useState({
        value: "",
        unit: ""
    })
    const [positions, setPositions] = useState({
        top: {
            value: "",
            unit: ""
        },
        left: {
            value: "",
            unit: ""
        },
        right: {
            value: "",
            unit: ""
        },
        bottom: {
            value: "",
            unit: ""
        }
    })

    function hexToRgba(hex) {
        if (hex?.includes("#")) {
            hex = hex.replace('#', '');

            // Divide el valor hexadecimal en los componentes R, G y B
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);

            // Devuelve el color en formato RGBA
            return `rgba(${r},${g},${b},1)`;
        }
        return hex
    }

    const [colorsUsed, setColorsUsed] = useState([])
    const [display, setDisplay] = useState()
    const [flexDirection, setFlexDirection] = useState()
    const [flexWrap, setFlexWrap] = useState()
    const [gaps, setGaps] = useState({})
    const [spaces, setSpaces] = useState({})
    const [gridTemplate, setGridTemplate] = useState({})
    const [externalLink, setExternalLink] = useState()
    const [zIndex, setZIndex] = useState()

    return (optionItem !== undefined ? (
            <div className="py-2 pr-2 text-white">

                {/*
                        ID
                        ID
                        ID
                        ID
                    */}
                <div className="py-2 flex items-center relative h-max">
                    <div className="relative flex rounded-md border-[1px] border-white w-full">
                        <div className="w-[30%] flex items-center justify-start space-x-1 px-1 border-r-[1px] h-10 xl:h-8 2xl:h-10">
                            <IconId/>
                            <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-[12px]">ID</span>
                        </div>
                        <input
                            onChange={({target}) => {
                                setSpecificAttributes({
                                    ...specificAttributes,
                                    idHTML: target.value
                                })
                                onChangeInput({
                                    target: {
                                        id: "valueInput",
                                        name: "idHTML",
                                        value: target.value
                                    }
                                })
                            }}
                            name="idHTML"
                            value={specificAttributes?.idHTML}
                            min={0}
                            type="text"
                            className="w-[70%] h-full rounded-md appearance-none focus:outline-none bg-black p-1"/>
                    </div>
                </div>
                {/*
                        NAME
                        NAME
                        NAME
                        NAME
                    */}
                <div className="py-2 flex items-center relative h-max">
                    <div className="relative flex text-xs rounded-md border-[1px] border-white w-full">
                        <div className="w-[30%] flex items-center justify-start space-x-1 px-1 border-r-[1px] h-10 xl:h-8 2xl:h-10">
                            <IconTag className="flex xl:hidden 2xl:flex"/>
                            <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-[12px]">Name</span>
                        </div>
                        <input
                            onChange={({target}) => {
                                setSpecificAttributes({
                                    ...specificAttributes,
                                    nameHTML: target.value
                                })
                                onChangeInput({
                                    target: {
                                        id: "valueInput",
                                        name: "nameHTML",
                                        value: target.value
                                    }
                                })
                            }}
                            name="idHTML"
                            value={specificAttributes?.nameHTML}
                            min={0}
                            type="text"
                            className="w-[70%] h-10 xl:h-8 2xl:h-10 flex items-center rounded-md appearance-none focus:outline-none bg-black p-1"/>
                    </div>
                </div>
                {/*
                        TEXT
                        TEXT
                        TEXT
                        TEXT
                    */}

                {optionItem.hasOwnProperty("text") ? (
                    <div className="py-2 flex items-center relative h-max">
                        <div className="relative text-md xl:text-xs 2xl:text-md flex flex-col rounded-md border-[1px] border-white min-h-28 w-full">
                            <div className="w-full flex items-center justify-center border-b-[1px] h-10 xl:h-8 2xl:h-10">
                                <IconCursorText/>
                                <span className="font-bold">Text</span>
                            </div>
                            <textarea
                                onChange={({target}) => {
                                    setSpecificAttributes({
                                        ...specificAttributes,
                                        text: target.value
                                    })
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "text",
                                            value: target.value
                                        }
                                    })
                                }}
                                name="text"
                                value={specificAttributes.text}
                                min={0}
                                type="text"
                                className="w-full min-h-20 max-h-28 rounded-md text-md xl:text-sm 2xl:text-md appearance-none focus:outline-none bg-black p-1"/>
                        </div>
                    </div>
                ) : ""}

                {/*
                        HREF
                        HREF
                        HREF
                        HREF
                    */}

                {optionItem.hasOwnProperty("href") ? (
                    <div className="py-2 flex items-center relative h-max">
                        <div className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                            <div className="w-[30%] flex items-center justify-start space-x-1 px-1 border-r-[1px] h-10 xl:h-8 2xl:h-10">
                                <IconLink/>
                                <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-[12px]">Href</span>
                            </div>
                            <Select
                                classNames={{
                                    root: "h-9 w-[70%] xl:h-7 2xl:h-9 py-0 border-0",
                                    input: "bg-stone-950 text-white rounded-md border-0 my-0 h-9 xl:h-7 py-0 2xl:h-9 text-md xl:text-xs 2xl:text-md min-h-0 font-bold text-center",
                                    dropdown: "bg-stone-950 text-white",
                                    option: "hover:bg-stone-950 border-2 border-transparent hover:border-cyan-500 hover:text-cyan-500 text-white font-bold text-md"
                                }}
                                placeholder="Redirect to..."
                                data={pages}
                                onChange={(value) => {
                                    if (value) {
                                        if (value.toLowerCase() === 'index') {
                                            setSpecificAttributes({
                                                ...specificAttributes,
                                                href: "internal|",
                                                hrefType: "internal"
                                            })
                                            onChangeInput({
                                                target: {
                                                    id: "valueInput",
                                                    name: "href",
                                                    value: "internal|"
                                                }
                                            })
                                        } else {
                                            setSpecificAttributes({
                                                ...specificAttributes,
                                                href: "internal|" + value,
                                                hrefType: "internal"
                                            })
                                            onChangeInput({
                                                target: {
                                                    id: "valueInput",
                                                    name: "href",
                                                    value: "internal|" + value?.toLowerCase()
                                                }
                                            })
                                        }
                                    }
                                }}
                                onSearchChange={setExternalLink}
                                searchable
                                defaultSearchValue={specificAttributes.href?.includes("|") ? specificAttributes.href?.split("|")[1] : specificAttributes.href}
                                allowDeselect={true}
                                defaultValue={specificAttributes.href?.includes("|") ? specificAttributes.href?.split("|")[1] : specificAttributes.href}
                                checkIconPosition="right"
                                title={specificAttributes.href}
                                nothingFoundMessage={<button onClick={() => {
                                    setSpecificAttributes({
                                        ...specificAttributes,
                                        href: externalLink,
                                        hrefType: "external"
                                    })
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "href",
                                            value: "external|" + externalLink
                                        }
                                    })
                                }} className="w-full h-full text-white">External Link</button>}
                            />
                        </div>
                    </div>
                ) : ""}
                {/*
                        TARGET
                        TARGET
                        TARGET
                        TARGET
                    */}

                {optionItem.hasOwnProperty("target") ? (
                    <div className="py-2 flex flex-col  justify-center items-center relative h-max">
                        <div className="text-white text-md xl:text-sm 2xl:text-md py-2 flex justify-center">
                            <h4>Target</h4>
                        </div>
                        <div className="w-full px-3 flex justify-center space-x-3">
                            <button
                                onClick={() => {
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "target",
                                            value: "_self"
                                        }
                                    })
                                }}
                                className={`w-3/6 flex items-center justify-center px-2 text-md rounded-md border-2 h-10 xl:h-8 2xl:h-10 xl:text-sm 2xl:text-md ${(optionItem.target === undefined || optionItem.target === '_self') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                <span className="px-2">_self</span>
                            </button>
                            <button
                                onClick={() => {
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "target",
                                            value: "_blank"
                                        }
                                    })
                                }}
                                className={`w-3/6 flex items-center justify-center px-2 text-md rounded-md border-2 h-10 xl:h-8 2xl:h-10 xl:text-sm 2xl:text-md ${optionItem.target === '_blank' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                <span className="px-2 text-center">_blank</span>
                            </button>
                        </div>
                    </div>
                ) : ""}

                {/*
                        SRC
                        SRC
                        SRC
                        SRC
                    */}

                {optionItem.hasOwnProperty("src") ? (
                    <>
                        <div className="py-2 flex items-center relative h-max">
                            <div
                                className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                {/*<div className="relative before:cursor-pointer w-[30%] before:text-md before:text-nowrap 2xl:before:text-sm before:font-bold before:content-['SRC'] before:top-2/4 before:left-2 before:-translate-y-2/4 before:absolute">*/}
                                {/*    <input*/}
                                {/*        onChange={(e) => {*/}
                                {/*            e.preventDefault()*/}
                                {/*            let reader = new FileReader();*/}
                                {/*            reader.readAsDataURL(e.target?.files[0])*/}
                                {/*            reader.onload = function () {*/}
                                {/*                setSpecificAttributes({*/}
                                {/*                    ...specificAttributes,*/}
                                {/*                    src: reader.result,*/}
                                {/*                    srcName: e.target.files[0].name*/}
                                {/*                })*/}
                                {/*                onChangeInput({*/}
                                {/*                    target: {*/}
                                {/*                        id: "valueInput",*/}
                                {/*                        name: "src",*/}
                                {/*                        value: reader.result*/}
                                {/*                    }*/}
                                {/*                })*/}
                                {/*            }*/}
                                {/*            reader.onerror = function (error) {*/}
                                {/*                console.log('Error: ', error);*/}
                                {/*            }*/}
                                {/*        }}*/}
                                {/*        name="image"*/}
                                {/*        id="valueInput"*/}
                                {/*        min={0}*/}
                                {/*        type="file"*/}
                                {/*        accept="image/*"*/}
                                {/*        className="w-full rounded-r-md appearance-none opacity-0 focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>*/}
                                {/*</div>*/}
                                <div className="w-[30%] flex items-center justify-start space-x-1 px-1 border-r-[1px] h-10 xl:h-8 2xl:h-10">
                                    <IconPhoto/>
                                    <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-[12px]">SRC</span>
                                </div>
                                <div
                                    className="w-[70%] flex space-x-1 items-center justify-center border-l-[1px] h-full">
                                    <input
                                        onChange={(e) => {
                                            setSpecificAttributes({
                                                ...specificAttributes,
                                                src: e.target.value,
                                                srcName: e.target.value
                                            })
                                            onChangeInput({
                                                target: {
                                                    id: "valueInput",
                                                    name: "src",
                                                    value: e.target.value
                                                }
                                            })
                                        }}
                                        value={ specificAttributes?.srcName ?? specificAttributes?.src}
                                        type="text"
                                        className="w-full h-full bg-black rounded-md focus:outline-none px-2 placeholder:text-white placeholder:text-md placeholder:xl:text-sm placeholder:2xl:text-md text-nowrap truncate"
                                        placeholder="Type or paste an image URL"/>
                                </div>
                            </div>
                        </div>
                        {
                            specificAttributes.src !== "" ? (
                                <div className="py-2 flex items-center relative h-max">
                                    <div
                                        className="relative flex items-center justify-center rounded-md border-[1px] object-contain border-white h-36 w-full">
                                        <img className="object-contain h-full w-full" src={specificAttributes.src}
                                             alt={specificAttributes.alt}/>
                                    </div>
                                </div>
                            ) : ""

                        }
                    </>
                ) : ""}

                {/*
                        ALT
                        ALT
                        ALT
                        ALT
                    */}

                {optionItem.hasOwnProperty("alt") ? (
                    <div className="py-2 flex items-center relative h-max">
                        <div
                            className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                            <div className="w-[30%] flex items-center justify-start space-x-1 px-1 border-r-[1px] h-10 xl:h-8 2xl:h-10">
                                <IconCursorText/>
                                <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-[12px]">Alt</span>
                            </div>
                            <input
                                onChange={({target}) => {
                                    setSpecificAttributes({
                                        ...specificAttributes,
                                        alt: target.value
                                    })
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "alt",
                                            value: target.value
                                        }
                                    })
                                }}
                                value={specificAttributes.alt}
                                min={0}
                                type="text"
                                className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                        </div>
                    </div>
                ) : ""}


                {optionItem.hasOwnProperty("settings" + viewportState.type) ? (
                    <>
                        {/*
                        TEXT SETTINGS
                        TEXT SETTINGS
                        TEXT SETTINGS
                        TEXT SETTINGS
                        TEXT SETTINGS
                        TEXT SETTINGS
                        TEXT SETTINGS
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Text</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="py-1 border-l-2 w-full pl-1">
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center px-1 border-r-[1px] h-full">
                                                            <IconTextIncrease className="flex xl:hidden 2xl:flex"/>
                                                            <span className="text-[12px] font-bold text-center text-md xl:text-[10px] 2xl:text-md">Font Size</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setFontSize({
                                                                        ...fontSize,
                                                                        value: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "textSize",
                                                                            name: "textSize",
                                                                            value: "text-[" + target.value + fontSize.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={fontSize.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setFontSize({
                                                                        ...fontSize,
                                                                        unit: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "textSize",
                                                                            name: "textSize",
                                                                            value: "text-[" + fontSize.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={fontSize.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-white py-2 flex justify-center">
                                                    <h4>Font color</h4>
                                                </div>
                                                <div className="flex items-center my-2 px-5 xl:px-1 2xl:px-5 h-10 xl:h-8 2xl:h-10 justify-center">
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setColorOptions({
                                                                    ...colorOptions,
                                                                    textColor: target.value
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textColor",
                                                                        name: "textColor",
                                                                        value: "text-[" + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={colorOptions.textColor}
                                                        min={0}
                                                        type="text"
                                                        placeholder="Type a Hex or RGBA Color"
                                                        className="w-full rounded-md h-full appearance-none text-md xl:text-sm 2xl:text-md border-2 text-center focus:outline-none bg-black text-nowrap truncate"/>

                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            textColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "textColor",
                                                                name: "textColor",
                                                                value: "text-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    format="rgba"
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    swatches={colorsUsed}
                                                    value={hexToRgba(colorOptions.textColor)}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                                <span className="text-white text-md xl:text-sm 2xl:text-md">Font Weight</span>
                                                <select onChange={onChangeInput}
                                                        value={optionItem['settings' + viewportState.type].textWeight}
                                                        id="FontWeight" name="textWeight"
                                                        className="appearance-none rounded-md py-1 border-2 text-md xl:text-sm 2xl:text-md border-gray-500 bg-black text-white px-1 w-full focus:outline-none">
                                                    <option value="font-light">Light</option>
                                                    <option value="font-normal">Normal</option>
                                                    <option value="font-medium">Medium</option>
                                                    <option value="font-semibold">Semibold</option>
                                                    <option value="font-bold">Bold</option>
                                                    <option value="font-extrabold">Extrabold</option>
                                                </select>
                                                <div className="w-full p-3 flex flex-wrap">
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textDecoration",
                                                                        name: "textDecoration",
                                                                        value: "no-underline"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs xl:text-[9px] 2xl:text-xs rounded-md border-2 ${(optionItem['settings' + viewportState.type]?.textDecoration === undefined || optionItem['settings' + viewportState.type]?.textDecoration === 'no-underline') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">No underline</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textDecoration",
                                                                        name: "textDecoration",
                                                                        value: "underline"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs xl:text-[9px] 2xl:text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.textDecoration === 'underline' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2 underline">Underline</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textDecoration",
                                                                        name: "textDecoration",
                                                                        value: "overline"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs xl:text-[9px] 2xl:text-xs rounded-md border-2  ${optionItem['settings' + viewportState.type]?.textDecoration === 'overline' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2 overline">Overline</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textDecoration",
                                                                        name: "textDecoration",
                                                                        value: "line-through"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs xl:text-[9px] 2xl:text-xs rounded-md border-2  ${optionItem['settings' + viewportState.type]?.textDecoration === 'line-through' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2 line-through">Line Through</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full p-3 flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "textWrap",
                                                                    name: "textWrap",
                                                                    value: "text-wrap"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-3/6 flex items-center px-2 text-xs xl:text-[10px] 2xl:text-xs rounded-md border-2 py-1 ${(optionItem['settings' + viewportState.type]?.textWrap === 'text-wrap' || optionItem['settings' + viewportState.type]?.textWrap === undefined) ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconTextWrap className="flex xl:hidden 2xl:flex"/>
                                                        <span className="px-2">Text Wrap</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "textWrap",
                                                                    name: "textWrap",
                                                                    value: "text-nowrap"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-3/6 flex items-center px-2 text-xs xl:text-[10px] 2xl:text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.textWrap === 'text-nowrap' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span>
                                                                            <IconTextWrapDisabled className="flex xl:hidden 2xl:flex"/>
                                                                        </span>
                                                        <span className="px-2">Text No wrap</span>
                                                    </button>
                                                </div>

                                                <div className="relative my-1 flex h-10 w-full">
                                                    <div
                                                        className="w-[35%] xl:w-[30%] 2xl:w-[35%] flex items-center text-xs justify-start px-2 border-r-[1px] h-full">
                                                        <span className="rotate-90"><IconSpacingVertical className="flex xl:hidden 2xl:flex"/></span>
                                                        <span className="font-bold text-center">Text Align</span>
                                                    </div>
                                                    <div className="flex items-center justify-around w-[65%]">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textAlign",
                                                                        name: "textAlign",
                                                                        value: "text-left"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].textAlign === 'text-left' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Left">
                                                            <IconAlignLeft/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textAlign",
                                                                        name: "textAlign",
                                                                        value: "text-center"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].textAlign === 'text-center' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Center">
                                                            <IconAlignCenter/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textAlign",
                                                                        name: "textAlign",
                                                                        value: "text-right"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].textAlign === 'text-right' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Right">
                                                            <IconAlignRight/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textAlign",
                                                                        name: "textAlign",
                                                                        value: "text-justify"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].textAlign === 'text-justify' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Justify">
                                                            <IconAlignJustified/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "textAlign",
                                                                        name: "textAlign",
                                                                        value: ""
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].textAlign === '' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="NONE">
                                                            <IconSquareX/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                        BACKGROUND SETTINGS
                            */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Background</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="py-2 relative border-l-2 w-full pl-1">
                                                <div className="text-white pb-1 flex justify-center">
                                                    <h4>Background color</h4>
                                                </div>
                                                <div className="flex items-center my-3 px-5 xl:px-1 2xl:px-5 h-10 justify-center">
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setColorOptions({
                                                                    ...colorOptions,
                                                                    backgroundColor: target.value
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "backgroundColor",
                                                                        name: "backgroundColor",
                                                                        value: "bg-[" + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={colorOptions.backgroundColor}
                                                        min={0}
                                                        type="text"
                                                        placeholder="Type a Hex or RGBA Color"
                                                        className="w-full rounded-md text-md xl:text-sm 2xl:text-md h-full appearance-none border-2 text-center focus:outline-none bg-black text-nowrap truncate"/>

                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            backgroundColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "backgroundColor",
                                                                name: "backgroundColor",
                                                                value: "bg-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    format="rgba"
                                                    swatches={colorsUsed}
                                                    value={hexToRgba(colorOptions.backgroundColor)}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Border</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*



                                                    */}
                                                <div
                                                    className="relative h-24 my-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderTop: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderTop",
                                                                            value: "border-t-[" + target.value + borderWidth.borderTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderTop.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderTop: {
                                                                                value: borderWidth.borderTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderTop",
                                                                                value: "border-t-[" + borderWidth.borderTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderTop.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-2/4 bottom-0 -translate-x-2/4 translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderBottom: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderBottom",
                                                                            value: "border-b-[" + target.value + borderWidth.borderBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderBottom: {
                                                                                value: borderWidth.borderBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderBottom",
                                                                                value: "border-b-[" + borderWidth.borderBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span className="absolute text-sm xl:text-[10px] 2xl:text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Borders
                                                    </span>
                                                    <div className="absolute top-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderLeft: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderLeft.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderLeft",
                                                                            value: "border-l-[" + target.value + borderWidth.borderLeft.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderLeft.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderLeft: {
                                                                                value: borderWidth.borderLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderLeft",
                                                                                value: "border-l-[" + borderWidth.borderLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2/4 right-0 translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderRight: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderRight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderRight",
                                                                            value: "border-r-[" + target.value + borderWidth.borderRight.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderRight.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderRight: {
                                                                                value: borderWidth.borderRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderRight",
                                                                                value: "border-r-[" + borderWidth.borderRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconBorderRadius className="flex xl:hidden 2xl:flex"/>
                                                            <span className="text-xs font-bold">Radius</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setRounded({
                                                                        ...rounded,
                                                                        value: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borderRadius",
                                                                            name: "borderRadius",
                                                                            value: "rounded-[" + target.value + rounded.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={rounded.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setRounded({
                                                                        ...rounded,
                                                                        unit: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borderRadius",
                                                                            name: "borderRadius",
                                                                            value: "rounded-[" + rounded.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={rounded.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-white pb-2 flex justify-center">
                                                    <h4>Border color</h4>
                                                </div>
                                                <div className="flex items-center my-2 px-5 xl:px-1 2xl:px-5 h-10 xl:h-8 2xl:h-10 text-md xl:text-sm 2xl:text-md justify-center">
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setColorOptions({
                                                                    ...colorOptions,
                                                                    borderColor: target.value
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "borderColor",
                                                                        name: "borderColor",
                                                                        value: "border-[" + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={colorOptions.borderColor}
                                                        min={0}
                                                        type="text"
                                                        placeholder="Type a Hex or RGBA Color"
                                                        className="w-full rounded-md h-full appearance-none border-2 text-center focus:outline-none bg-black text-nowrap truncate"/>

                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            borderColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "borderColor",
                                                                name: "borderColor",
                                                                value: "border-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    format="rgba"
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    swatches={colorsUsed}
                                                    value={hexToRgba(colorOptions.borderColor)}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Size and spacing</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                */}
                                                <div className="pb-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical className="flex xl:hidden 2xl:flex"/>
                                                            <span className="text-xs font-bold">Height</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        height: {
                                                                            value: target.value,
                                                                            unit: size.height.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "height",
                                                                            value: "h-[" + target.value + size.height.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.height.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        height: {
                                                                            value: size.height.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "height",
                                                                            value: "h-[" + size.height.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.height.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical className="flex xl:hidden 2xl:flex"/>
                                                            <span
                                                                className="text-xs text-center font-bold">Min<br/>Height</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minHeight: {
                                                                            value: target.value,
                                                                            unit: size.minHeight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minHeight",
                                                                            value: "min-h-[" + target.value + size.minHeight.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minHeight?.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minHeight: {
                                                                            value: size.minHeight.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minHeight",
                                                                            value: "min-h-[" + size.minHeight.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minHeight?.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical className="flex xl:hidden 2xl:flex"/>
                                                            <span
                                                                className="text-xs text-center font-bold">Max<br/>Height</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        maxHeight: {
                                                                            value: target.value,
                                                                            unit: size.maxHeight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "maxHeight",
                                                                            value: "max-h-[" + target.value + size.maxHeight.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.maxHeight?.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        maxHeight: {
                                                                            value: size.maxHeight.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "maxHeight",
                                                                            value: "max-h-[" + size.maxHeight.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.maxHeight?.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsHorizontal className="flex xl:hidden 2xl:flex"/>
                                                            <span className="text-xs font-bold">Width</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        width: {
                                                                            value: target.value,
                                                                            unit: size.width.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "width",
                                                                            value: "w-[" + target.value + size.width.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.width?.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        width: {
                                                                            value: size.width.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "width",
                                                                            value: "w-[" + size.width.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.width.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="rotate-90"><IconArrowsVertical className="flex xl:hidden 2xl:flex"/></span>
                                                            <span
                                                                className="text-xs text-center font-bold">Min<br/>Width</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minWidth: {
                                                                            value: target.value,
                                                                            unit: size.minWidth.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minWidth",
                                                                            value: "min-w-[" + target.value + size.minWidth.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minWidth?.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minWidth: {
                                                                            value: size.minWidth.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minWidth",
                                                                            value: "min-w-[" + size.minWidth.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minWidth?.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="rotate-90"><IconArrowsVertical className="flex xl:hidden 2xl:flex"/></span>
                                                            <span
                                                                className="text-xs text-center font-bold">Max<br/>Width</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        maxWidth: {
                                                                            value: target.value,
                                                                            unit: size.maxWidth.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "maxWidth",
                                                                            value: "max-w-[" + target.value + size.maxWidth.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.maxWidth?.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        maxWidth: {
                                                                            value: size.maxWidth.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "maxWidth",
                                                                            value: "max-w-[" + size.maxWidth.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.maxWidth?.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {/*
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                */}
                                                <div
                                                    className="relative h-24 mt-6 mb-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 text-md xl:text-xs 2xl:text-md -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginTop: {
                                                                            value: target.value,
                                                                            unit: margins.marginTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginTop",
                                                                            value: "mt-[" + target.value + margins.marginTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginTop?.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginTop: {
                                                                                value: margins.marginTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginTop",
                                                                                value: "mt-[" + margins.marginTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginTop?.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-2/4 bottom-0 text-md xl:text-xs 2xl:text-md -translate-x-2/4 translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginBottom: {
                                                                            value: target.value,
                                                                            unit: margins.marginBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginBottom",
                                                                            value: "mb-[" + target.value + margins.marginBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginBottom: {
                                                                                value: margins.marginBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginBottom",
                                                                                value: "mb-[" + margins.marginBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span className="absolute text-sm xl:text-[10px] 2xl:text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Margins
                                                        </span>
                                                    <div className="absolute left-0 top-2/4 text-md xl:text-xs 2xl:text-md -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginLeft: {
                                                                            value: target.value,
                                                                            unit: margins.marginLeft.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginLeft",
                                                                            value: "ml-[" + target.value + margins.marginLeft.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginLeft.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginLeft: {
                                                                                value: margins.marginLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginLeft",
                                                                                value: "ml-[" + margins.marginLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute right-0 top-2/4 text-md xl:text-xs 2xl:text-md translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginRight: {
                                                                            value: target.value,
                                                                            unit: margins.marginRight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginRight",
                                                                            value: "mr-[" + target.value + margins.marginRight.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginRight.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginRight: {
                                                                                value: margins.marginRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginRight",
                                                                                value: "mr-[" + margins.marginRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative h-24 mt-12 mb-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingTop: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingTop",
                                                                            value: "pt-[" + target.value + paddings.paddingTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingTop.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingTop: {
                                                                                value: paddings.paddingTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingTop",
                                                                                value: "pt-[" + paddings.paddingTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingTop.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-2/4 bottom-0 -translate-x-2/4 translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingBottom: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingBottom",
                                                                            value: "pb-[" + target.value + paddings.paddingBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingBottom: {
                                                                                value: paddings.paddingBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingBottom",
                                                                                value: "pb-[" + paddings.paddingBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span className="absolute text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Paddings
                                                    </span>
                                                    <div className="absolute top-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input onChange={({target}) => {
                                                                setPaddings({
                                                                    ...paddings,
                                                                    paddingLeft: {
                                                                        value: target.value,
                                                                        unit: paddings.paddingLeft.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "paddings",
                                                                        name: "paddingLeft",
                                                                        value: "pl-[" + target.value + paddings.paddingLeft.unit + "]"
                                                                    }
                                                                })
                                                            }}
                                                                   value={paddings.paddingLeft.value}
                                                                   min={0}
                                                                   type="number"
                                                                   className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingLeft: {
                                                                                value: paddings.paddingLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingLeft",
                                                                                value: "pl-[" + paddings.paddingLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2/4 right-0 translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] text-md xl:text-xs 2xl:text-md border-white h-10 xl:h-8 2xl:h-10 w-20 xl:w-16 2xl:w-20">
                                                            <input onChange={({target}) => {
                                                                setPaddings({
                                                                    ...paddings,
                                                                    paddingRight: {
                                                                        value: target.value,
                                                                        unit: paddings.paddingRight.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "paddings",
                                                                        name: "paddingRight",
                                                                        value: "pr-[" + target.value + paddings.paddingRight.unit + "]"
                                                                    }
                                                                })
                                                            }}
                                                                   value={paddings.paddingRight.value}
                                                                   min={0}
                                                                   type="number"
                                                                   className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingRight: {
                                                                                value: paddings.paddingRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingRight",
                                                                                value: "pr-[" + paddings.paddingRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 xl:w-8 2xl:w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md xl:text-sm 2xl:text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Display and Position</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex flex-wrap items-start w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    */}
                                                <h3 className="text-sm text-center font-bold">Display</h3>
                                                <div className="w-full p-3 flex xl:flex-col 2xl:flex-row justify-center space-x-2 xl:space-x-0 2xl:space-x-2 xl:space-y-2 2xl:space-y-0">
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("hidden")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "display",
                                                                    name: "display",
                                                                    value: "hidden"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 xl:w-full 2xl:w-2/6 flex items-center justify-center px-2 rounded-md border-2 py-1 ${display === 'hidden' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconSquareX/>
                                                        <span className="pl-1">Hidden</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("flex")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "display",
                                                                    name: "display",
                                                                    value: "flex"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 xl:w-full 2xl:w-2/6 flex items-center justify-center px-2 rounded-md border-2 py-1 ${display === 'flex' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconColumns1/>
                                                        <span className="px-2">Flex</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("grid")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "display",
                                                                    name: "display",
                                                                    value: "grid"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 xl:w-full 2xl:w-2/6 flex items-center justify-center px-2 rounded-md border-2 py-1 ${display === 'grid' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconGrid4x4/>
                                                        <span className="px-2">Grid</span>
                                                    </button>
                                                </div>
                                                {
                                                    display === 'flex' ? (
                                                        <>
                                                            <div className="w-full p-2 flex justify-center space-x-3">
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexDirection("flex-col")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "display",
                                                                                name: "flexDirection",
                                                                                value: "flex-col"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center justify-center text-md xl:text-xs 2xl:text-md px-1 rounded-md border-2 py-1 ${flexDirection === 'flex-col' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                    <IconArrowsUpDown className="flex xl:hidden 2xl:flex"/>
                                                                    <span className="px-2">Flex Col</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexDirection("flex-row")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "display",
                                                                                name: "flexDirection",
                                                                                value: "flex-row"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center justify-center text-md xl:text-xs 2xl:text-md px-1 rounded-md border-2 py-1 ${flexDirection === 'flex-row' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="rotate-90">
                                                                    <IconArrowsUpDown className="flex xl:hidden 2xl:flex"/>
                                                                </span>
                                                                    <span className="px-2">Flex Row</span>
                                                                </button>
                                                            </div>
                                                            <div className="w-full p-2 flex justify-center space-x-3">
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexWrap("flex-wrap")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "wrap",
                                                                                name: "flexWrap",
                                                                                value: "flex-wrap"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center justify-center text-md xl:text-xs 2xl:text-md px-1 rounded-md border-2 py-1 ${flexWrap === 'flex-wrap' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                    <IconTextWrap className="flex xl:hidden 2xl:flex"/>
                                                                    <span className="px-2">Wrap</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexWrap("flex-nowrap")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "wrap",
                                                                                name: "flexWrap",
                                                                                value: "flex-nowrap"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center justify-center text-md xl:text-xs 2xl:text-md px-1 rounded-md border-2 py-1 ${flexWrap === 'flex-nowrap' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span>
                                                                            <IconTextWrapDisabled className="flex xl:hidden 2xl:flex"/>
                                                                        </span>
                                                                    <span className="px-2">No wrap</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : ''
                                                }
                                                {
                                                    display === 'grid' ? (
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div
                                                                className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Cols</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGridTemplate({
                                                                                ...gridTemplate,
                                                                                gridCols: target.value
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gridCols",
                                                                                    name: "gridCols",
                                                                                    value: "grid-cols-" + target.value
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gridTemplate.gridCols}
                                                                    min={0}
                                                                    max={12}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            </div>
                                                            <div
                                                                className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Rows</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGridTemplate({
                                                                                ...gridTemplate,
                                                                                gridRows: target.value
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gridRows",
                                                                                    name: "gridRows",
                                                                                    value: "grid-rows-" + target.value
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gridTemplate.gridRows}
                                                                    min={0}
                                                                    max={12}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            </div>
                                                            <div className="relative col-span-2 flex flex-wrap rounded-md">
                                                                <div className="w-2/4 xl:w-full 2xl:w-2/4 p-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "placeItems",
                                                                                    name: "placeItems",
                                                                                    value: "place-items-start"
                                                                                }
                                                                            })
                                                                        }}
                                                                        className={`w-full h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${(optionItem['settings' + viewportState.type]?.placeItems === undefined || optionItem['settings' + viewportState.type]?.placeItems === 'place-items-start') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span className="px-2">Place Items Start</span>
                                                                    </button>
                                                                </div>
                                                                <div className="w-2/4 xl:w-full 2xl:w-2/4 p-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "placeItems",
                                                                                    name: "placeItems",
                                                                                    value: "place-items-center"
                                                                                }
                                                                            })
                                                                        }}
                                                                        className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.placeItems === 'place-items-center' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span className="px-2">Place Items Center</span>
                                                                    </button>
                                                                </div>
                                                                <div className="w-2/4 xl:w-full 2xl:w-2/4 p-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "placeItems",
                                                                                    name: "placeItems",
                                                                                    value: "place-items-end"
                                                                                }
                                                                            })
                                                                        }}
                                                                        className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.placeItems === 'place-items-end' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span className="px-2">Place Items End</span>
                                                                    </button>
                                                                </div>
                                                                <div className="w-2/4 xl:w-full 2xl:w-2/4 p-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "placeItems",
                                                                                    name: "placeItems",
                                                                                    value: "place-items-stretch"
                                                                                }
                                                                            })
                                                                        }}
                                                                        className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.placeItems === 'place-items-stretch' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                        <span className="px-2">Place Items Stretch</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : ''
                                                }
                                                <div
                                                    className="relative my-2 flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                    <div
                                                        className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                        <span className="text-[12px] font-bold">Gap X</span>
                                                    </div>
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setGaps({
                                                                    ...gaps,
                                                                    gapX: {
                                                                        value: target.value,
                                                                        unit: gaps.gapX?.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "gaps",
                                                                        name: "gapX",
                                                                        value: "gap-x-[" + target.value + gaps.gapX?.unit + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={gaps.gapX?.value}
                                                        min={0}
                                                        type="number"
                                                        className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                    <select
                                                        onChange={
                                                            ({target}) => {
                                                                setGaps({
                                                                    ...gaps,
                                                                    gapX: {
                                                                        value: gaps.gapX?.value,
                                                                        unit: target.value
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "gaps",
                                                                        name: "gapX",
                                                                        value: "gap-x-[" + gaps.gapX?.value + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={gaps.gapX?.unit}
                                                        className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                        name="" id="">
                                                        {
                                                            units.map((unit, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                value={unit}>{unit}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div
                                                    className="relative my-2 flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                    <div
                                                        className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                        <span className="text-[12px] font-bold">Gap Y</span>
                                                    </div>
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setGaps({
                                                                    ...gaps,
                                                                    gapY: {
                                                                        value: target.value,
                                                                        unit: gaps.gapY?.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "gaps",
                                                                        name: "gapY",
                                                                        value: "gap-y-[" + target.value + gaps.gapY?.unit + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={gaps.gapY?.value}
                                                        min={0}
                                                        type="number"
                                                        className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                    <select
                                                        onChange={
                                                            ({target}) => {
                                                                setGaps({
                                                                    ...gaps,
                                                                    gapY: {
                                                                        value: gaps.gapY?.value,
                                                                        unit: target.value
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "gaps",
                                                                        name: "gapY",
                                                                        value: "gap-y-[" + gaps.gapY?.value + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={gaps.gapY?.unit}
                                                        className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                        name="" id="">
                                                        {
                                                            units.map((unit, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                value={unit}>{unit}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div
                                                    className="relative my-2 flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                    <div
                                                        className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                        <span className="text-[12px] font-bold">Space X</span>
                                                    </div>
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setSpaces({
                                                                    ...spaces,
                                                                    spaceX: {
                                                                        value: target.value,
                                                                        unit: spaces.spaceX?.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "spaces",
                                                                        name: "spaceX",
                                                                        value: "space-x-[" + target.value + spaces.spaceX?.unit + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={spaces.spaceX?.value}
                                                        min={0}
                                                        type="number"
                                                        className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                    <select
                                                        onChange={
                                                            ({target}) => {
                                                                setSpaces({
                                                                    ...spaces,
                                                                    spaceX: {
                                                                        value: spaces.spaceX?.value,
                                                                        unit: target.value
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "spaces",
                                                                        name: "spaceX",
                                                                        value: "space-x-[" + spaces.spaceX?.value + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={spaces.spaceX?.unit}
                                                        className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                        name="" id="">
                                                        {
                                                            units.map((unit, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                value={unit}>{unit}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div
                                                    className="relative my-2 flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                    <div
                                                        className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                        <span className="text-[12px] font-bold">Space Y</span>
                                                    </div>
                                                    <input
                                                        onChange={
                                                            ({target}) => {
                                                                setSpaces({
                                                                    ...spaces,
                                                                    spaceY: {
                                                                        value: target.value,
                                                                        unit: spaces.spaceY?.unit
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "spaces",
                                                                        name: "spaceY",
                                                                        value: "space-y-[" + target.value + spaces.spaceY?.unit + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={spaces.spaceY?.value}
                                                        min={0}
                                                        type="number"
                                                        className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                    <select
                                                        onChange={
                                                            ({target}) => {
                                                                setSpaces({
                                                                    ...spaces,
                                                                    spaceY: {
                                                                        value: spaces.spaceY?.value,
                                                                        unit: target.value
                                                                    }
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "spaces",
                                                                        name: "spaceY",
                                                                        value: "space-y-[" + spaces.spaceY?.value + target.value + "]"
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        value={spaces.spaceY?.unit}
                                                        className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                        name="" id="">
                                                        {
                                                            units.map((unit, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                value={unit}>{unit}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                {/*
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    */}
                                                <div className="relative my-2 flex xl:flex-wrap 2xl:flex-nowrap h-10 xl:h-20 2xl:h-10 w-full">
                                                    <div className="w-[30%] xl:w-full 2xl:w-[35%] flex items-center text-xs justify-start xl:justify-center px-2 border-r-[1px] xl:border-r-0 2xl:border-r-[1px] h-full xl:h-10 2xl:h-full">
                                                        <IconSpacingVertical/>
                                                        <span className="font-bold">Align</span>
                                                    </div>
                                                    <div className="flex items-center justify-around w-[65%] xl:w-full 2xl:w-[70%]">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: "items-start"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === 'items-start' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Top">
                                                            <IconAlignBoxCenterTop/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: "items-center"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === 'items-center' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Center">
                                                            <IconAlignBoxCenterMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: "items-end"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === 'items-end' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Bottom">
                                                            <IconAlignBoxCenterBottom/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: "items-stretch"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === 'items-stretch' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Stretch">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: "items-baseline"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === 'items-baseline' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Baseline">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "itemsAlign",
                                                                        name: "itemsAlign",
                                                                        value: ""
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].itemsAlign === '' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="NONE">
                                                            <IconSquareX/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="relative my-2 flex xl:flex-wrap 2xl:flex-nowrap h-10 xl:h-20 2xl:h-10 w-full">
                                                    <div className="w-[30%] xl:w-full 2xl:w-[35%] flex items-center text-xs justify-start xl:justify-center px-2 border-r-[1px] xl:border-r-0 2xl:border-r-[1px] h-full xl:h-10 2xl:h-full">
                                                        <IconSpacingHorizontal/>
                                                        <span className="font-bold">Justify</span>
                                                    </div>
                                                    <div className="flex items-center justify-around w-[65%] xl:w-full 2xl:w-[70%]">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-start"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-start' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Left">
                                                            <IconAlignBoxLeftMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-center"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-center' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Center">
                                                            <IconAlignBoxCenterMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-end"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-end' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Right">
                                                            <IconAlignBoxRightMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-around"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-around' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Around">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-between"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-between' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Between">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: "justify-evenly"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewportState.type].justifyContent === 'justify-evenly' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Evenly">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "justifyContent",
                                                                        name: "justifyContent",
                                                                        value: ""
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewportState.type].justifyContent === '' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="NONE">
                                                            <IconSquareX/>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/*
                                                    OVERFLOW
                                                    OVERFLOW
                                                    OVERFLOW
                                                    OVERFLOW
                                                    OVERFLOW
                                                    OVERFLOW
                                                    OVERFLOW
                                                    */}


                                                <h3 className="text-sm text-center font-bold">Overflow</h3>
                                                <div className="w-full p-3 flex flex-wrap">
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "overflow",
                                                                        name: "overflow",
                                                                        value: "overflow-auto"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${(optionItem['settings' + viewportState.type]?.overflow === undefined || optionItem['settings' + viewportState.type]?.overflow === 'overflow-auto') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Auto</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "overflow",
                                                                        name: "overflow",
                                                                        value: "overflow-hidden"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.overflow === 'overflow-hidden' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Hidden</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "overflow",
                                                                        name: "overflow",
                                                                        value: "overflow-visible"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.overflow === 'overflow-visible' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Visible</span>
                                                        </button>
                                                    </div>
                                                    <div className="w-2/4 p-1">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "overflow",
                                                                        name: "overflow",
                                                                        value: "overflow-scroll"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-full h-10 flex items-center justify-center font-bold px-2 text-xs rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type]?.overflow === 'overflow-scroll' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Scroll</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/*
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    */}
                                                <h3 className="text-sm text-center font-bold">Position</h3>
                                                <div className="w-full p-3 grid grid-cols-2 justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "relative"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-full flex items-center justify-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type].position === 'relative' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Relative</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "absolute"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-full flex items-center justify-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type].position === 'absolute' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Absolute</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "sticky"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-full flex items-center justify-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type].position === 'sticky' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Sticky</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "static"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-full flex items-center justify-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewportState.type].position === 'static' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Static</span>
                                                    </button>
                                                </div>
                                                {/*
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        */}
                                                <div className="grid grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-2">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Top</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        top: {
                                                                            value: target.value,
                                                                            unit: positions.top.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "top",
                                                                            name: "top",
                                                                            value: "top-[" + target.value + positions.top.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.top.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        top: {
                                                                            value: positions.top.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "top",
                                                                            name: "top",
                                                                            value: "top-[" + positions.top.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.top.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Bottom</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        bottom: {
                                                                            value: target.value,
                                                                            unit: positions.bottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "bottom",
                                                                            name: "bottom",
                                                                            value: "bottom-[" + target.value + positions.bottom.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.bottom.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        bottom: {
                                                                            value: positions.bottom.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "bottom",
                                                                            name: "bottom",
                                                                            value: "bottom-[" + positions.bottom.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.bottom.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Left</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        left: {
                                                                            value: target.value,
                                                                            unit: positions.left.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "left",
                                                                            name: "left",
                                                                            value: "left-[" + target.value + positions.left.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.left.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        left: {
                                                                            value: positions.left.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "left",
                                                                            name: "left",
                                                                            value: "left-[" + positions.left.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.left.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Right</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        right: {
                                                                            value: target.value,
                                                                            unit: positions.right.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "right",
                                                                            name: "right",
                                                                            value: "right-[" + target.value + positions.right.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.right.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        right: {
                                                                            value: positions.right.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "right",
                                                                            name: "right",
                                                                            value: "right-[" + positions.right.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.right.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 xl:h-6 2xl:h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {/*
                                                        Z INDEX
                                                        Z INDEX
                                                        Z INDEX
                                                        Z INDEX
                                                        Z INDEX
                                                        Z INDEX
                                                        Z INDEX
                                                        */}
                                                <div className="grid grid-cols-1 gap-2 my-2">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 xl:h-8 2xl:h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Z Index</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setZIndex(target.value)
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "zIndex",
                                                                            name: "zIndex",
                                                                            value: "z-[" + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={zIndex}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 text-nowrap truncate"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        IMAGE
                        IMAGE
                        IMAGE
                        IMAGE
                        IMAGE
                        IMAGE
                        IMAGE
                        */}
                        {optionItem.hasOwnProperty("src") ? (
                            <Disclosure as="div" className="border-white pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"border-2 rounded-md py-1 xl:py-0 2xl:py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Image</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <IconChevronUp />
                                                              ) : (
                                                                  <IconChevronDown />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex flex-wrap items-start w-full">
                                                <div className="border-l-2 w-full pl-1 pt-2">
                                                    {/*
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    OBJECT FIT
                                                    */}
                                                    <h3 className="text-sm text-center font-bold">Object Fit</h3>
                                                    <div className="w-full p-3 flex flex-wrap">
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectFit",
                                                                            name: "objectFit",
                                                                            value: "object-none"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${(optionItem['settings' + viewportState.type]?.objectFit === undefined || optionItem['settings' + viewportState.type]?.objectFit === 'object-none') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">None</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectFit",
                                                                            name: "objectFit",
                                                                            value: "object-cover"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectFit === 'object-cover' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Cover</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectFit",
                                                                            name: "objectFit",
                                                                            value: "object-contain"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectFit === 'object-contain' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Contain</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectFit",
                                                                            name: "objectFit",
                                                                            value: "object-fill"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectFit === 'object-fill' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Fill</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/*
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    OBJECT POSITION
                                                    */}
                                                    <h3 className="text-sm text-center font-bold">Object Position</h3>
                                                    <div className="w-full p-3 flex flex-wrap">
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: ""
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${(optionItem['settings' + viewportState.type]?.objectPosition === undefined || optionItem['settings' + viewportState.type]?.objectPosition === '') ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">None</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-top"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-top' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Top</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-bottom"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-bottom' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Bottom</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-right"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 2xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-right' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Right</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-left"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-left' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Left</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-center"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-center' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Center</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-left-top"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-left-top' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Left Top</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-left-bottom"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-left-bottom' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Left Bottom</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-right-top"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-right-top' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Right Top</span>
                                                            </button>
                                                        </div>
                                                        <div className="w-2/4 p-1">
                                                            <button
                                                                onClick={() => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "objectPosition",
                                                                            name: "objectPosition",
                                                                            value: "object-right-bottom"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`w-full h-10 xl:h-8 2xl:h-10 flex py-2 items-center justify-center font-bold px-2 text-xs rounded-md border-2 ${optionItem['settings' + viewportState.type]?.objectPosition === 'object-right-bottom' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="px-2">Right Bottom</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : ''}
                    </>
                ) : ""
                }
            </div>
        ) :
        (
            <Disclosure as="div" className="border-white py-5">
                <p className="text-white text-center px-2">
                    Select an item from <br/>Components to see the settings
                </p>
            </Disclosure>
        ))

    function updateOptionItem(newOption) {
        setOptionItem(newOption)
        if (newOption !== undefined) {
            setColorOptions({
                textColor: newOption['settings' + viewportState.type].textColor?.split("-")[1].replace("[", "").replace("]", ""),
                borderColor: newOption['settings' + viewportState.type].borderColor?.split("-")[1].replace("[", "").replace("]", ""),
                backgroundColor: newOption['settings' + viewportState.type].backgroundColor?.split("-")[1].replace("[", "").replace("]", ""),
                decorationColor: newOption['settings' + viewportState.type].decorationColor?.split("-")[1].replace("[", "").replace("]", ""),
            })
            setSpecificAttributes({
                text: newOption?.text,
                src: newOption?.src,
                alt: newOption?.alt,
                href: newOption?.href,
                idHTML: newOption?.idHTML,
                nameHTML: newOption?.nameHTML
            })

            setBorderWidth({
                borderRight: {
                    value: newOption['settings' + viewportState.type].borderRight?.match(/\d+/g) ? newOption['settings' + viewportState.type].borderRight.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].borderRight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderLeft: {
                    value: newOption['settings' + viewportState.type].borderLeft?.match(/\d+/g) ? newOption['settings' + viewportState.type].borderLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].borderLeft?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderTop: {
                    value: newOption['settings' + viewportState.type].borderTop?.match(/\d+/g) ? newOption['settings' + viewportState.type].borderTop.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].borderTop?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderBottom: {
                    value: newOption['settings' + viewportState.type].borderBottom?.match(/\d+/g) ? newOption['settings' + viewportState.type].borderBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].borderBottom?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setPaddings({
                paddingRight: {
                    value: newOption['settings' + viewportState.type].paddingRight?.match(/\d+/g) ? newOption['settings' + viewportState.type].paddingRight.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].paddingRight?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingLeft: {
                    value: newOption['settings' + viewportState.type].paddingLeft?.match(/\d+/g) ? newOption['settings' + viewportState.type].paddingLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].paddingLeft?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingTop: {
                    value: newOption['settings' + viewportState.type].paddingTop?.match(/\d+/g) ? newOption['settings' + viewportState.type].paddingTop.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].paddingTop?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingBottom: {
                    value: newOption['settings' + viewportState.type].paddingBottom?.match(/\d+/g) ? newOption['settings' + viewportState.type].paddingBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].paddingBottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setMargins({
                marginRight: {
                    value: newOption['settings' + viewportState.type].marginRight?.match(/\d+/g) ? newOption['settings' + viewportState.type].marginRight.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].marginRight?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginLeft: {
                    value: newOption['settings' + viewportState.type].marginLeft?.match(/\d+/g) ? newOption['settings' + viewportState.type].marginLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].marginLeft?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginTop: {
                    value: newOption['settings' + viewportState.type].marginTop?.match(/\d+/g) ? newOption['settings' + viewportState.type].marginTop.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].marginTop?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginBottom: {
                    value: newOption['settings' + viewportState.type].marginBottom?.match(/\d+/g) ? newOption['settings' + viewportState.type].marginBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].marginBottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setSize({
                width: {
                    value: newOption['settings' + viewportState.type].width?.match(/\d+/g) ? newOption['settings' + viewportState.type].width.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].width?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minWidth: {
                    value: newOption['settings' + viewportState.type].minWidth?.match(/\d+/g) ? newOption['settings' + viewportState.type].minWidth.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].minWidth?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                maxWidth: {
                    value: newOption['settings' + viewportState.type].maxWidth?.match(/\d+/g) ? newOption['settings' + viewportState.type].maxWidth.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].maxWidth?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                height: {
                    value: newOption['settings' + viewportState.type].height?.match(/\d+/g) ? newOption['settings' + viewportState.type].height.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].height?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minHeight: {
                    value: newOption['settings' + viewportState.type].minHeight?.match(/\d+/g) ? newOption['settings' + viewportState.type].minHeight.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].minHeight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                maxHeight: {
                    value: newOption['settings' + viewportState.type].maxHeight?.match(/\d+/g) ? newOption['settings' + viewportState.type].maxHeight.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].maxHeight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setRounded({
                value: newOption['settings' + viewportState.type].borderRadius?.match(/\d+/g) ? newOption['settings' + viewportState.type].borderRadius.match(/\d+/g).map(Number)[0] : "",
                unit: newOption['settings' + viewportState.type].borderRadius?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setFontSize({
                value: newOption['settings' + viewportState.type]?.textSize?.match(/\d+/g) ? newOption['settings' + viewportState.type].textSize.match(/\d+/g).map(Number)[0] : "",
                unit: newOption['settings' + viewportState.type]?.textSize?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setDisplay(newOption['settings' + viewportState.type]?.display)
            setFlexDirection(newOption['settings' + viewportState.type]?.flexDirection)
            setFlexWrap(newOption['settings' + viewportState.type]?.flexWrap)
            setPositions({
                top: {
                    value: newOption['settings' + viewportState.type].top?.match(/\d+/g) ? newOption['settings' + viewportState.type].top.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].top?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                left: {
                    value: newOption['settings' + viewportState.type].left?.match(/\d+/g) ? newOption['settings' + viewportState.type].left.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].left?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                right: {
                    value: newOption['settings' + viewportState.type].right?.match(/\d+/g) ? newOption['settings' + viewportState.type].right.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].right?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                bottom: {
                    value: newOption['settings' + viewportState.type].bottom?.match(/\d+/g) ? newOption['settings' + viewportState.type].bottom.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].bottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setGaps({
                gapX: {
                    value: newOption['settings' + viewportState.type].gapX?.match(/\d+/g) ? newOption['settings' + viewportState.type].gapX?.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].gapX?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                gapY: {
                    value: newOption['settings' + viewportState.type].gapY?.match(/\d+/g) ? newOption['settings' + viewportState.type].gapY?.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].gapY?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setSpaces({
                spaceX: {
                    value: newOption['settings' + viewportState.type].spaceX?.match(/\d+/g) ? newOption['settings' + viewportState.type].spaceX?.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].spaceX?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                spaceY: {
                    value: newOption['settings' + viewportState.type].spaceY?.match(/\d+/g) ? newOption['settings' + viewportState.type].spaceY?.match(/\d+/g).map(Number)[0] : "",
                    unit: newOption['settings' + viewportState.type].spaceY?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setGridTemplate({
                gridCols: newOption['settings' + viewportState.type].gridCols?.match(/\d+/g) ? newOption['settings' + viewportState.type].gridCols?.match(/\d+/g).map(Number)[0] : "",
                gridRows: newOption['settings' + viewportState.type].gridRows?.match(/\d+/g) ? newOption['settings' + viewportState.type].gridRows?.match(/\d+/g).map(Number)[0] : ""
            })
            setZIndex(newOption['settings' + viewportState.type]?.zIndex?.match(/\d+/g) ? newOption['settings' + viewportState.type].zIndex?.match(/\d+/g).map(Number)[0] : "")

        }
    }
    function updateViewport(newViewport) {
        setViewportState(newViewport)
        if (optionItem !== undefined) {
            setColorOptions({
                textColor: optionItem['settings' + newViewport.type].textColor?.split("-")[1].replace("[", "").replace("]", ""),
                borderColor: optionItem['settings' + newViewport.type].borderColor?.split("-")[1].replace("[", "").replace("]", ""),
                backgroundColor: optionItem['settings' + newViewport.type].backgroundColor?.split("-")[1].replace("[", "").replace("]", ""),
                decorationColor: optionItem['settings' + newViewport.type].decorationColor?.split("-")[1].replace("[", "").replace("]", ""),
            })
            setSpecificAttributes({
                text: optionItem?.text,
                src: optionItem?.src,
                alt: optionItem?.alt,
                href: optionItem?.href,
                idHTML: optionItem?.idHTML,
                nameHTML: optionItem?.nameHTML,
            })

            setBorderWidth({
                borderRight: {
                    value: optionItem['settings' + newViewport.type].borderRight?.match(/\d+/g) ? optionItem['settings' + newViewport.type].borderRight.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].borderRight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderLeft: {
                    value: optionItem['settings' + newViewport.type].borderLeft?.match(/\d+/g) ? optionItem['settings' + newViewport.type].borderLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].borderLeft?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderTop: {
                    value: optionItem['settings' + newViewport.type].borderTop?.match(/\d+/g) ? optionItem['settings' + newViewport.type].borderTop.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].borderTop?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderBottom: {
                    value: optionItem['settings' + newViewport.type].borderBottom?.match(/\d+/g) ? optionItem['settings' + newViewport.type].borderBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].borderBottom?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setPaddings({
                paddingRight: {
                    value: optionItem['settings' + newViewport.type].paddingRight?.match(/\d+/g) ? optionItem['settings' + newViewport.type].paddingRight.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].paddingRight?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingLeft: {
                    value: optionItem['settings' + newViewport.type].paddingLeft?.match(/\d+/g) ? optionItem['settings' + newViewport.type].paddingLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].paddingLeft?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingTop: {
                    value: optionItem['settings' + newViewport.type].paddingTop?.match(/\d+/g) ? optionItem['settings' + newViewport.type].paddingTop.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].paddingTop?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingBottom: {
                    value: optionItem['settings' + newViewport.type].paddingBottom?.match(/\d+/g) ? optionItem['settings' + newViewport.type].paddingBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].paddingBottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setMargins({
                marginRight: {
                    value: optionItem['settings' + newViewport.type].marginRight?.match(/\d+/g) ? optionItem['settings' + newViewport.type].marginRight.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].marginRight?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginLeft: {
                    value: optionItem['settings' + newViewport.type].marginLeft?.match(/\d+/g) ? optionItem['settings' + newViewport.type].marginLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].marginLeft?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginTop: {
                    value: optionItem['settings' + newViewport.type].marginTop?.match(/\d+/g) ? optionItem['settings' + newViewport.type].marginTop.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].marginTop?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginBottom: {
                    value: optionItem['settings' + newViewport.type].marginBottom?.match(/\d+/g) ? optionItem['settings' + newViewport.type].marginBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].marginBottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setSize({
                width: {
                    value: optionItem['settings' + newViewport.type].width?.match(/\d+/g) ? optionItem['settings' + newViewport.type].width.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].width?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minWidth: {
                    value: optionItem['settings' + newViewport.type].minWidth?.match(/\d+/g) ? optionItem['settings' + newViewport.type].minWidth.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].minWidth?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                maxWidth: {
                    value: optionItem['settings' + newViewport.type].maxWidth?.match(/\d+/g) ? optionItem['settings' + newViewport.type].maxWidth.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].maxWidth?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                height: {
                    value: optionItem['settings' + newViewport.type].height?.match(/\d+/g) ? optionItem['settings' + newViewport.type].height.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].height?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minHeight: {
                    value: optionItem['settings' + newViewport.type].minHeight?.match(/\d+/g) ? optionItem['settings' + newViewport.type].minHeight.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].minHeight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                maxHeight: {
                    value: optionItem['settings' + newViewport.type].maxHeight?.match(/\d+/g) ? optionItem['settings' + newViewport.type].maxHeight.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].maxHeight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setRounded({
                value: optionItem['settings' + newViewport.type].borderRadius?.match(/\d+/g) ? optionItem['settings' + newViewport.type].borderRadius.match(/\d+/g).map(Number)[0] : "",
                unit: optionItem['settings' + newViewport.type].borderRadius?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setFontSize({
                value: optionItem['settings' + newViewport.type]?.textSize?.match(/\d+/g) ? optionItem['settings' + newViewport.type].textSize.match(/\d+/g).map(Number)[0] : "",
                unit: optionItem['settings' + newViewport.type]?.textSize?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setDisplay(optionItem['settings' + newViewport.type]?.display)
            setFlexDirection(optionItem['settings' + newViewport.type]?.flexDirection)
            setFlexWrap(optionItem['settings' + newViewport.type]?.flexWrap)
            setPositions({
                top: {
                    value: optionItem['settings' + newViewport.type].top?.match(/\d+/g) ? optionItem['settings' + newViewport.type].top.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].top?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                left: {
                    value: optionItem['settings' + newViewport.type].left?.match(/\d+/g) ? optionItem['settings' + newViewport.type].left.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].left?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                right: {
                    value: optionItem['settings' + newViewport.type].right?.match(/\d+/g) ? optionItem['settings' + newViewport.type].right.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].right?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                bottom: {
                    value: optionItem['settings' + newViewport.type].bottom?.match(/\d+/g) ? optionItem['settings' + newViewport.type].bottom.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].bottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setGaps({
                gapX: {
                    value: optionItem['settings' + newViewport.type].gapX?.match(/\d+/g) ? optionItem['settings' + newViewport.type].gapX?.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].gapX?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                gapY: {
                    value: optionItem['settings' + newViewport.type].gapY?.match(/\d+/g) ? optionItem['settings' + newViewport.type].gapY?.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].gapY?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setSpaces({
                spaceX: {
                    value: optionItem['settings' + newViewport.type].spaceX?.match(/\d+/g) ? optionItem['settings' + newViewport.type].spaceX?.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].spaceX?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                spaceY: {
                    value: optionItem['settings' + newViewport.type].spaceY?.match(/\d+/g) ? optionItem['settings' + newViewport.type].spaceY?.match(/\d+/g).map(Number)[0] : "",
                    unit: optionItem['settings' + newViewport.type].spaceY?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setGridTemplate({
                gridCols: optionItem['settings' + newViewport.type].gridCols?.match(/\d+/g) ? optionItem['settings' + newViewport.type].gridCols?.match(/\d+/g).map(Number)[0] : "",
                gridRows: optionItem['settings' + newViewport.type].gridRows?.match(/\d+/g) ? optionItem['settings' + newViewport.type].gridRows?.match(/\d+/g).map(Number)[0] : ""
            })
            setZIndex(optionItem['settings' + newViewport.type]?.zIndex?.match(/\d+/g) ? optionItem['settings' + newViewport.type].zIndex?.match(/\d+/g).map(Number)[0] : "")

        }
    }
};
