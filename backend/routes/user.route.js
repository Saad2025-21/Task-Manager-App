import express from 'express';
import {verifyToken,adminOnly } from "../utils/verifyuser.js"
import {getUser } from "../controller/user.controller.js"

const router = express.Router();

router.get('/get-user', verifyToken,adminOnly,getUser);

export default router;

