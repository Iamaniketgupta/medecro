import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser());

//routes import 
import userRouter from './routes/user.routes.js'
import storyRouter from "./routes/story.routes.js";
import branchRouter from "./routes/branch.routes.js"
import chapterRouter from "./routes/chapter.routes.js";
import characterRouter from "./routes/character.routes.js"

import invitationRouter from './routes/invitation.routes.js';
import Gemini from "./Ai.js";

// routes declaration
app.get("/" , (Req,res)=>{
    res.send(
        "hello"
    )
})

app.post("/askai",async(req,res)=>{
    const{prompt} = req.body;
    const response = await Gemini.getInstance().getGeminiTextOutput(prompt);
    console.log(response)
    return res.json({response}) 
})
app.use("/users" , userRouter);
app.use("/story" , storyRouter);
app.use("/branch" , branchRouter );
app.use("/chapter" , chapterRouter );
app.use("/character" , characterRouter );
app.use("/invitation" , invitationRouter);


export {app} 