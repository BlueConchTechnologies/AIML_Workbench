const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Import route
const authRoute = require('./routes/auth');
const cors = require('cors')


//connect to db
 mongoose.connect("mongodb://localhost:27017/Security_Question",
  { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }, 
  () => console.log('Connected'));

  app.use(cors());
//Middlewire
app.use(express.json());
app.get('/', (req,res) => {
  res.send('Hello World');
})
//Route middlewire
app.use('/api/user', authRoute);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, sessionid");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
 
  next();
});

app.listen(8080, () => console.log('server is up at 8080'));

