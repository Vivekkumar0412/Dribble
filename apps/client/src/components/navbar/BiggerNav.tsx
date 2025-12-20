import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";

interface NavData {
    slug: string,
    icon?: any,
    className?: string,
    onClick: () => void,
}

interface BiggerNavbarProps {
    setOpenNavbar: Dispatch<SetStateAction<boolean>>;
}

export default function BiggerNav({ setOpenNavbar}: BiggerNavbarProps) {
    const navData: NavData[] = [
        {
            slug: "Main",
            icon: RxCross1,
            className: 'mb-5 font-bold',
            onClick: () => setOpenNavbar(prev => !prev),
        },
        {
            slug: "Lovable",
            onClick: () => { }
        },
        {
            slug: "About",
            onClick: () => { }
        },
        {
            slug: "Projects",
            onClick: () => { }
        },
        {
            slug: "Contacts",
            onClick: () => { }
        },
    ]

    const containerVariants = {
        hidden: { y: -50 },
        visible: {
            y: 0,
            transition: {
                duration: 0.2,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                duration: 0.5,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            x: 100,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div 
            className="w-full h-fit bg-[#545456] flex justify-center items-end flex-col gap-y-4 p-10  text-2xl z-999 absolute"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {
                navData.map((data) => (
                    <motion.div 
                        key={data.slug}
                        onClick={data.onClick} 
                        className={cn("flex items-center justify-center gap-x-1 cursor-pointer", data.className)}
                        variants={itemVariants}
                    >
                        {data.icon && <data.icon className="size-12" />}
                        <Button className="hover:bg-primary hover:text-light text-4xl font-medium" variant={'ghost'}>{data.slug}</Button>
                    </motion.div>
                ))
            }
        </motion.div>
    )
}