import { prisma } from "@repo/database";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken"

export default async function signinController(req: Request, res: Response) {
    const { user } = req.body;
    console.log("user is : ", user);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    };
    try {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        console.log('existing user is : ', existedUser)
        let myUser;
        if (existedUser) {
            myUser = await prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    name: existedUser.name,
                    email: existedUser.email,
                    id: existedUser.id,
                    emailVerified: existedUser.emailVerified
                }
            })
        } else {
            myUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified
                }
            });
        };

        const jwtPayload = {
                name: myUser.name,
                id: myUser.id,
                email: myUser.email
            };

            const secret = process.env.JWT_SECRET;
            console.log("secret is : ", secret);
            if (!secret) {
                return res.status(500).json({
                    success: false,
                    message: "Jwt secret not found"
                })
            };

            const token = Jwt.sign(jwtPayload, secret);
            console.log("token is : ", token);
            if (!token || token == " ") {
                return res.status(500).json({
                    success: false,
                    message: "No token found"
                })
            };
            res.json({
                success: true,
                user: myUser,
                token: token,
            });
            console.log({
                success: true,
                user: myUser,
                token: token,
            })
            return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Authentication failed',
        });
        return;
    }

}