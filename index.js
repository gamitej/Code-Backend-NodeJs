const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const connectToMongoDb = require("./utils/dbConnection");
// middleware
const Protect = require("./middlewares/Protect.js");
// utils
const SwaggerOptions = require("./utils/swagger");
// routes
const authRoutes = require("./routes/auth.js");
const exploreRoutes = require("./routes/explore.js");

// ======= SWAGGER OPTIONS START =======

const swaggerSpec = swaggerJsDoc(SwaggerOptions);

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

connectToMongoDb(MONGO_URL);

// ============ SWAGGER =========
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========= ROUTES =========
app.use("/api/v1", authRoutes);
app.use("/api/v1", Protect, exploreRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
