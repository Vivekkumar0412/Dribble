import { prisma } from "@repo/database";
import { Request, Response } from "express";
import { chatSchema } from "@repo/types";


export default async function createPrompt(req: Request, res: Response) {

    const promptData = chatSchema.safeParse(req.body);
    if (!promptData.success) {
        return res.status(403).json({
            success: false,
            message: "Invalid prompt data"
        })
    };

    const { prompt, projectId } = promptData.data;
    if (!prompt || prompt == "") {
        return res.status(500).json({
            success: false,
            message: "Prompt can not be empty"
        })
    };

    const currentUser = req.user;

    if (!currentUser || typeof currentUser === "string") {
        return res.status(403).json({
            success: false,
            message: "user not authorized"
        })
    };


    const userId = currentUser.id;

    try {
        let finalProjectId = projectId;

        if (projectId) {
            const project = await prisma.project.findUnique({
                where: {
                    id: projectId,
                    userId
                }
            });

            if (!project) {
                
                const project = await prisma.project.create({
                    data: {
                        title: "new project",
                        userId
                    }
                });

                finalProjectId = project.id;
            } 
        } else {
            const project = await prisma.project.create({
                data: {
                    title: "new project",
                    userId
                }
            });

            console.log("project is created. ", project)
            finalProjectId = project.id;
        };

        const response = await prisma.$transaction(async (tx) => {

            const chat = await tx.chat.create({
                data: {
                    prompt,
                    role : "USER",
                    projectId : finalProjectId!,
                    userId
                },
                include: {
                    project: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
            return chat

        });

        return res.status(201).json({
            success: true,
            message: "Chat created successfully",
            data: response,
        });
    } catch (error) {
        console.log(error, " error while creating user prompt");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}   