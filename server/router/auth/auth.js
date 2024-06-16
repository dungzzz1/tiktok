import express from "express";
import {  signup,signin, googleAuth,  } from "../../controllers/auth/auth.js";

const router = express.Router();

//create a use
router.post("/signup",signup)
//sign in
router.post("/signin",signin)
//gooole auth
router.post("/google",googleAuth)




export default router;