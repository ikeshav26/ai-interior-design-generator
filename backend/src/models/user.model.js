import mongoose from 'mongoose';


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },email:{
        type:String,
        unique:true,
        required:true
    },password:{
        type:String,
        required:true
    },createdAt:{
        type:Date,
        default:Date.now
    },updatedAt:{
        type:Date,
        default:Date.now
    },avatar:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1732757787588-29df717691f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHVtbXklMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D"
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;