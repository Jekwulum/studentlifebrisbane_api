require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRouter = require('./routes/auth.route');
const servicesRouter = require('./routes/services.route');

mongoose.connect(process.env.MONGO_ATLAS_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`[Database connection]: Connected correctly to MongoDB server for ${appName}..`))
  .catch(error => console.error(`Connection error to MongoDB Server. [Issue]: ${error}`));

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Accept", "application/json");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/auth", authRouter);
app.use("/services", servicesRouter);

module.exports = app;
