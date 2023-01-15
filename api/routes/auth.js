import express from "express";
import { getRegister, getLogin, getLogout } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", getRegister)
router.post("/login", getLogin)
router.post("/logout", getLogout)

export default router