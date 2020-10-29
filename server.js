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

mongoose.connect(
    process.env.MONGODB_URI || "mongodb+srv://gcloud11:2011Blue@cluster0.5dd92.mongodb.net/workout_db?retryWrites=true&w=majority", 
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    })
  .then(() => console.log(`Successfully connected to database: ${databaseName}`))

  
// Requiring all routes

app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});