import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import colors from "colors";
import connectToDb from './config/db.js';
import morgan from 'morgan';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

// rest Object
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Connection to server
connectToDb();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// rest api
app.get("/", (req, res) => {
    res.status(201).send({
        message: "Welcome to ecommerce app",
    })
})

// PORT
app.listen(process.env.PORT || 8081, () => {
    console.log(`server is running on PORT ${process.env.PORT}`.bgCyan.white);
})

