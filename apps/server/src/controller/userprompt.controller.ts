import { prisma } from "@repo/database";
import { Request, Response } from "express";
import { chatSchema } from "@repo/types";
export default async function userPromptController(req : Request, res : Response){
    const prompt = chatSchema.safeParse(req.body);
    if(!prompt.success){
        return res.status(400).json({
            success : false,
            message : "User prompt is invalid"
        })
    };


    const validPrompt = prompt.data.prompt;
    const currentUser = req.user;
    if(!currentUser || typeof currentUser === 'string'){
        return res.status(404).json({
            success : false,
            message : "Not a valid uses"
        })
    };

    const userId = currentUser.id;
    if(!userId){
        return res.status(404).json({
            success : false,
            message : "No user id found"
        })
    }

    try {
        const response = await prisma.chat.create({
            data :{
                prompt : validPrompt,
                userId : userId
            }
        });

        res.status(200).json({
            success : true,
            response
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}