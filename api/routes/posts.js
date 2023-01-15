import express from "express";
import { getPost, addPost, deletePost } from "../controllers/post.js";

const router = express.Router()

router.get("/getpost", getPost)
router.post("/addpost", addPost)
router.delete("/deletepost/:id", deletePost)

export default router;