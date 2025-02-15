import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 800;
app.use(express.json()); 
 // allow us accept json data in the req body

app.use("/api/products",productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("server is started at " + PORT);
});
