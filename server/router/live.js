import express from "express";
import { addVideo, randomlive } from "../controllers/live.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();
router.post("/",verifyToken,addVideo)
router.get("/random",randomlive)

export default router;