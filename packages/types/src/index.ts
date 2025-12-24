import z from "zod";


const cuidSchema = z.string({message : "Can not be empty"}).cuid({message : "Invalid cuid format"})
const dateSchema = z.coerce.date();

export const chatSchema = z.object({
    id : cuidSchema,
    prompt : z.string({message : "Prompt can not be empty"}).min(1).max(5000),
    userId : z.string({message : "user id is required "}),
    projectId : z.string().optional()
})


export const projectSchema = z.object({
    id : cuidSchema,
    title : z.string({message : "Title is required"}).min(1).max(100),
    userId : z.string({message : "user id is required"}),
    promptId : z.string({message : "prompt id is required"}),
    chats : z.array(chatSchema).optional()
})

export const userSchema = z.object({
    id : cuidSchema,
    name : z.string({message : "Name is required"}).min(2).max(100),
    email : z.string({message : "Email is required"}).email({message : "Not in the email format"}),
    emailVerified : dateSchema,
    userPompts : z.array(chatSchema).optional(),
    projects : z.array(projectSchema).optional()
})




export type User = z.infer<typeof userSchema>
export type Chat = z.infer<typeof chatSchema>
export type Project = z.infer<typeof projectSchema>