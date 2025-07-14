import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongodb from './src/config/connectDb.js';
import userRoutes from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import designRoutes from './src/routes/Design.routes.js';

const app = express();
connectToMongodb();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


const PORT = process.env.PORT;



app.get('/',(req,res)=>{
    res.send("AI-interior-designer server")
})

app.use('/api/user',userRoutes)
app.use('/api/design',designRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});