import express from "express";
import { getComment } from "../controllers/comment.js";
import { addComment } from "../controllers/comment.js";
const router = express.Router()

router.get("/getcomment", getComment)
router.post("/addcomment", addComment)

export default router;