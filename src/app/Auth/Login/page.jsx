'use client'
import {SignInForm} from "../../components/AceternityUI/sign-in-form";
import {BackgroundGradient} from "../../components/AceternityUI/background-gradient";
export default function Home(){

    return (
        <div className="min-h-[calc(100vh_-_84px)] flex items-center justify-center ">
            <BackgroundGradient className="">
                <SignInForm/>
            </BackgroundGradient>
        </div>
    )
}