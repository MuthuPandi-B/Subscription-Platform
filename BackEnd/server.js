import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import boxModelRoutes from "./routes/boxModelRoutes.js";
import homeContentRoutes from "./routes/homeContentRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
dotenv.config();
connectDB();
const app = express();

app.use(cors(
    {
        origin: "https://learning-platform-lac.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,}
));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/boxmodels", boxModelRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/messages",messageRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
