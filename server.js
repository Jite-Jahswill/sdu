const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const authRoutes = require("./routes/auth");
const sequelize = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
