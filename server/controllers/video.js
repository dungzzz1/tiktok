import User from "../models/User.js"
import Video from "../models/Video.js"
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
export const updateVideo = async (rep, res ,next) =>{
    try{
        const video = await Video.findById(rep.params.id);
        if(!video) return next(createError(404, " ko cos video"))
        if(rep.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
            rep.params.id,
            {
                $set: rep.body
            },
            {new:true}
            );
            res.status(200).json(updatedVideo)
        }else{
            return next(createError(403, " bn chi co the up 1 video"))
        }
    }catch(err){
        next(err)
    }
}
export const deleteVideo = async (rep, res ,next) =>{
    try{
        const video = await Video.findById(rep.params.id)
        if(!video) return next(createError(404, " ko cos video"))
        if(rep.user.id === video.userId){
            await Video.findByIdAndDelete(rep.parms.id,)
            res.status(200).json("video da xoa")
        }else{
            return next(createError(403, " xoa up 1 video"))
        }
    }catch(err){
        next(err)
    }
}
export const getVideo = async (rep, res ,next) =>{
    try{
        const video = await Video.findById(rep.params.id)
        res.status(200).json(video)
    }catch(err){
        next(err)
    }
}
export const addView = async (rep, res ,next) =>{
    try{
        await Video.findByIdAndUpdate(rep.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("view")
    }catch(err){
        next(err)
    }
}
export const random = async (rep, res ,next) =>{
    try{
        const videos = await Video.aggregate([{ $sample: {size:40}}])
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}
export const trend = async (rep, res ,next) =>{
    try{
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}
export const sub = async (req, res ,next) =>{
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribersUsers;
        const list = await Promise.all(
          subscribedChannels.map(async (channelId) => {
            return await Video.find({ userId: channelId });
          })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
      } catch (err) {
        next(err);
    }
}

export const getBytags = async (rep, res ,next) =>{
    const tags = rep.query.tags.split(",")
    console.log(tags)
    try{
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}
export const getVideosById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const videos = await Video.find({ userId: { $eq: userId } });
        res.status(200).json(videos);
      }catch (err) {
        next(err);
    }
}
export const getLikedVideosByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const videos = await Video.find({ likes: { $in: [userId] } });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
}
export const getFauvouriteVideosByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const videos = await Video.find({ favourite: { $in: [userId] } });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
}
export const search = async (rep, res ,next) =>{
    const query = rep.query.q
    try{
        const videos = await Video.find({title:{$regex:query, $options:"i"}}).limit(40)
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}

export const shareVideo = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      // Kiểm tra video có tồn tại hay không
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      // Tạo một bản sao của video để chia sẻ
      const sharedVideo = {
        userId,
        title: video.title,
        videoUrl: video.videoUrl,
        tags: video.tags,
        sharedFrom: video._id,
      };
      // Lưu userId vào mảng shares
      // Associate the userId with the video
      video.shares.push(userId);
      await video.save();
  
      res.status(200).json(sharedVideo);
    } catch (err) {
      return next(err);
    }
  };