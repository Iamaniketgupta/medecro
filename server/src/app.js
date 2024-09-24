import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
import groqRoutes from '../src/routes/groqRoutes.js';
import userRouter from "./routes/user.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
import clinicRouter from "./routes/clinic.routes.js"
import reviewRouter from "./routes/review.routes.js"
import slotRouter from "./routes/slot.routes.js"
import appointmentRouter from "./routes/appointment.routes.js"

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))


app.use(express.json())
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser());


app.use(groqRoutes);
app.use("/users" , userRouter);
app.use("/doctor" , doctorRouter);
app.use("/clinic" , clinicRouter);
app.use("/review" , reviewRouter);
app.use("/slot" , slotRouter);
app.use("/appointment" , appointmentRouter);

export {app} 