const mongoose = require("mongoose");

/* MONGO-DB CONNECTION */
async function connectToMongoDb(MONGO_URL) {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB ✅ `);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectToMongoDb;
