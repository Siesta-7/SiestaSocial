import jwt from "jsonwebtoken"
import {db} from "../connect.js"

export const getLike = (req, res)=>{
    const q = "SELECT userId FROM likes WHERE postId = ?"
    db.query(q, [req.query.postId], (err, data)=>{
        if(err) res.status(401).json(err)
        res.status(200).json(data.map(like=>like.userId))
    })
}

export const addLike = (req, res)=>{
    const token = req.cookies.jwt
    if (!token) res.status(401).json("Not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if (err) res.status(402).json("Token is not valid")
        const q = "INSERT INTO likes (`postId`, `userId`) VALUES (?)"

        const values = [req.body.postId, userInfo.id]
        db.query(q, [values], (err, data)=>{
            if(err) res.status(403).json(err)
            res.status(200).json("Post has been liked")
        })
    })
}

export const deleteLike = (req, res)=>{
    const token = req.cookies.jwt
    if (!token) res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if (err) res.status(402).json("Token is not valid")
        const q = "DELETE FROM likes WHERE `postId` = ? AND `userId` = ?"
        db.query(q, [req.query.postId, userInfo.id], (err, data)=>{
            if(err) res.status(403).json(err)
            res.status(200).json("Post not liked")
        })
    })   
}

