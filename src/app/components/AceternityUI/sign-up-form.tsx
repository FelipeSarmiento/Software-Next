"use client";
import {Label} from "./label";
import {Input} from "./input";
import {cn} from "../../../settings/utils/cn";
import {useForm} from "../../../lib/hooks/useForm";
import Link from "next/link";
import { registerUser } from '@/data/data'
import React, {useState} from "react";
import {Modal, Switch} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import '@mantine/core/styles.css';

export function SignUpForm() {


    const [opened, { open, close }] = useDisclosure(false);

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
            setMessage({message: 'User created successfully, now you can login', type: 'success'})
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
                Welcome to<br/><span translate="no" className="text-cyan-500 text-3xl">Software Next</span>
            </h2>
            <p className="text-lg mt-2 text-center text-neutral-300">
                Register to start designing your web site
            </p>
            <form className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-5" onSubmit={ (e) => {
                e.preventDefault()
                handleSignUp()
            } }>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="email">First Name *</Label>
                    <Input required={true} id="firstName" placeholder="First Name" type="text" name="firstName" minLength={1} value={formState.firstName}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="email">Last Name *</Label>
                    <Input required={true} id="lastName" placeholder="Last Name" type="text" name="lastName" value={formState.lastName}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="email">Username *</Label>
                    <Input required={true} id="username" placeholder="Username" type="text" name="username" value={formState.username}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="password">Phone number</Label>
                    <Input id="phoneNumber" placeholder="Phone Number" type="text" name="phoneNumber"
                           value={formState.phoneNumber} onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input required={true} id="email" placeholder="Email" type="email" name="email" value={formState.email}
                           onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 col-span-2 lg:col-span-1">
                    <Label htmlFor="password">Password *</Label>
                    <Input required={true} id="password" placeholder="••••••••" type="password" name="password"
                           value={formState.password} onChange={onInputChange}/>
                </LabelInputContainer>
                <LabelInputContainer className="col-span-2 flex items-center justify-center mb-4">
                    <Switch
                        id="terms"
                        name="terms"
                        required={true}
                        value={formState.terms}
                        onChange={ (event) => {
                            onInputChange({
                                target: {
                                    name: 'terms',
                                    value: event.currentTarget.checked
                                }
                            })
                        }}
                        classNames={{
                            root: '',
                            track: 'border-2 border-stone-500 ' + (formState?.terms ? 'bg-cyan-500' : 'bg-stone-800'),
                        }}
                        color="blue"
                        label={ <span className="text-neutral-300">I agree to the <button type="button" onClick={ open } className="text-cyan-500">terms and conditions</button></span> }
                    />
                </LabelInputContainer>
                {
                    message.message !== '' && (
                        <LabelInputContainer className="md:col-span-2">
                            <p className={"px-4 py-2 rounded-lg text-center border-2 font-bold " + ( message.type === 'success' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500' )}>
                                <span className="rounded-lg text-wrap ">{ message.message }</span>
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
            <Modal
                classNames={{
                    root: 'bg-stone-800',
                    content: 'bg-stone-800',
                    overlay: 'items-center',
                    title: 'text-cyan-500 w-full text-center font-extrabold text-2xl',
                    body: 'bg-stone-800 text-neutral-300',
                    header: 'bg-stone-800 text-center',
                    close: 'text-neutral-300 bg-transparent hover:bg-transparent hover:text-cyan-500',
                }}
                centered
                size={'55rem'}
                opened={opened}
                onClose={close}
                title="Terms and Conditions"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <h3 className="my-4 text-cyan-500 text-xl font-bold">1. Acceptance of Terms and Conditions</h3>

                <p className="text-justify ">By accessing and using the Software Next platform (the "Platform"), you (the "User") agree to and are bound by these Terms and Conditions of Use (the "Terms"). If you do not agree to these Terms, you may not use the Platform.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">2. Definitions</h3>

                <p className="text-justify ">Platform: Refers to the website and mobile application that allow the User to create and customize a website without the need for programming knowledge.
                    User: Refers to any person who accesses or uses the Platform.</p>
                <p className="text-justify ">Content: Refers to any text, image, audio, video, software, or other material that the User posts or uploads to the Platform.</p>
                <p className="text-justify ">Website: Refers to the website created by the User using the Platform.</p>
                <h3 className="my-4 text-cyan-500 text-xl font-bold">3. Use of the Platform</h3>

                <p className="text-justify ">The User agrees to use the Platform in a responsible and ethical manner, and in accordance with these Terms. The User must not use the Platform for any illegal purpose or that may harm others.</p>

                <p className="text-justify ">The User is responsible for all Content that they post or upload to the Platform. The User must ensure that their Content is not illegal, defamatory, obscene, hateful, threatening, invasive of privacy, or otherwise objectionable.</p>

                <p className="text-justify ">The Platform may contain links to third-party websites. The User acknowledges that we have no control over the content of these websites and are not responsible for their content.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">4. Intellectual Property</h3>

                <p className="text-justify ">The Platform and all Content published on it are protected by copyright, trademark, and other intellectual property laws. The User may not copy, reproduce, modify, distribute, display, perform, transmit, publish, sell, rent, sublicense, or create derivative works of the Platform or Content without the prior written consent of the copyright owner.</p>

                <p className="text-justify ">The User retains ownership of their Content. However, by posting their Content on the Platform, they grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, distribute, display, perform, transmit, publish, sell, rent, sublicense, and create derivative works of their Content in connection with the Platform and our services.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">5. Termination</h3>

                <p className="text-justify ">We reserve the right to suspend or terminate your account and your access to the Platform at any time, without notice, if we consider that you have violated these Terms or for any other reason that we deem fair.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">6. Limitation of Liability</h3>

                <p className="text-justify ">We shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from or in connection with the use or inability to use the Platform, even if we have been advised of the possibility of such damages.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">7. Indemnification</h3>

                <p className="text-justify ">You agree to indemnify, defend, and hold us harmless from and against any and all losses, damages, costs, and expenses (including attorneys' fees) that we incur in connection with or arising out of your use of the Platform or your violation of these Terms.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">8. General Provisions</h3>

                <p className="text-justify ">These Terms shall be governed by and construed in accordance with the laws of [Country]. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Country].</p>

                <p className="text-justify ">If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck from these Terms and the remaining provisions shall remain in full force and effect.</p>

                <p className="text-justify ">These Terms constitute the entire agreement between the parties with respect to the subject matter hereof and supersede all prior or contemporaneous communications, representations, or agreements, whether oral or written, between the parties.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">9. Changes to Terms</h3>

                <p className="text-justify ">We may modify these Terms at any time by posting the modified Terms on the Platform. The modified Terms will become effective as of the date of posting. If you do not agree to the modified Terms, you must stop using the Platform.</p>

                <h3 className="my-4 text-cyan-500 text-xl font-bold">10. Contact</h3>

                <p className="text-justify ">If you have any questions about these Terms, please contact us at [email protected]</p>

                <h2>Thank you for using Software Next!</h2>
            </Modal>
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
