import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from "express"
import dotenv from "dotenv"
import connectDB from './database/db.js';
import userRoute from "./routes/user.routes.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import cookieParser from 'cookie-parser';
import paymentRoute from "./routes/payment.route.js" 
import progressRoute from "./routes/courseProgress.route.js"
import cors from "cors"
import compression from 'compression';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//apis
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/payment", paymentRoute) 
app.use("/api/v1/progress", progressRoute)
// "http://localhost:8000/api/v1/user/register"

connectDB()
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})
  