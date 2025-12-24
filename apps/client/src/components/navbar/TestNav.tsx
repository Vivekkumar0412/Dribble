'use client';
import { useState } from "react"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestNavItems {
    title: string,
    icon?: string
};

const navitems: TestNavItems[] = [
    {
        title: "featured"
    },
    {
        title: "pricing"
    },
    {
        title: "contact"
    }
]

export default function TestNav() {
    const [currentHovered, setCurrentHovered] = useState<number>();

    return (
        <div className="z-999 h-4 max-w-6xl w-full mx-auto fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center p-8 text-base border border-neutral-800 rounded-sm backdrop-blur-xs bg-linear-to-b from-neutral-900 via-transparent to-neutral-900">
            <section>
                <h2>Dribble</h2>
            </section>
            <section className="flex justify-center items-center gap-x-6">
                {navitems && navitems.length > 0 && navitems.map((item, idx) => {
                    const isHovered = currentHovered === idx
                    console.log("is hovered is ; ", isHovered)
                    return (
                        <a onMouseEnter={() => setCurrentHovered(idx)} className="relative px-4 py-2 cursor-pointer" key={idx}>
                            {isHovered && (
                                <motion.div
                                    layoutId="hovered"
                                    className="bg-neutral-100 inset-0 h-full w-full absolute rounded-sm"
                                />
                            )}
                            <div className={cn("relative z-20 text-white", isHovered && "text-gray-900")}>
                                {item.title}
                            </div>
                        </a>
                    )
                })}
            </section>
            <section className="flex justify-center items-center">
                <Button>Login</Button>
            </section>
        </div>
    )
}