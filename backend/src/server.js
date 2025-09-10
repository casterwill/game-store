import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import gamesRoutes from "./routes/games.route.js";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Security middleware to set various HTTP headers
app.use(morgan("dev")); // Logging middleware for HTTP requests

app.get("/", (req, res) => {
  res.json({ message: "Welcome to GameHub API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/games", gamesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
