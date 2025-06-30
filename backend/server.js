import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin:
    process.env.NODE_ENV === "production"
      ? "https://product-management-test-hka7fsfac7dhbagj.canadacentral-01.azurewebsites.net"
      : "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.send("API is working");
});

// Serve frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Connect to DB and start server
connectDB();
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
