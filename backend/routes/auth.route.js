import express from 'express';
import { signup ,login,signout,userProfile,updateUserProfile } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile',verifyToken,userProfile);
router.put('/update-profile',verifyToken,updateUserProfile)
router.post('/sign-out',signout)

export default router;