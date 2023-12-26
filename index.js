const express = require("express");
const Database = require("./config/database.js");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// middleware
const Protect = require("./middlewares/Protect.js");
// utils
const SwaggerOptions = require("./utils/swagger");
// routes
const authRoutes = require("./routes/auth.js");
const exploreRoutes = require("./routes/explore.js");
const profileRoutes = require("./routes/profile.js");

// ========== MIDDLEWARE ==========
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// ========= ENV VARIABLE'S =========
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// database connection
const db = new Database(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connect().catch((err) =>
  console.error("❌ Error connecting to database:", err)
);

// ============ SWAGGER =========
const swaggerSpec = swaggerJsDoc(SwaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========= ROUTES =========
app.use("/api/v1", authRoutes);
app.use("/api/v1", Protect, exploreRoutes);
app.use("/api/v1/profile", Protect, profileRoutes);

// database disconnection
process.on("SIGINT", async () => {
  try {
    await db.disconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
