const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// routes file
const authRoutes = require("./routes/auth.js");

// ======= SWAGGER OPTIONS START =======

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Code Web App",
      version: "1.0.0",
      description: "Code Web App API Documentation",
    },
  },
  apis: ["./routes/auth.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// ========== MIDDLEWARE ==========

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// ========= ENV VARIABLE'S =========

dotenv.config();
const PORT = process.env.PORT || 3000;

// ============ SWAGGER =========
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========= ROUTES =========
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
