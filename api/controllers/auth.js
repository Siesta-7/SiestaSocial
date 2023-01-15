import {db} from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getRegister =  (req, res)=>{
    
    //CHECK USER IF EXIST
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], async (err, data)=>{
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User has already been created")
        //CREATE a NEW USER
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(req.body.password, salt)

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(q, [values], (err, data)=>{
            if (err) return res.status(500).json(err)        
            return res.status(200).json("User has been created")
            
        })
    })   
}

export const getLogin = (req, res)=>{
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], async (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length == 0) return res.status(403).send("User not found")

        const passwordCheck = await bcrypt.compare(req.body.password, data[0].password)
        if(!passwordCheck) return res.status(404).json("password is wrong")

        const token = jwt.sign({id: data[0].id}, "secretkey")

        const {password, ...others} = data[0]
        
        res.cookie("jwt", token, {
            httpOnly:true,       
        }).status(200).json(others)
        
    })
}

export const getLogout = (req, res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out")
    
}