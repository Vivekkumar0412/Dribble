import express, { Router } from "express";
import userPromptController from "../controller/userprompt.controller";
const prompt_router : Router= express.Router();

prompt_router.post("/",userPromptController);

export default prompt_router