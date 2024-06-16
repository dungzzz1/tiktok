import express from "express";
import { deletes, dislike, getUser, like, subscribe, unsubscribe, update,getSubscribedUsers, getFolowingByUserId, search, favourite, disfavourite } from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js"


const router = express.Router();

router.put("/:id",verifyToken,update)

router.get("/:id",verifyToken,getSubscribedUsers)

router.get("/folowing/:id",verifyToken,getFolowingByUserId)

router.delete("/:id",verifyToken,deletes)

router.get("/find/:id",getUser)

router.put("/sub/:id",verifyToken,subscribe)

router.put("/unsub/:id",verifyToken,unsubscribe)

router.put("/like/:videoId",verifyToken,like)

router.put("/dislike/:videoId",verifyToken,dislike)

router.put("/favourite/:videoId",verifyToken,favourite)

router.put("/disfavourite/:videoId",verifyToken,disfavourite)

router.get("/search",search)
export default router;