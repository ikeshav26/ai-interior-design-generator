import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI=process.env.MONGODB_URI;


const connectToMongodb=async()=>{
    try{
    await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectToMongodb;