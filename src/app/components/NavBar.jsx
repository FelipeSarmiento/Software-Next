'use client'
import { useSession, signOut } from "next-auth/react"
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import {Button} from "keep-react";

const navigation = [
    {name: '¿Como usar?', href: '/', current: false},
    {name: 'Crear mi portafolio', href: '/Dashboard', current: false},
    {name: 'Portafolios', href: '/', current: false},
    {name: 'Quienes Somos?', href: '/', current: false}
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function NavBar() {

    const { data: session } = useSession()

    return (
        <Disclosure as="nav" className="border-b-4 border-white sticky bg-black top-0 z-50">
            {({open}) => (
                <>
                    <div className="mx-autopx-2 sm:px-6 lg:px-24">
                        <div className="relative flex h-16 py-3 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4 items-center">
                                        <a href="/"><p
                                            className="rounded-md py-2 text-lg bg-gradient-to-r text-white font-bold ">My Portfolio</p></a>
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
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                                    <span className="px-1 flex h-auto">Ingresar</span>
                                                </Link>
                                            </div>
                                        </Menu>
                                    ) : (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Button title="Cerrar Sesión" onClick={() => signOut()}
                                                      className="relative flex px-2 pb-1 h-8 items-center text-white hover:bg-gradient-to-r from-black via-zinc-700 to-black">
                                                    <span className="absolute -inset-1.5"/>
                                                    <span className="px-1 flex h-auto">{ session.user.name }</span>
                                                    <div>
                                                        <FontAwesomeIcon icon={faRightToBracket}
                                                                         className="text-sm px-1"/>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Menu>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
