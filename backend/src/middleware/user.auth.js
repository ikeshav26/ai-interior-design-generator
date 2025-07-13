import jwt from 'jsonwebtoken';


export const UserAuth = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}