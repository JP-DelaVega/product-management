import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.get("/api/health", (req, res) => {
  res.send("API is working");
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
