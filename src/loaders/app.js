import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import connectDB from "./db.config.js";
import errorDetails from "../middleware/error.middleware.js";
import roleRoute from "../routes/role.routes.js";
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Log every request with method & path
app.use((req, res, next) => {
    console.log(`Method:[${req.method}] , Url ${req.originalUrl}`);
    next();
});


// (100 requests allow in per 2 minutes)
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// call all main routes which project required
app.use("/api/roles", roleRoute);
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// Global error handler middleware
app.use(errorDetails);

// Handle sync error
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    process.exit(1);
});

// connect to DB
connectDB.init();


// Handle async error
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
    process.exit(1);
});

export default app;