import express from "express";
import { getFollower, addFollower, deleteFollower } from "../controllers/relationship.js";

const router = express.Router()

router.get("/getfollower", getFollower)
router.post("/addFollower", addFollower)
router.delete("/deleteFollower", deleteFollower)
export default router;