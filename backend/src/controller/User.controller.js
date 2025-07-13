import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

export const Signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword=await bcrypt.hash(password, 10);

        const newUser=new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save();

        const token=jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: 'production',
            sameSite: 'None'
        });

        res.status(201).json({ message: 'User created successfully', newUser });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid=await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token=jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: 'production',
            sameSite: 'None'
        });
        res.status(200).json({ message: 'Login successful', user });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const Logout=async(req,res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: 'production',
            sameSite: 'None'
        });
        res.status(200).json({ message: 'Logout successful' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const changeAvatar=async(req,res)=>{
    try{
        const userId=req.user;
        const {avatar}=req.body;

        if(!avatar){
            return res.status(400).json({ message: 'Avatar is required' });
        }

        const response=await cloudinary.uploader.upload(avatar, {
            folder: 'avatars',
            __filename:userId,
            resource_type: 'image'
        });

        const user=await User.findByIdAndUpdate(userId, { avatar: response.secure_url }, { new: true });

        res.status(200).json({ message: 'Avatar updated successfully', user });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}