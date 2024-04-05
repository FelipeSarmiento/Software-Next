'use client'
import React, {useRef} from "react";
import "@/settings/assets/globals.css";
import {Spotlight} from "../components/AceternityUI/Spotlight";
import { Label } from "../components/AceternityUI/label";
import { Input } from "../components/AceternityUI/input";
import {cn} from "../../settings/utils/cn";
import {Textarea} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import emailjs from '@emailjs/browser';

export default function Home() {

    const form = useRef() as React.MutableRefObject<HTMLFormElement>;

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('SoftwareNext-lfsm0803', 'template_ijoww09', form.current, {
                publicKey: 'Y5K-S_FaujKH0t0OP',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const words = `Welcome to our About page! Here you can learn more about our platform:`
    return (
        <>
            <div className="">
                <div
                    className="h-[25rem] w-full rounded-md flex md:items-center md:justify-center antialiased relative overflow-hidden">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="white"
                    />
                    <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                        <h1 className="text-4xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            Contact
                        </h1>
                        <p className="mt-4 font-normal text-2xl text-neutral-300 max-w-xl text-center mx-auto">
                            Welcome to our Contact page! We're here to assist you with any questions, feedback, or inquiries you may have. Feel free to reach out to us using the contact information provided below:
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="max-w-2xl w-full z-50 mx-auto rounded-none md:rounded-2xl p-4 md:px-4 shadow-input">
                    <form ref={form} onSubmit={sendEmail} className="my-8">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" name="firstname" placeholder="Tyler" type="text" />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" name="lastname"  placeholder="Durden" type="text" />
                            </LabelInputContainer>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" placeholder="contact@software-next.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="phonenumber">Phone number</Label>
                                <Input id="phonenumber" name="phonenumber" placeholder="+1 777 777-7777" type="tel" />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="">Message</Label>
                            <Textarea
                                name="message"
                                id="message"
                                variant="unstyled"
                                placeholder="Type your message here..."
                                classNames={{
                                    wrapper: "w-full",
                                    input: "flex h-32 w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparentfile:text-sm file:font-medium placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                }}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn flex from-zinc-900 to-zinc-900 justify-center items-center space-x-4 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            Send <IconSend/>
                        </button>

                        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    </form>
                </div>
            </div>
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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