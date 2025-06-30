import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://product-management-d8ctc7ecgpg6huf5.southeastasia-01.azurewebsites.net" // <-- Replace with your deployed frontend URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

//app.use("/api/products", productRoutes);
app.use(
  "/api/products",
  (req, res, next) => {
    console.log(`API called: ${req.method} ${req.originalUrl}`);
    next();
  },
  productRoutes
);

app.get("/api/health", (req, res) => {
  res.send("API is working");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB();

app.listen(PORT, () => { 
  console.log("Server running on PORT:", PORT);
});

console.log("test");
