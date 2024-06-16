import express from "express";
import { addVideo, addView, deleteVideo, getBytags, getFauvouriteVideosByUserId, getLikedVideosByUserId, getVideo, getVideosById, random, search, shareVideo, sub, trend } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,addVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/user/:userId",getVideosById)
router.get("/find/:id",getVideo)
router.get("/user/like/:userId", verifyToken, getLikedVideosByUserId);
router.get("/user/favourite/:userId", verifyToken, getFauvouriteVideosByUserId);

router.put("/view/:id",addView)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifyToken,sub)

router.get("/tags",getBytags)
router.get("/search",search)
router.get("/share/:id", verifyToken, shareVideo);
export default router;