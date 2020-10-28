const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 8081;

const db = require("./models");


const app = express();

const databaseName = "workout_db"

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://jamierachael:Cheeseme1@ds141924.mlab.com:41924/heroku_rp5k8lsz", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`Successfully connected to database: ${databaseName}`))

// Requiring our routes

app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});