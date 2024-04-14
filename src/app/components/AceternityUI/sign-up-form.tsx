"use client";
import {Label} from "./label";
import {Input} from "./input";
import {cn} from "../../../settings/utils/cn";
import {useForm} from "../../../lib/hooks/useForm";
import Link from "next/link";
import { registerUser } from '@/data/data'
import {useState} from "react";

export function SignUpForm() {

    const {onInputChange, formState} = useForm({
    })

    const [message, setMessage] = useState({
        message: '',
        type: ''
    } as {message: string, type: string})

    const handleSignUp = async () => {
        setMessage({message: '', type: ''})
        try {
            await registerUser(formState)
            setMessage({message: 'User created successfully', type: 'success'})
        }
        catch (e) {
            if (e.message.includes('duplicate')){
                if (e.message.includes('email')){
                    setMessage({message: 'Email already exists', type: 'error'})
                }
                else if (e.message.includes('username')){
                    setMessage({message: 'Username already exists', type: 'error'})
                    }
            }
        }
    }

    return (
        <div
            className="w-full rounded-3xl p-4 px-2 md:px-10 md:p-8 shadow-input bg-black border-gray-600 border-2">
            <h2 className="font-bold text-2xl text-center text-neutral-200">
                Welcome to<br/><span className="text-cyan-500 text-3xl">Software Next</span>
            </h2>
            <p className="text-lg mt-2 text-center text-neutral-300">
                Register to start designing your web site
            </p>
            <form className="my-8 grid md:grid-cols-2 gap-5" onSubmit={ (e) => {
                e.preventDefault()
                handleSignUp()
            } }>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">First Name *</Label>
                    <Input required={true} id="firstName" placeholder="First Name" type="text" name="firstName" minLength={1} value={formState.firstName}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Last Name *</Label>
                    <Input required={true} id="lastName" placeholder="Last Name" type="text" name="lastName" value={formState.lastName}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Username *</Label>
                    <Input required={true} id="username" placeholder="Username" type="text" name="username" value={formState.username}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Phone number</Label>
                    <Input id="phoneNumber" placeholder="Phone Number" type="text" name="phoneNumber"
                           value={formState.phoneNumber} onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input required={true} id="email" placeholder="Email" type="email" name="email" value={formState.email}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password *</Label>
                    <Input required={true} id="password" placeholder="••••••••" type="password" name="password"
                           value={formState.password} onChange={onInputChange}/>
                </LabelInputContainer>
                {
                    message.message !== '' && (
                        <LabelInputContainer className="md:col-span-2">
                            <p className="text-center font-bold">
                                <span className={"px-4 py-2 rounded-lg border-2 " + ( message.type === 'success' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500' )}>{ message.message }</span>
                            </p>
                        </LabelInputContainer>
                    )
                }
                <div className="md:col-span-2">
                    <button type="submit" className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_0px_0px_0px_var(--white)_inset,0px_-1px_0px_0px_var(--white)_inset]">
                        Sign Up &rarr;
                        <BottomGradient/>
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                    <div className="flex flex-col space-y-4">
                        <Link href='/Auth/Login' className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                            <span className="text-neutral-300">
                                Sign in
                            </span>
                            <BottomGradient/>
                        </Link>
                    </div>
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
