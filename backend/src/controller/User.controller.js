import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import nodemailer from 'nodemailer';

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


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = randomOtp;
    await user.save();

    const auth = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const receiver = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: "Your password reset otp :" + randomOtp
    };

    // Use async/await instead of callback to prevent double res.json call
    await auth.sendMail(receiver);

    res.status(200).json({ message: 'Otp sent to your mail' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const verifyOtp=async(req,res)=>{
    try{
        const {email,newPassword,otp}=req.body;
        if(!otp){
            return res.status(400).json({ message: 'OTP is required' });
        }

        const user=await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const randomOtp=user.otp;

        if(otp != randomOtp){
            return res.status(400).json({ message: 'Invalid OTP' });
        }else{
            const hashedPassword=await bcrypt.hash(newPassword, 10);
            user.password=hashedPassword;
            await user.save();
        }
        res.status(200).json({ message: 'OTP verified successfully', userId: user._id });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const updateUsername=async(req,res)=>{
    try{
        const userId=req.user;
        const {username}=req.body;

        if(!username){
            return res.status(400).json({ message: 'Username is required' });
        }

        const user=await User.findByIdAndUpdate(userId, { username }, { new: true });

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Username updated successfully', user });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

