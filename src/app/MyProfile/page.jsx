'use client'
import {
    IconX, IconUser, IconEdit, IconDeviceFloppy
} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import {
    getProjectsByUser,
    updateUser, getSession, getUser, setSession
} from "@/data/data";
import Image from 'next/image'
import emptyBox from '@/settings/assets/images/emptyBox.png'
import SoftwareNextLogo from '@/settings/assets/images/software-next-logo.png'
import '@mantine/core/styles.css';
import Link from "next/link";


export default function Home() {

    const [projects, setProjects] = useState([])
    const [userInformation, setUserInformation] = useState()
    const [userInformationCopy, setUserInformationCopy] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const [message, setMessage] = useState()


    useEffect(() => {
        getProjects()
        getSession().then((session) => {
            getUser(session.iduser).then((user) => {
                setUserInformation({
                    ...user,
                    profile_picture: user.profile_picture ? Buffer.from(user.profile_picture, 'base64').toString() : ""
                })
                setUserInformationCopy({
                    ...user,
                    profile_picture: user.profile_picture ? Buffer.from(user.profile_picture, 'base64').toString() : ""
                })
            })
        })
    }, []);

    useEffect(() => {
        if(!editProfile){
            setMessage(undefined)
        }
    }, [editProfile]);

    const updateProfile = async () => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userInformation.username === "") {
            setMessage({message: 'Username is required', type: 'error'})
            return
        }
        if (userInformation.email === "") {
            setMessage({message: 'Email is required', type: 'error'})
            return
        }
        if (!regexCorreo.test(userInformation.email)) {
            setMessage({message: 'Invalid email', type: 'error'})
            return
        }
        if (userInformation.first_name === "") {
            setMessage({message: 'First Name is required', type: 'error'})
            return
        }
        if (userInformation.last_name === "") {
            setMessage({message: 'Last Name is required', type: 'error'})
            return
        }
        try {
            await updateUser(userInformation)
            setSession(userInformation)
            setUserInformationCopy(userInformation)
            setEditProfile(!editProfile)
        } catch (error) {
            if (error.message.includes('duplicate')) {
                if (error.message.includes('email')) {
                    setMessage({message: 'Email already exists', type: 'error'})
                } else if (error.message.includes('username')) {
                    setMessage({message: 'Username already exists', type: 'error'})
                }
            }
        }
    }


    return (
        <>
            <div className="h-[calc(100vh_-_84px)] px-4 py-5">
                <header className="h-16 md:h-32 md:px-12 mb:mb-5 shadow">
                    <div className="mx-auto h-full flex items-center mjustify-center md:justify-start">
                        <h1 className="flex items-center justify-center md:justify-start text-2xl md:text-4xl font-bold tracking-tight text-white">
                            My Profile
                        </h1>
                    </div>
                </header>
                <div
                    className="grid grid-cols-1 2xl:grid-cols-3 justify-center place-items-center w-full min-h-[calc(100%_-_200px)] mx-auto gap-8 p-5">
                    <div
                        className={`col-span-1 p-3 border-4 flex flex-col rounded-3xl border-stone-800 w-full h-full justify-around`}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-1/3 flex items-center justify-center text-white">
                                <div className="h-28 w-28 border-2 flex items-center justify-center border-stone-800 rounded-full overflow-hidden relative">
                                    {
                                        userInformation?.profile_picture !== "" ? (
                                            <img src={userInformation?.profile_picture} alt=""/>
                                        ) : (<IconUser className=" size-16"/>)
                                    }
                                    {
                                        editProfile ? (
                                            <div
                                                className="w-full before:content-['Select'] before:top-2/4 before:left-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:absolute flex items-center justify-center font-extrabold text-xs text-black absolute bottom-0 left-0 bg-white text-center h-6">
                                                <input
                                                    onChange={(e) => {
                                                        const file = e.target.files[0]
                                                        const reader = new FileReader();
                                                        reader.onload = function (e) {
                                                            setUserInformation({
                                                                ...userInformation,
                                                                profile_picture: e.target.result
                                                            })
                                                        };
                                                        reader.readAsDataURL(file)
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                    placeholder="Select"
                                                    className="w-full h-full placeholder:text-black text-center rounded-r-md appearance-none opacity-0 focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"
                                                />


                                            </div>
                                        ) : ''
                                    }
                                </div>
                            </div>
                            <div
                                className="w-full lg:w-2/3 flex flex-col text-neutral-200 p-3 lg:items-start justify-evenly">
                                <div
                                    className="flex flex-wrap lg:flex-nowrap w-full items-start justify-around lg:space-x-2">
                                    <div
                                        className={`flex flex-col justify-center h-full ${editProfile ? "w-full lg:w-2/4" : "w-full"}`}>
                                        {
                                            editProfile ? (
                                                <>
                                                    <label htmlFor="-">First Name</label>
                                                    <input type="text" onChange={(event) => {
                                                        setUserInformation({
                                                            ...userInformation,
                                                            first_name: event.target.value
                                                        })
                                                    }} value={userInformation?.first_name ?? ""}
                                                           className="px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md"/>
                                                </>
                                            ) : (
                                                <>
                                                    <h2 className="text-3xl text-cyan-500 font-extrabold text-nowrap truncate">{`${userInformation?.first_name ?? ""} ${userInformation?.last_name ?? ""}`}</h2>
                                                </>
                                            )
                                        }
                                    </div>
                                    {
                                        editProfile ? (
                                            <div
                                                className={`flex flex-col justify-center h-full ${editProfile ? "w-full lg:w-2/4" : "w-full"}`}>
                                                <label htmlFor="-">Last Name</label>
                                                <input type="text" onChange={(event) => {
                                                    setUserInformation({
                                                        ...userInformation,
                                                        last_name: event.target.value
                                                    })
                                                }} value={userInformation?.last_name ?? ""}
                                                       className="px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md"/>
                                            </div>
                                        ) : ''
                                    }
                                </div>
                                {
                                    editProfile ? (
                                        <div className="w-full">
                                            <label htmlFor="-">Position</label>
                                            <input type="text" onChange={(event) => {
                                                setUserInformation({...userInformation, position: event.target.value})
                                            }} value={userInformation?.position ?? ""}
                                                   className="px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md"/>
                                        </div>
                                    ) : (
                                        <h3 className="text-2xl text-neutral-400 font-bold">{userInformation?.position ?? ""}</h3>
                                    )
                                }
                            </div>
                        </div>
                        <div className={`flex`}>
                            <div className={`w-full text-neutral-200 p-1 h-max flex flex-wrap`}>
                                <div
                                    className={`flex flex-col justify-center h-full w-full lg:w-2/4 p-2`}>
                                    <label htmlFor="-">Username</label>
                                    <input type="text" onChange={(event) => {
                                        setUserInformation({
                                            ...userInformation,
                                            username: event.target.value
                                        })
                                    }}
                                           disabled={!editProfile}
                                           value={userInformation?.username ?? ""}
                                           className={`px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md ${ !editProfile ? "border-transparent" : "border-stone-800"}`}/>
                                </div>
                                <div
                                    className={`flex flex-col justify-center h-full w-full lg:w-2/4 p-2`}>
                                    <label htmlFor="-">Email</label>
                                    <input type="email" onChange={(event) => {
                                        setUserInformation({
                                            ...userInformation,
                                            email: event.target.value
                                        })
                                    }}
                                           disabled={!editProfile}
                                           value={userInformation?.email ?? ""}
                                           className={`px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md ${ !editProfile ? "border-transparent" : "border-stone-800"}`}/>
                                </div>
                                <div
                                    className={`flex flex-col justify-center h-full w-full lg:w-2/4 p-2`}>
                                    <label htmlFor="-">Phone Number</label>
                                    <input type="text" onChange={(event) => {
                                        setUserInformation({
                                            ...userInformation,
                                            phone_number: event.target.value
                                        })
                                    }}
                                           disabled={!editProfile}
                                           value={userInformation?.phone_number ?? ""}
                                           className={`px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md ${ !editProfile ? "border-transparent" : "border-stone-800"}`}/>
                                </div>
                                <div
                                    className={`flex flex-col justify-center h-full w-full lg:w-2/4 p-2`}>
                                    <label htmlFor="-">GitHub</label>
                                    <input type="text" onChange={(event) => {
                                        setUserInformation({
                                            ...userInformation,
                                            github: event.target.value
                                        })
                                    }}
                                           disabled={!editProfile}
                                           value={userInformation?.github ?? ""}
                                           className={`px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-10 rounded-md ${ !editProfile ? "border-transparent" : "border-stone-800"}`}/>
                                </div>
                                <div
                                    className={`flex flex-col justify-center h-max w-full p-1`}>
                                    <label htmlFor="-">About me</label>
                                    {
                                        editProfile ? (
                                            <textarea
                                                onChange={(event) => {
                                                    setUserInformation({
                                                        ...userInformation,
                                                        about: event.target.value
                                                    })
                                                }}
                                                value={userInformation?.about ?? ""}
                                                className={`px-2 border-2 border-stone-800 appearance-none outline-none hover:outline-none bg-stone-950 w-full h-20 rounded-md`}/>
                                        ) : (
                                            <div className="px-2 border-2 border-transparent bg-stone-950 w-full h-20 rounded-md">
                                                <span>{ userInformation?.about }</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            message ? (
                                <div className="flex justify-center space-x-2 items-end py-8 lg:py-0">
                                    <div
                                        className={`px-4 py-2 flex space-x-4 border-2 text-cyan-500 font-extrabold rounded-lg ${message.type === "success" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>
                                        <span>{message.message}</span>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )
                        }
                        <div className="flex justify-center space-x-2 items-end py-4 lg:py-0">
                            <button onClick={() => {
                                if (editProfile) {
                                    updateProfile()
                                } else {
                                    setEditProfile(!editProfile)
                                }
                            }}
                                    className="px-4 py-2 flex space-x-4 border-2 border-stone-800 text-cyan-500 font-extrabold rounded-lg">
                                {
                                    editProfile ? (
                                        <>
                                            <IconDeviceFloppy/>
                                            <span>Save</span>
                                        </>
                                    ) : (
                                        <>
                                            <IconEdit/>
                                            <span>Edit Profile</span>
                                        </>
                                    )
                                }
                            </button>
                            {
                                editProfile ? (
                                    <button onClick={() => {
                                        setUserInformation({...userInformationCopy})
                                        setEditProfile(!editProfile)
                                    }}
                                            className="px-4 py-2 flex space-x-4 border-2 border-stone-800 text-cyan-500 font-extrabold rounded-lg">
                                        <IconX/>
                                        <span>Cancel</span>
                                    </button>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2 border-4 rounded-3xl border-stone-800 w-full h-full">
                        <div className="lg:h-5/6 overflow-y-auto p-5">
                            <div
                                className="grid grid-cols-1 gap-2 md:grid-cols-2 justify-center mx-auto">
                                {
                                    projects.length > 0 ? projects.map((project, index) => (
                                        <Link className="w-full" key={project.idproject * index} href={"/" + project.projectpublicid}>
                                            <div className="relative grid grid-cols-1 md:gap-x-2 w-full lg:grid-cols-2 p-2 md:p-3 lg:col-span-2 rounded-lg border-4 border-stone-800">
                                                <div
                                                    className="border-2 flex items-center justify-center select-none border-stone-800 rounded-md  h-44 lg:h-full">
                                                    <Image src={SoftwareNextLogo} alt="Software Next Logo" width={500}
                                                           height={500} className="size-24 object-cover rounded-md"/>
                                                </div>
                                                <div className="rounded-md justify-evenly  flex flex-col px-3 md:px-3 lg:px-0 text-white">
                                                    <div className="w-full relative h-10 md:h-1/5 flex flex-wrap items-center text-2xl font-bold ">
                                                        <h3 className="text-cyan-500 text-nowrap truncate pr-8">{project.projectname}</h3>
                                                    </div>
                                                    <div className="w-full flex-1">
                                                        <div className="h-20 max-h-full overflow-y-auto">
                                                            <span
                                                                className="max-h-10 text-sm md:text-base">{project.projectdescription}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="w-full md:w-full h-12 flex overflow-x-auto items-center space-x-2 justify-start">
                                                        {project.tags.map((tag, index) => (
                                                            <span key={tag + index}
                                                                  className="bg-stone-800 rounded-lg text-nowrap p-1 text-xs md:text-sm border-2 border-stone-900">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div
                                            className="col-span-2 w-full py-24 h-full flex flex-col items-center justify-center">
                                            <span className="text-white">
                                                <Image width={500} height={100} src={emptyBox} alt="Empty box"
                                                       className="size-32 md:size-60"/>
                                            </span>
                                            <span className="text-white font-bold text-2xl md:text-4xl">
                                                No projects yet
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex justify-center items-center py-5 lg:py-0 lg:h-1/6">
                            <Link href="/MyProjects">
                                <button
                                    className="px-4 py-2 flex space-x-4 border-2 border-stone-800 text-cyan-500 font-extrabold rounded-lg">
                                    Go to My Projects
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    async function getProjects() {
        setProjects(await getProjectsByUser().then((response) => {
            return response.projects
        }))
    }
}