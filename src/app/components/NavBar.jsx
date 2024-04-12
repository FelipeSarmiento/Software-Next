'use client'
import {Fragment, useEffect, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { getSession, logout as logOut } from '@/./data/page';

const navigation = [
    {name: 'How to use?', href: '/HowToUse', current: false},
    {name: 'About', href: '/About', current: false},
    {name: 'Contact', href: '/Contact', current: false},
    {name: 'Projects', href: '/Projects', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function NavBar() {

    const [session, setSession] = useState('')

    const logout = () => {
        setSession('')
        logOut().then(() => { window.location.reload() })
    }

    useEffect(() => {
        getSession().then((session) => {
            setSession(session?.username)
        })
    }, []);

    return (
        <Disclosure as="nav" className="border-b-4 border-cyan-500 sticky bg-black top-0 z-50">
            {({open}) => (
                <>
                    <div className="relative mx-auto px-3 sm:px-6 lg:px-24">
                        <div className="relative flex h-16 py-4 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-black hover:text-white focus:outline-none">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch lg:justify-start">
                                <div className="lg:ml-12 md:block">
                                    <div className="flex space-x-4 items-center">
                                        <a href="/"><p
                                            className="rounded-md py-2 text-xl bg-gradient-to-r text-white font-bold ">Software
                                            Next <span className="text-xs text-cyan-500">beta</span></p></a>
                                        <div className="hidden lg:block">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gradient-to-r from-black via-zinc-700 to-black hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    href={item.href}>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute hidden lg:flex inset-y-0 right-0 items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {
                                    !session ? (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Link href="/Auth/Login"
                                                      className="relative flex px-2 pb-1 h-8 items-center text-white hover:bg-gradient-to-r from-black via-zinc-700 to-black">
                                                    <span className="absolute -inset-1.5"/>
                                                    <div>
                                                        <FontAwesomeIcon icon={faRightToBracket}
                                                                         className="text-sm px-1"/>
                                                    </div>
                                                    <span className="px-1 flex h-auto">Log in</span>
                                                </Link>
                                            </div>
                                        </Menu>
                                    ) : (
                                        <Menu as="div" className="relative ml-3">
                                            <div className="flex">
                                                <Link href="/MyProjects" className="relative flex px-2 pb-1 h-8 items-center text-white hover:bg-gradient-to-r from-black via-zinc-700 to-black">
                                                    <span className="absolute -inset-1.5"/>
                                                    <span className="px-1 flex h-auto">My Projects</span>
                                                </Link>
                                                <div className="border-[1px] border-white" />
                                                <Disclosure.Button title="Log out" onClick={() => logout()} className="relative flex pb-1 h-8 px-2 items-center text-white hover:bg-gradient-to-r from-black via-zinc-700 to-black">
                                                    <span className="absolute -inset-1.5"/>
                                                    <span className="md:block px-1 flex h-auto">{ session }</span>
                                                    <div>
                                                        <FontAwesomeIcon icon={faRightToBracket} className="text-sm px-1"/>
                                                    </div>
                                                </Disclosure.Button>
                                            </div>
                                        </Menu>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel
                            className="absolute top-full bg-black z-50 border-b-4 border-cyan-500 w-full lg:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-stone-800 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                <hr/>
                                <div className="flex items-center pt-2 text-lg">
                                    {
                                        !session ? (
                                            <Menu as="div" className="relative">
                                                <div>
                                                    <Link href="/Auth/Login" className="relative flex pb-1 border-2 h-8 items-center justify-start px-0 text-white hover:bg-gradient-to-r from-black via-zinc-700 to-black">
                                                        <span className="absolute -inset-1.5"/>
                                                        <div>
                                                            <FontAwesomeIcon icon={faRightToBracket} className="text-sm px-1"/>
                                                        </div>
                                                        <span className="px-1 flex h-auto">Log in</span>
                                                    </Link>
                                                </div>
                                            </Menu>
                                        ) : (
                                            <Menu as="div" className="relative">
                                                <div className="">
                                                    <Link href="/MyProjects" className={ 'text-gray-300 hover:bg-stone-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}>
                                                        <span className="absolute -inset-1.5"/>
                                                        <span className="">My Projects</span>
                                                    </Link>
                                                    <Disclosure.Button title="Log out" onClick={() => logout()} className={ 'text-gray-300 flex hover:bg-stone-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}>
                                                        <span className="md:block flex h-auto">{ session }</span>
                                                        <div>
                                                            <FontAwesomeIcon icon={faRightToBracket} className="text-sm px-1"/>
                                                        </div>
                                                    </Disclosure.Button>
                                                </div>
                                            </Menu>
                                        )
                                    }
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
