import mongoose from "mongoose"
import User from "../../models/User.js"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
import { createError } from "../../err.js";
export const signup = async (rep,res,next ) =>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rep.body.passwrod, salt);
        const newUser = new User({...rep.body,passwrod:hash})
        await newUser.save()
        res.status(200).send("hihi")
    }catch(err){
        next(err)
    }
};
export const signin = async (req,res,next ) => {
    try{
        const user = await User.findOne({name:req.body.name})
        if(!user) return next(createError(404,"user loi"))

        const isCorrect = await bcrypt.compare(req.body.passwrod, user.passwrod)
        if(!isCorrect) return next(createError(400,"pass loi"))

        const token  = jwt.sign({id:user._id}, process.env.JWT)
        const {passwrod, ...others} = user._doc
        res.cookie("account",token,{
            httpOnly:true
        })
        .status(200)
        .json(others);
    }catch(err){
        next(err)
    }
};

export const googleAuth = async (req, res, next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token  = jwt.sign({id:user._id}, process.env.JWT)
            res.cookie("account",token,{
                httpOnly:true
            })
            .status(200)
            .json(user._doc);
        }else{
            const newUser = new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save()
            const token  = jwt.sign({id:savedUser._id}, process.env.JWT)
            res.cookie("account",token,{
                httpOnly:true
            })
            .status(200)
            .json(savedUser._doc);
        }
    }catch(err){
        next(err)
    }
      
};