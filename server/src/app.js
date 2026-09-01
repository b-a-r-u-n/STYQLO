import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(compression());

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api/v1", apiLimiter);

// Register ONLY the webhook with raw body
app.use("/api/v1/payments/webhook", express.raw({ type: "application/json" }));

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

// webhook route(for shiprocket)
import shiprocketWebhookRoutes from "./routes/shiprocket-webhook.routes.js"

// Sitemap route(for google)
import sitemapRoutes from "./routes/sitemap.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/return", returnRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/shiprocket", shiprocketRoutes);

// Shiprocket Webhooks
app.use("/api/v1/webhooks", shiprocketWebhookRoutes)


// Sitemap
app.use("/", sitemapRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "STYQLO API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});



export default app;