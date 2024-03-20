import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
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
    IconColumns1, IconGrid4x4, IconTextIncrease, IconSquareX
} from '@tabler/icons-react';
import {ColorInput, ColorPicker, NumberInput, Select} from "@mantine/core";
import {useSelector} from "react-redux";

export const Options = ({options, modifyItemsDashboard, viewport, keepOptions}) => {

    const colors = ['transparent', 'white', 'black', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    const sizes = ['xs', 'base', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const radius = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
    const units = ['px', 'rem', 'vw', 'vh', '%', ''];

    const onChangeInput = ({target}) => {
        let option = optionItem;
        switch (target.id) {
            case 'valueInput':
                setValueInput(target.value)
                option = {
                    ...optionItem,
                    value: target.value
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            default:
                if(keepOptions) {
                    console.log("keepOptions: " + keepOptions)
                    option = {
                        ...optionItem,
                        settingsMobile: {...optionItem.settingsMobile, [target.name]: target.value},
                        settingsTablet: {...optionItem.settingsTablet, [target.name]: target.value},
                        settingsLaptop: {...optionItem.settingsLaptop, [target.name]: target.value},
                        settingsDesktop: {...optionItem.settingsDesktop, [target.name]: target.value},
                        settingsTV: {...optionItem.settingsTV, [target.name]: target.value}
                    }
                    console.log(option)
                    setOptionItem(option)
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                } else {
                    option = {
                        ...optionItem,
                        ['settings' + viewport.type]: {
                            ...optionItem['settings' + viewport.type],
                            [target.name]: target.value
                        }
                    }
                    setOptionItem(option)
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                }
                break
        }
    }

    useEffect(() => {
        setOptionItem(options);
        if (options !== undefined) {
                setColorOptions({
                    textColor: options['settings' + viewport.type].textColor.split("-")[1].replace("[", "").replace("]", ""),
                    borderColor: options['settings' + viewport.type].borderColor.split("-")[1].replace("[", "").replace("]", ""),
                    backgroundColor: options['settings' + viewport.type].backgroundColor.split("-")[1].replace("[", "").replace("]", ""),
                    decorationColor: options['settings' + viewport.type].decorationColor.split("-")[1].replace("[", "").replace("]", ""),
                })
            if (options.hasOwnProperty("value")) {
                setValueInput(options.value)
            }

            setBorderWidth({
                borderRight: options['settings' + viewport.type].borderRight,
                borderLeft: options['settings' + viewport.type].borderLeft,
                borderTop: options['settings' + viewport.type].borderTop,
                borderBottom: options['settings' + viewport.type].borderBottom
            })
            setPaddings({
                paddingRight: options['settings' + viewport.type].paddingRight,
                paddingLeft: options['settings' + viewport.type].paddingLeft,
                paddingTop: options['settings' + viewport.type].paddingTop,
                paddingBottom: options['settings' + viewport.type].paddingBottom
            })
            setMargins({
                marginRight: options['settings' + viewport.type].marginRight,
                marginLeft: options['settings' + viewport.type].marginLeft,
                marginTop: options['settings' + viewport.type].marginTop,
                marginBottom: options['settings' + viewport.type].marginBottom
            })
            setSize({
                width: {
                    value: options['settings' + viewport.type].width.match(/\d+/g) ? options['settings' + viewport.type].width.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].width.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                height: {
                    value: options['settings' + viewport.type].height.match(/\d+/g) ? options['settings' + viewport.type].height.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].height.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setRounded({
                value: options['settings' + viewport.type].borderRadius.match(/\d+/g) ? options['settings' + viewport.type].borderRadius.match(/\d+/g).map(Number)[0] : "",
                unit: options['settings' + viewport.type].borderRadius.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setFontSize({
                value: options['settings' + viewport.type].textSize.match(/\d+/g) ? options['settings' + viewport.type].textSize.match(/\d+/g).map(Number)[0] : "",
                unit: options['settings' + viewport.type].textSize.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })

        }
    }, [options]);

    const [optionItem, setOptionItem] = useState(options);
    const [colorOptions, setColorOptions] = useState(
        {
        }
    )
    const [valueInput, setValueInput] = useState()
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
    const [colorsUsed, setColorsUsed] = useState([])


    return optionItem !== undefined ? (
            <div className="py-2 pr-2">
                {optionItem.hasOwnProperty("settings" + viewport.type) ? (
                    <>
                        {optionItem.hasOwnProperty("value") ? (
                            <Disclosure as="div" className="border-white pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Text</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
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
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                                <IconCursorText />
                                                                <span className="text-xs font-bold">Value</span>
                                                            </div>
                                                            <input
                                                                onChange={onChangeInput} onKeyUp={onChangeInput}
                                                                name="value"
                                                                id="valueInput"
                                                                value={valueInput}
                                                                min={0}
                                                                type="text" className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        </div>
                                                    </div>
                                                    <div className="py-2 flex items-center relative h-max">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                                <IconTextIncrease />
                                                                <span className="text-[12px] font-bold">Font Size</span>
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
                                                                type="number" className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="text-white py-2 flex justify-center">
                                                        <h4>Font color</h4>
                                                    </div>
                                                    <ColorPicker
                                                        fullWidth
                                                        onChange={ (value) => {
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
                                                        onChangeEnd={ (value) => {
                                                            colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                        }}
                                                        swatches={colorsUsed}
                                                        defaultValue={colorOptions.textColor}
                                                        classNames={{
                                                            input: "bg-black text-white "
                                                        }}
                                                    />
                                                    <label className="text-white" htmlFor="FontWeight">Font Weight</label>
                                                    <select onChange={onChangeInput} value={optionItem['settings' + viewport.type].textWeight}
                                                            id="FontWeight" name="textWeight"
                                                            className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-black text-white px-1 w-full focus:outline-none">
                                                        <option value="font-light">Light</option>
                                                        <option value="font-normal">Normal</option>
                                                        <option value="font-medium">Medium</option>
                                                        <option value="font-semibold">Semibold</option>
                                                        <option value="font-bold">Bold</option>
                                                        <option value="font-extrabold">Extrabold</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : null}
                        {optionItem['settings' + viewport.type].hasOwnProperty("backgroundColor") ? (
                            <Disclosure as="div" className="border-white pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Background</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="py-2 relative border-l-2 w-full pl-1">
                                                    <div className="text-white pb-2 flex justify-center">
                                                        <h4>Background color</h4>
                                                    </div>
                                                    <ColorPicker
                                                        fullWidth
                                                        onChange={ (value) => {
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
                                                        onChangeEnd={ (value) => {
                                                            colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                        }}
                                                        format="rgba"
                                                        swatches={colorsUsed}
                                                        defaultValue={colorOptions.backgroundColor}
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
                        ) : null}
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
                                                className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Border</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
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
                                                    <p className="text-white text-center mb-4">Borders width</p>
                                                    <div className="relative h-10 mt-2 mb-5 mx-auto w-2/4 border-2 border-gray-500 rounded-md">

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderTop: "border-l-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderTop",
                                                                    value: "border-t-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderTop?.split("-")[2]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                               type="number"
                                                               className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderBottom: "border-b-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderBottom",
                                                                    value: "border-b-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }} type="number"
                                                               value={borderWidth.borderBottom?.split("-")[2]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                               className="absolute appearance-none bottom-0 bg-black border-2 border-gray-500 rounded-md translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <p className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-xs text-white">PX</p>

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderLeft: "border-l-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderLeft",
                                                                    value: "border-l-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderLeft?.split("-")[2]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                               type="number"
                                                               className="absolute appearance-none top-2/4 bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderRight: "border-b-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderRight",
                                                                    value: "border-r-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderRight?.split("-")[2]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                               type="number"
                                                               className="absolute appearance-none top-2/4 bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 right-0 translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                    </div>
                                                    <div className="py-2 flex items-center relative h-max">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                                <IconBorderRadius />
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
                                                                type="number" className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                                value: "rounded-[" + rounded.value +  target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={rounded.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="text-white py-2 flex justify-center">
                                                        <h4>Border color</h4>
                                                    </div>
                                                    <ColorPicker
                                                        fullWidth
                                                        onChange={ (value) => {
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
                                                        onChangeEnd={ (value) => {
                                                            colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                        }}
                                                        swatches={colorsUsed}
                                                        defaultValue={colorOptions.borderColor}
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
                                                className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Size and spacing</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="border-l-2 w-full pl-1 pt-2">
                                                    <div className="relative h-32 mt-2 mb-5 mx-auto w-3/4 border-2 border-gray-500 rounded-md">
                                                        <input
                                                            onChange={({target}) => {
                                                                setMargins({
                                                                    ...margins,
                                                                    marginTop: "mt-[" + target.value + "px]"
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "margins",
                                                                        name: "marginTop",
                                                                        value: "mt-[" + target.value + "px]"
                                                                    }
                                                                })
                                                            }}
                                                            value={margins.marginTop?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                            type="number"
                                                            className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <input
                                                            onChange={({target}) => {
                                                                setMargins({
                                                                    ...margins,
                                                                    marginBottom: "mb-[" + target.value + "px]"
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "margins",
                                                                        name: "marginBottom",
                                                                        value: "mb-[" + target.value + "px]"
                                                                    }
                                                                })
                                                            }}
                                                            type="number"
                                                            value={margins.marginBottom?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                            className="absolute appearance-none bottom-0 bg-black border-2 border-gray-500 rounded-md translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <span className="absolute text-xs top-3 left-2/4 -translate-x-2/4">
                                                            Margins
                                                        </span>
                                                        <div className="absolute top-2/4 left-2/4 w-full -translate-x-2/4 -translate-y-2/4">
                                                            <div className="relative h-11 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                                <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingTop: "pt-[" + target.value + "px]"
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingTop",
                                                                            value: "pt-[" + target.value + "px]"
                                                                        }
                                                                    })
                                                                }}
                                                                       value={paddings.paddingTop?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                                       type="number"
                                                                       className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                                <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingBottom: "pb-[" + target.value + "px]"
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingBottom",
                                                                            value: "pb-[" + target.value + "px]"
                                                                        }
                                                                    })
                                                                }}
                                                                       value={paddings.paddingBottom?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                                       type="number"
                                                                       className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 -bottom-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                                <p className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-xs text-white">
                                                                    Paddings
                                                                </p>

                                                                <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingLeft: "pl-[" + target.value + "px]"
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingLeft",
                                                                            value: "pl-[" + target.value + "px]"
                                                                        }
                                                                    })
                                                                }}
                                                                       value={paddings.paddingLeft?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                                       type="number"
                                                                       className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 top-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                                <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingRight: "pr-[" + target.value + "px]"
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingRight",
                                                                            value: "pr-[" + target.value + "px]"
                                                                        }
                                                                    })
                                                                }}
                                                                       value={paddings.paddingRight?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                                       type="number"
                                                                       className="absolute appearance-none bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 top-2/4 right-0 translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                            </div>
                                                        </div>

                                                        <input
                                                            onChange={({target}) => {
                                                                setMargins({
                                                                    ...margins,
                                                                    marginLeft: "ml-[" + target.value + "px]"
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "margins",
                                                                        name: "marginLeft",
                                                                        value: "ml-[" + target.value + "px]"
                                                                    }
                                                                })
                                                            }}
                                                            value={margins.marginLeft?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                            type="number"
                                                            className="absolute appearance-none top-2/4 bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                        <input
                                                            onChange={({target}) => {
                                                                setMargins({
                                                                    ...margins,
                                                                    marginRight: "mr-[" + target.value + "px]"
                                                                })
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "margins",
                                                                        name: "marginRight",
                                                                        value: "mr-[" + target.value + "px]"
                                                                    }
                                                                })
                                                            }}
                                                            value={margins.marginRight?.split("-")[1]?.replace("[", "")?.replace("]", "")?.replace("px", "")}
                                                            type="number"
                                                            className="absolute appearance-none top-2/4 bg-black border-2 border-gray-500 rounded-md -translate-y-2/4 right-0 translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                    </div>
                                                    <div className="py-2 flex items-center relative h-max">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                                <IconArrowsVertical />
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
                                                                type="number" className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="py-2 flex items-center relative h-max">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                                <IconArrowsHorizontal />
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
                                                                value={size.width.value}
                                                                min={0}
                                                                type="number" className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        {/*
                        POSITION
                        POSITION
                        POSITION
                        POSITION
                        POSITION
                        POSITION
                        POSITION
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                                <span className="font-bold text-white">Position</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
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
                                                    <div className="w-full p-3 flex justify-center space-x-3">
                                                        <button
                                                            onChange={ () => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "display",
                                                                        value: "hidden"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type]?.display === 'hidden' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <IconSquareX/>
                                                            <span className="pl-1">Hidden</span>
                                                        </button>
                                                        <button
                                                            onChange={ () => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "display",
                                                                        value: "flex"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type]?.display === 'flex' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <IconColumns1/>
                                                            <span className="px-2">Flex</span>
                                                        </button>
                                                        <button
                                                            onChange={ () => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "display",
                                                                        value: "grid"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type].display === 'grid' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <IconGrid4x4/>
                                                            <span className="px-2">Grid</span>
                                                        </button>
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
                                                    <div className="relative my-2 flex h-10 w-full">
                                                        <div className="w-[35%] flex items-center text-xs justify-start px-2 border-r-[1px] h-full">
                                                            <IconSpacingVertical />
                                                            <span className="font-bold">Align</span>
                                                        </div>
                                                        <div className="flex items-center justify-around w-[65%]">
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "itemsAlign",
                                                                            value: "items-start"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].itemsAlign === 'items-start' ? 'text-cyan-400' : 'text-white')}`} title="Top">
                                                                <IconAlignBoxCenterTop/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "itemsAlign",
                                                                            value: "items-center"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].itemsAlign === 'items-center' ? 'text-cyan-400' : 'text-white')}`} title="Center">
                                                                <IconAlignBoxCenterMiddle/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "itemsAlign",
                                                                            value: "items-end"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].itemsAlign === 'items-end' ? 'text-cyan-400' : 'text-white')}`} title="Bottom">
                                                                <IconAlignBoxCenterBottom/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "itemsAlign",
                                                                            value: "items-stretch"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].itemsAlign === 'items-stretch' ? 'text-cyan-400' : 'text-white')}`} title="Stretch">
                                                                <IconAlignBoxCenterStretch/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="relative my-2 flex h-10 w-full">
                                                        <div className="w-[35%] flex items-center text-xs text-center justify-start px-2 border-r-[1px] h-full">
                                                            <IconSpacingHorizontal />
                                                            <span className="font-bold">Justify</span>
                                                        </div>
                                                        <div className="flex items-center justify-around w-[65%]">
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "justifyContent",
                                                                            value: "justify-start"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].justifyContent === 'justify-start' ? 'text-cyan-400' : 'text-white')}`} title="Left">
                                                                <IconAlignBoxLeftMiddle/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "justifyContent",
                                                                            value: "justify-center"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].justifyContent === 'justify-center' ? 'text-cyan-400' : 'text-white')}`} title="Center">
                                                                <IconAlignBoxCenterMiddle/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "justifyContent",
                                                                            value: "justify-end"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`text-center ${ (optionItem['settings' + viewport.type].justifyContent === 'justify-end' ? 'text-cyan-400' : 'text-white')}`} title="Right">
                                                                <IconAlignBoxRightMiddle/>
                                                            </button>
                                                            <button
                                                                onClick={ () => {
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "position",
                                                                            name: "justifyContent",
                                                                            value: "justify-around"
                                                                        }
                                                                    })
                                                                }}
                                                                className={`rotate-90 text-center ${ (optionItem['settings' + viewport.type].justifyContent === 'justify-around' ? 'text-cyan-400' : 'text-white')}`} title="Around">
                                                                <IconAlignBoxCenterStretch/>
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
                                                    <div className="w-full p-3 flex justify-center space-x-3">
                                                        <button
                                                            onChange={ () => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "position",
                                                                        value: "relative"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-2/4 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type].position === 'relative' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Relative</span>
                                                        </button>
                                                        <button
                                                            onChange={ () => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "position",
                                                                        value: "absolute"
                                                                    }
                                                                })
                                                            }}
                                                            className={`w-2/4 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type].position === 'absolute' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                            <span className="px-2">Absolute</span>
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
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                            <div className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                <span className="text-[12px] font-bold">Top</span>
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
                                                                type="number" className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                            <div className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                <span className="text-[12px] font-bold">Bottom</span>
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
                                                                type="number" className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                            <div className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                <span className="text-[12px] font-bold">Left</span>
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
                                                                type="number" className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                            <div className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                <span className="text-[12px] font-bold">Right</span>
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
                                                                type="number" className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
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
                                                                className="absolute top-2/4 -translate-y-2/4 right-0 w-7 h-8 bg-black appearance-none" name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()} value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        {optionItem['settings' + viewport.type].hasOwnProperty("backgroundColorSecondary") ? (
                            <>
                                <p>Background Color Secondary</p>
                            </>
                        ) : null}
                        {optionItem['settings' + viewport.type].hasOwnProperty("backgroundColorThird") ? (
                            <>
                                <p>Background Color Third</p>
                            </>
                        ) : null}
                    </>
                ) : (
                    <Disclosure as="div" className="border-white py-5">
                        <p className="text-white">
                            Select an item from tree view to see the options
                        </p>
                    </Disclosure>
                )
                }
            </div>
        ) :
        (
            <Disclosure as="div" className="border-white py-5">
                <p className="text-white">
                    Select an item from tree view to see the options
                </p>
            </Disclosure>
        );
};
