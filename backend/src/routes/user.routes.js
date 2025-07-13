import express from 'express';
import { changeAvatar, forgotPassword, Login, Logout, Signup, updateUsername, verifyOtp } from '../controller/User.controller.js';
import {UserAuth} from '../middleware/user.auth.js';


const router=express.Router();


router.post('/signup',Signup)
router.post('/login',Login)
router.get('/logout',Logout)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOtp)
router.post('/update/avatar',UserAuth,changeAvatar)
router.post('/update/username',UserAuth,updateUsername)



export default router;