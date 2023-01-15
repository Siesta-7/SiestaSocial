import express from "express";
import userRouter from "./routes/users.js"
import postRouter from "./routes/posts.js"
import likeRouter from "./routes/likes.js"
import commentRouter from "./routes/comments.js"
import authRouter from "./routes/auth.js"
import relationshipRouter from "./routes/relationships.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
app.use(express.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "../client/public/upload")
    },
    filename: function (request, file, callback) {    
      callback(null, Date.now() + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res)=>{
    
    const file = req.file
    res.status(200).json(file.filename)
})


app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/like", likeRouter)
app.use("/api/comment", commentRouter)
app.use("/api/auth", authRouter)
app.use("/api/relationship", relationshipRouter)



app.listen(8800, ()=>{
    console.log("Server is running on port 8800")
})

