import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from "express"
import dotenv from "dotenv"
import connectDB from './database/db.js';
import userRoute from "./routes/user.routes.js"
import courseRoute from "./routes/course.route.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:5173", // your frontend codespace URL
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


//apis
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
// "http://localhost:8000/api/v1/user/register"

connectDB()
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})
  