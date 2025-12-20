import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MdArrowForward } from "react-icons/md"


export default function TextareaDemo() {
    return (
        <div className="relative rounded-sm h-40 w-2xl overflow-hidden">
            <Textarea placeholder="Type your message here" className="h-full bg-darker border-y border-neutral-800 overflow-hidden resize-none" />
            <Button className="absolute bottom-4 right-4 rounded-sm aspect-square h-8 w-8 bg-[#7B7B7B] hover:bg-neutral-200 cursor-pointer !p-0">
                <MdArrowForward className="text-neutral-900" />
            </Button>
        </div>
    )
}

