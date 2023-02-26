const app = require("./app");
const dotEnv = require("dotenv");
dotEnv.config({path: "backend/config/config.env"});
require("./config/database");

app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on port : ${process.env.PORT} `)
);