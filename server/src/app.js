import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

// Register ONLY the webhook with raw body
app.use(
    "/api/v1/payments/webhook",
    express.raw({ type: "application/json" })
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import returnRoutes from "./routes/return.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import shiprocketRoutes from "./routes/shiprocket.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/return", returnRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/shiprocket", shiprocketRoutes);


export default app;