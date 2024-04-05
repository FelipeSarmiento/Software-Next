'use client'
import {SignInForm} from "../../components/AceternityUI/sign-in-form";
import {BackgroundGradient} from "../../components/AceternityUI/background-gradient";
export default function Home(){

    return (
        <div className="min-h-[calc(100vh_-_84px)] px-4 py-10 flex items-center justify-center ">
            <BackgroundGradient containerClassName="md:w-1/4">
                <SignInForm/>
            </BackgroundGradient>
        </div>
    )
}