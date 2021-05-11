const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Import route
const authRoute = require('./routes/auth');


//connect to db
 mongoose.connect("mongodb://localhost:27017/Auth",
  { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }, 
  () => console.log('Connected'));

//Middlewire
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, sessionid");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

//Route middlewire
app.use('/api/user', authRoute);

app.listen(2000, () => console.log('server is up'));

