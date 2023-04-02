const mongoose = require("mongoose");
const dotEnv = require("dotenv");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
dotEnv.config({ path: "backend/config/config.env" }); // Load environment variables from .env file.

if (!process.env.DBURLONLINE) {
  console.log("Error: DBURLONLINE environment variable is not defined.");
  process.exit(1);
}

// Connect to MongoDB using the DBURLONLINE environment variable.
mongoose.connect(
  process.env.DBURLONLINE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Connected successfully to MongoDB.");
    } else {
      console.log(`Error in DB connection: ${err}`);
    }
  }
);
