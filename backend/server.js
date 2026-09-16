import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 5000;

// Middleware (Must be defined before routes)
app.use(cors());
app.use(express.json());

// 1. Schema & Model Definition
const orderSchema = new mongoose.Schema({
  title: String,
  price: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

// 2. GET Route - Retrieve all orders (Changed req to _req to fix Deno no-unused-vars error)
app.get("/api/orders", async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST Route - Create order dynamically
app.post("/api/orders", async (req, res) => {
  try {
    const { title, price } = req.body;
    const newOrder = await Order.create({ title, price });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Server & Database Startup
const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/eliteautohub");
    console.log("MongoDB connected successfully");
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

startServer();
