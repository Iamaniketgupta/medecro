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


import userRouter from "./routes/user.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

app.use("/users" , userRouter);
app.use("/doctor" , doctorRouter);

export {app} 