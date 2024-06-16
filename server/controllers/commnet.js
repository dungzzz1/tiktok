import { createError } from "../err.js"
import Comment from "../models/Commnet.js"
import Video from "../models/Video.js"

export const addCommnet = async (req,res, next) =>{
    const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
}
export const deleteCommnet = async (req,res, next) =>{
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    const video = await Video.findById(comment.videoId);

    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json("The comment was deleted successfully.");
    } else {
      return next(createError(403, "You cannot delete this comment."));
    }
  } catch (err) {
    next(err);
  }
}
// router.delete('/comments/:id', async (rep, res, next) => {
//     try {
//       const commentId = req.params.id;
//       const comment = await Comment.findById(commentId);
  
//       if (!comment) {
//         return res.status(404).json({ message: 'Comment not found' });
//       }
  
//       // Check if the authenticated user has permission to delete the comment
//       const userId = req.user.id; // Assuming you have user authentication implemented
//       if (comment.userId !== userId) {
//         return res.status(403).json({ message: 'You can only delete your own comment' });
//       }
  
//       await Comment.findByIdAndDelete(commentId);
//       res.status(200).json({ message: 'Comment deleted successfully' });
//     } catch (error) {
//       next(error);
//     }
//   });
export const getCommnets = async (rep,res, next) =>{
    try{
        const commnets = await Comment.find({videoId:rep.params.videoId})
        res.status(200).json(commnets)
    }catch(err){
        next(err)
    }
}