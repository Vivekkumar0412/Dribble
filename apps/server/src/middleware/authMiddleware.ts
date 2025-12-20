import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
export default async function authMiddlware(req : Request, res : Response, next : NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader || authHeader == "" || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({
            success : false,
            message : "Auth header empty"
        })
    };

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(404).json({
            success : false,
            message : "Token invalid"
        })
    };
    const secret = process.env.JWT_SECRET;
    if(!secret || secret == ""){
        return res.status(404).json({
            success : false,
            message : "Jwt secret not found"
        })
    }
    try {
        const decoded =  Jwt.verify(token,secret);
        if(!decoded){
            return res.status(400).json({
                success : false,
                message : "No user found"
            })
        };
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "internal server error"
        })
    }
}