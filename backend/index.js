import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import userRouter from "./routes/userRouter.js"
import accidentRouter from "./routes/accidentRouter.js"
import signalRouter from "./routes/signalRouter.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/signals", signalRouter);
app.use("/api/users", userRouter)
app.use("/api/accidents", accidentRouter)

app.use("/images", express.static("images"))

mongoose.connect("mongodb://127.0.0.1:27017/hakason")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(7000,()=>{
    console.log("Server running on port 7000")
})