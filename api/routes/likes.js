import express from "express"
import { getLike, addLike, deleteLike } from "../controllers/like.js";
const router = express.Router()

router.get("/getlike", getLike )
router.post("/addlike", addLike)
router.delete("/deletelike", deleteLike)
export default router;