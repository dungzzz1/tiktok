import jwt from "jsonwebtoken";
import {createError} from "./err.js"

export const verifyToken = (rep,res,next) =>{
    const token = rep.cookies.account
    if(!token) return next(createError(401,"you are not update"))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"you are update"))
        rep.user = user;
        next()
    })
}