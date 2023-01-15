import {db} from "../connect.js"
import jwt from "jsonwebtoken"
export const getUser = (req, res)=>{

    const userId = req.params.userId
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, [userId], (err,data)=>{
        if(err) res.status(401).json(data)
        const {password, ...info} = data[0]
        return res.status(200).json(info)
    })
}

export const updateUser = (req,res) => {
    const token = req.cookies.jwt
    if (!token) return res.status(401).json("Not logged in")
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) res.status(402).json("Token is not valid")
        const q = "UPDATE users SET `name`=?, `coverPic`=?, `profilePic`=?, `city`=?, `website`=? WHERE id = ?"
        const values = [
            req.body.name,
            req.body.coverPic,
            req.body.profilePic,
            req.body.city,
            req.body.website,
            userInfo.id
        ]
        db.query(q, values, (err, data)=>{
            if (err) return res.status(500).json(err)
            if (data.affectedRows > 0) return res.status(200).json("User updated")
            return res.status(404).json("Nothing changed")
        })
    })
}