import {db} from "../connect.js"
import jwt from "jsonwebtoken"
export const getFollower = (req, res)=>{

    const q = "SELECT follower FROM relationships WHERE followed = ?"
    
    db.query(q, [req.query.follower], (err,data)=>{
        if (err) res.status(401).json(err)
        res.status(200).json(data.map(relationship=>relationship.follower))
    })
}

""
export const addFollower = (req, res)=>{
    
    const token = req.cookies.jwt
    if (!token) res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if (err) res.status(402).json("Token is not valid")
        const q = "INSERT INTO relationships (`follower`, `followed`) VALUES (?)"

        const values=[userInfo.id, req.body.userId]
        db.query(q, [values], (err, data)=>{
            if (err) return res.status(500).json(err)
            return res.status("Following")
        })
    })
  
}

export const deleteFollower = (req, res) =>{

    const token = req.cookies.jwt
    if(!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if(err) return res.status(402).json("Token is not valid")

        const q = "DELETE FROM relationships WHERE `follower` = ? AND `followed` = ?"
        db.query(q, [userInfo.id, req.query.userId], (err,data)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json("Unfollowed")
        } )

    })

}

