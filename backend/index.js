import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import userTask from './routes/task.route.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB...', err));

//Middleware to handle CORS
app.use(cors({
    origin: process.env.FRONT_END_URL || 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON requests
app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/Task',userTask)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message
     });
});

export default app;
