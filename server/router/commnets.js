import express from "express";
import { addCommnet, deleteCommnet, getCommnets } from "../controllers/commnet.js";
import { verifyToken } from "../verifyToken.js"

const router = express.Router();

router.post("/",verifyToken, addCommnet)
router.delete("/:id",verifyToken, deleteCommnet)
router.get("/:videoId",verifyToken, getCommnets)

export default router;