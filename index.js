const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const expressConfig = require("./config/express");
const routes = require('./route');
global['_'] =  require("lodash");

const app = express();
expressConfig(app);
app.use('/', routes);
const port = process.env.PORT || "8000";


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


//mongoose connect

mongoose.connect('mongodb://localhost:27017/authDB', dbOpt =>
  console.log("Connected to mongoDB authDB")
);

mongoose.connection.on("error", (err) => { 
  console.error('Failed to connect to DB  on startup ', err);
  throw new Error("Disconnected because " + err);
  process.exit(1);
});

mongoose.connection.on('disconnected', (err) => {
  console.log("disconnected ", err);
  console.error('Mongoose default connection to DB : disconnected because:' + err);
  throw new Error("Disconnected because " + err);
  process.exit(1)
});

process.on('SIGINT',()=>{
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  })
});