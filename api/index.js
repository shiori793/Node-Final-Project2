import express from 'express'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import authRoutes from './route/authRoutes.js'
import postRoute from './route/postRoute.js'
import path from 'path';
mongoose.set('strictQuery', true);

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    exposedHeaders: 'token'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '../client/build')));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error);
    }
}

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(PORT, () => {
    connect();
    console.log(`Server started on port ${PORT}`);
});