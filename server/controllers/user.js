import { createError } from "../err.js"
import User from "../models/User.js"
import Video from "../models/Video.js"
export const update = async (req, res,next) =>{
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
}
export const deletes = async (rep, res,next) =>{
    if(rep.params.id === rep.user.id){
        try{
            const updateUser = await User.findByIdAndDelete(rep.params.id,)
            res.status(200).json("delete")
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403,"you can delete"))
    }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribersUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribersUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("Liked successfully.")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $pull:{likes:id},
      $addToSet:{dislikes:id}
    })
    res.status(200).json("Disliked successfully.")
  } catch (err) {
    next(err);
  }
};
export const favourite = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{favourite:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("Liked successfully.")
  } catch (err) {
    next(err);
  }
};

export const disfavourite = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $pull:{favourite:id},
      $addToSet:{dislikes:id}
    })
    res.status(200).json("Disliked successfully.")
  } catch (err) {
    next(err);
  }
};
export const getSubscribedUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("subscribersUsers");
    const subscribedUsers = user.subscribersUsers.map((subscriber) => ({
      _id: subscriber._id,
      name: subscriber.name,
      email: subscriber.email,
      img: subscriber.img,
      createdAt: subscriber.createdAt,
      updatedAt: subscriber.updatedAt,
    }));
    res.status(200).json(subscribedUsers);
  } catch (err) {
    next(err);
  }
};
export const getFolowingByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const subscribersUsers = user.subscribersUsers;
    const followingUsers = await User.find({ _id: { $in: subscribersUsers } });
    res.status(200).json(followingUsers);
  } catch (err) {
    next(err);
  }
};
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const users = await User.find({ name: { $regex: query, $options: "i" } }).limit(40);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

