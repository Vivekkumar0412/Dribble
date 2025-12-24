import express, { Router } from "express";
import createPrompt from "../controller/prompt.controller";

const prompt_router : Router= express.Router();

prompt_router.post("/",createPrompt);

export default prompt_router