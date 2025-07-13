import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongodb from './src/config/connectDb.js';

const app = express();
connectToMongodb

dotenv.config();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;



app.get('/',(req,res)=>{
    res.send("AI-interior-designer server")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});