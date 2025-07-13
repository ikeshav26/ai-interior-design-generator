import express from 'express';
import { changeAvatar, Login, Logout, Signup } from '../controller/User.controller.js';
import {UserAuth} from '../middleware/user.auth.js';


const router=express.Router();


router.post('/signup',Signup)
router.post('/login',Login)
router.get('/logout',Logout)
router.post('/update/avatar',UserAuth,changeAvatar)



export default router;