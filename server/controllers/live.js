import User from "../models/User.js"
import Video from "../models/Live.js"
import { createError } from "../err.js"

export const addVideo = async (rep, res ,next) =>{
    const newVideo = new Video({userId:rep.user.id, ...rep.body});
    try{
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    }catch(err){
        next(err)
    }
}
export const randomlive = async (rep, res ,next) =>{
    try{
        const videos = await Video.aggregate([{ $sample: {size:40}}])
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}