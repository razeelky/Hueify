import express from "express";
import { userSignOut, userSignIn, userSignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/sign-up', userSignUp);
router.post('/sign-in', userSignIn);
router.post('/sign-out', userSignOut);

export default router;

