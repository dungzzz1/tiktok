import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./router/users.js"
import videoRouter from "./router/videos.js"
import liveRouter from "./router/live.js"
import commnetRouter from "./router/commnets.js"
import authRouter from "./router/auth/auth.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("thanh cong")
    }).catch(err=>{
        throw err;
    })
}
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRouter)
app.use("/api/lives",liveRouter)
app.use("/api/videos",videoRouter)
app.use("/api/commnets",commnetRouter)
app.use("/api/auth",authRouter)


app.use((err,rep,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "fixxx";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(8000,() =>{
    connect()
    console.log("conlect!!!!!")
})