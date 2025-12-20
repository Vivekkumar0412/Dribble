import { prisma } from "@repo/database";
import { Request, Response } from "express";

export default async function userPromptController(req : Request, res : Response){
    const {prompt} = req.body;
    if(!prompt || prompt == ""){
        return res.status(400).json({
            success : false,
            message : "User prompt is empty"
        })
    };
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
        const response = await prisma.userPrompts.create({
            data :{
                prompt : prompt,
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