"use client";
import {Label} from "./label";
import {Input} from "./input";
import {cn} from "../../../settings/utils/cn";
import {useForm} from "../../../lib/hooks/useForm";
import Link from "next/link";
import { login } from "@/data/page";
import {useState} from "react";
import { setSession } from "@/data/page";

export function SignInForm() {


    const {onInputChange, formState} = useForm({})

    const [errorMessage, setErrorMessage] = useState('' as string)
    const handleSignIn = async () => {
        setErrorMessage('')
        try {
            let result = await login(formState)
            if (result.ok) {
                await setSession(result.user).then(() => { window.location.reload() })
            }
            setErrorMessage(result.message)
        } catch (e) {
            setErrorMessage(e.message)
        }
    }

    return (
        <div
            className="w-full rounded-3xl p-4 px-5 md:p-8 shadow-input bg-black border-gray-600 border-2">
            <h2 className="font-bold text-xl text-center text-neutral-200">
                Welcome to Software Next
            </h2>
            <p className="text-sm mt-2 text-center text-neutral-300">
                Login to start designing your web site
            </p>

            <form className="my-8" onSubmit={(e) => {
                e.preventDefault()
                handleSignIn()
            }}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email / Username</Label>
                    <Input required={true} id="user" placeholder="Email / Username" type="text" name="user"
                           value={formState.user}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input required={true} id="password" placeholder="••••••••" type="password" name="password"
                           value={formState.password} onChange={onInputChange}/>
                </LabelInputContainer>
                {
                    errorMessage !== '' && (
                        <LabelInputContainer className="md:col-span-2 my-5">
                            <p className="text-center font-bold">
                                <span className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-500">{ errorMessage }</span>
                            </p>
                        </LabelInputContainer>
                    )
                }
                <button
                    className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_0px_0px_0px_var(--white)_inset,0px_-1px_0px_0px_var(--white)_inset]">
                    Sign in &rarr;
                    <BottomGradient/>
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                <div className="flex flex-col space-y-4">
                    <Link href='/Auth/Register'
                          className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                        <span className="text-neutral-300 text-sm">
                            Sign up
                        </span>
                        <BottomGradient/>
                    </Link>
                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
