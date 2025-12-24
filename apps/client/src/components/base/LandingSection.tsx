'use client';
import { JSX } from "react";
import TextareaDemo from "../input/Inputcomp";
import { Protest_Guerrilla, Yatra_One } from "next/font/google";
import { cn } from "@/lib/utils";
// const Protest Guerrilla
const protest = Protest_Guerrilla({
    weight: ["400"]
});
export default function LandingSection(): JSX.Element {
    return (
        <div className="relative z-50 max-h-screen min-h-screen flex items-center justify-center flex-col">
            <div className="">
                <h1 className={cn(
                    "text-[150px] text-[rgb(242, 243, 249)] text-center",
                    "tracking-widest text-transparent bg-clip-text bg-linear-to-b from-white via-neutral-400 to-black",
                    protest.className,
                )}>
                    Dribble
                </h1>
                <TextareaDemo />
            </div>
        </div>
    )
}