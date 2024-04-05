'use client'
import {SignUpForm} from "../../components/AceternityUI/sign-up-form";
import {BackgroundGradient} from "../../components/AceternityUI/background-gradient";
export default function Home(){

    return (
        <div className="min-h-[calc(100vh_-_84px)] py-10 flex items-center justify-center ">
            <BackgroundGradient containerClassName="w-full mx-10 md:w-2/4">
                <SignUpForm/>
            </BackgroundGradient>
        </div>
    )
}