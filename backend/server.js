const app = require("./app");
const dotEnv = require("dotenv");
dotEnv.config({ path: "backend/config/config.env" });
require("./config/database");
// Handling of Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception ");
  process.exit(l);
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on port : ${process.env.PORT} `)
);

// Handle the Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    propess.exit(l);
  });
});
