const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
// Connect MongoDB at default port 27017.
mongoose.connect(
    process.env.DBURLONLINE, {
        useNewUrlParser: true,
    },
    (err) => {
        if (!err) {
            console.log("connect successfully to MongoDB.");
        } else {
            console.log(`Error in DB connection:  ${err} `);
        }
    }
);