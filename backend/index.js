import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongodb from './src/config/connectDb.js';
import userRoutes from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import designRoutes from './src/routes/Design.routes.js';

const app = express();

// Load environment variables first
dotenv.config();


// Connect to MongoDB
connectToMongodb();

// CORS configuration - more permissive for development
app.use(cors({
    origin: [
        process.env.FRONTEND_URI 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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