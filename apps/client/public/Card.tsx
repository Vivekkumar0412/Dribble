import Image from "next/image";
import OpacityBackground from "./ui/OpacityBackground";
import { Dispatch, SetStateAction } from "react";
import { app_name } from "../const/bussiness";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react"
interface CardProps {
    setOpenSignInCard: Dispatch<SetStateAction<boolean>>
}
export default function Card({ setOpenSignInCard }: CardProps) {

    function handleSignin() {
        signIn("google", {
            redirect: false
        })
    }

    return (
        <OpacityBackground onBgClick={() => setOpenSignInCard(false)}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-center items-center w-full max-w-4xl h-[35rem] rounded-[4px] overflow-hidden shadow-2xl"
            >
                <section className="flex-1 relative h-full ">
                    <Image
                        src="/orange_gradient.png"
                        alt="bmw"
                        fill={true}
                        className="object-cover"
                    />
                </section>
                <section className="flex justify-center items-center flex-col h-full w-[50%] bg-neutral-950 border border-neutral-800 border relative">
                    <div className="w-full px-10">
                        <div className="w-full absolute top-[15%] left-1/2 -translate-x-1/2">
                            <h2 className="text-center text-2xl text-shadow-amber-100">welcome to {app_name}</h2>
                            <p className="text-neutral-400 text-center">Get staeted- Its free no credit card required</p>
                        </div>
                        <div className="flex justify-center items-center gap-x-2 w-full">
                            <Button onClick={handleSignin} className="bg-dark py-6 hover:bg-darkest w-full">
                                <Image
                                    src="/icons/google_icon.png"
                                    alt="google icon"
                                    unoptimized
                                    className="object-cover"
                                    height={20}
                                    width={20}
                                />
                                <span>
                                    Sing in with google
                                </span>
                            </Button>
                        </div>
                    </div>
                </section>

            </div>
        </OpacityBackground>
    )
}