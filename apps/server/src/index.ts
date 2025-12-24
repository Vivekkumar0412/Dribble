import "dotenv/config";
import express, { Request, Response } from "express";
import { prisma } from "@repo/database";
import signinRouter from "./routes/signin.route";
import authMiddlware from "./middleware/authMiddleware";
import prompt_router from "./routes/userprompt.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/auth",signinRouter)
app.use("/api/prompt",authMiddlware,prompt_router)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
