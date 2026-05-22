import express from "express";
import { userSignOut, userSignIn, userSignUp } from "../controllers/auth.controller.js";

const app = express();

app.post('/sign-up', userSignUp);
app.post('/sign-in', userSignIn);
app.post('/sign-out', userSignOut);

export default app;

const router = express.Router();

router.post('/sign-up', userSignUp);
router.post('/sign-in', userSignIn);
router.post('/sign-out', userSignOut);

export default router;

