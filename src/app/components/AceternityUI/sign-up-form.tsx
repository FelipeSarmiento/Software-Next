"use client";
import {Label} from "./label";
import {Input} from "./input";
import {cn} from "../../../settings/utils/cn";
import { FirebaseAuth } from "../../../settings/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
    IconBrandGoogle,
    IconMail,
} from "@tabler/icons-react";
import {useForm} from "../../../lib/hooks/useForm";
import Link from "next/link";
import {signIn} from "next-auth/react";

export function SignUpForm() {

    const {onInputChange, formState} = useForm({
    })

    return (
        <div
            className="w-full rounded-3xl p-4 px-10 md:p-8 shadow-input bg-black border-gray-600 border-2">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to MyPortfolio
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Register to start designing your portfolio
            </p>
            <form className="my-8" onSubmit={ (e) => {
                e.preventDefault()
            } }>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Name</Label>
                    <Input required={true} id="name" placeholder="Name" type="text" name="name" value={formState.name}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input required={true} id="email" placeholder="Email" type="email" name="email" value={formState.email}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input required={true} id="password" placeholder="••••••••" type="password" name="password"
                           value={formState.password} onChange={onInputChange}/>
                </LabelInputContainer>
                <button onClick={async () => {
                    await createUserWithEmailAndPassword(FirebaseAuth, formState.email, formState.password)
                        .then((userCredential) => {
                            updateProfile(userCredential.user, {
                                displayName: formState.name,
                            }).then(() => {
                                console.log('Profile updated')
                            }).catch((error) => {
                                console.log(error)

                            })
                            signIn('credentials', {email: formState.email, password: formState.password, redirect: true, callbackUrl: '/'})
                        })
                }}
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--white)_inset,0px_-1px_0px_0px_var(--white)_inset]">
                    Sign Up &rarr;
                    <BottomGradient/>
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                <div className="flex flex-col space-y-4">
                    <button onClick={() => signIn()}
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Sign in with Google
                        </span>
                        <BottomGradient/>
                    </button>
                    <Link href='/Auth/Login' className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                        <IconMail className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Sign in
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
