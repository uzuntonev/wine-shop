const express = require('express');
const dbConnection = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

dbConnection()
  .then(() => {

    require('./config/express');
    console.log('DB is connected...');
  })
  .catch((err) => console.error(err));
