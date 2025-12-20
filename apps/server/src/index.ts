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
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
});


app.get("/api/users",async(req: Request, res : Response)=>{
  const users = await prisma.user.findMany();
  res.status(200).json({
    success : true,
    message :"found all the users",
    user : users
  })
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
