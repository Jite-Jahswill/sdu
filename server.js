const express       = require("express");
const dotenv        = require("dotenv");
const cookieParser  = require("cookie-parser");
const cors          = require("cors");
const swaggerUi     = require("swagger-ui-express");
const swaggerSpec   = require("./swagger");
const authRoutes    = require("./routes/auth");
const postRoutes    = require("./routes/post");
const chatRoutes    = require("./routes/chat");
const sequelize     = require("./config/db");
const path          = require("path");

dotenv.config();

const app = express();

/* ───────────────  CORS  ─────────────── */
const allowedOrigins = ["http://localhost:5500"];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g., mobile apps, curl)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,                               // if you use cookies / auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Handle pre-flight requests quickly
app.options("*", cors({ origin: allowedOrigins, credentials: true }));
/* ─────────────────────────────────────── */

app.use(cookieParser());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth",  authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
