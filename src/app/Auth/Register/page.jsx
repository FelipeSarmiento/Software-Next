'use client'
import {SignUpForm} from "../../components/AceternityUI/sign-up-form";
import {BackgroundGradient} from "../../components/AceternityUI/background-gradient";
export default function Home(){

    return (
        <div className="min-h-[calc(100vh_-_84px)] flex items-center justify-center ">
            <BackgroundGradient className="">
                <SignUpForm/>
            </BackgroundGradient>
        </div>
    )
}