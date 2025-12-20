import express, { Router } from "express";
import signinController from "../controller/signin.controller";
const signinRouter : Router = express.Router();

signinRouter.post("/signin",signinController);
export default signinRouter;