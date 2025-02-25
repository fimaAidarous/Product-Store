import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

dotenv.config(); 

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MONGODB');
})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();


app.use(express.json()); 

app.listen(800, () => {
    console.log('Server is running on port 800');
} 
);

app.use("/api/products",productRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });

app.use(( err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    return res.status(statusCode).json ({
        success: false,
        statusCode,
        message,
    });
});
