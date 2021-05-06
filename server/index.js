const express = require('express')
const bodyParser = require('body-parser')
const session = { userId : 2, roleId: 2 };

const app = express()
const port = 9043

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, sessionid");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/logs', function (req, res) {

  res.status(200).send({
    code: 200,
    message: "OK",
  })
})

app.post('/api/account/login', function (req, res) {

  var userId = req.body.UserName == "admin" ? 1 : 2
  const roleId = req.body.UserName == 'admin' ? 1 : 2;
  const apiToken = req.body.UserName == 'admin' ? '7658-adsf76987-asd768' : '7658-adsf76987-asd769';
  session.roleId = roleId;
  session.userId = userId;
  res.status(200).send({
    code: 200,
    message: "OK",
    userId: userId,
    roleId: roleId,
    apiToken: apiToken
  })
})

app.post('/api/account/logout', function (req, res) {

  res.status(200).send({
    code: 200,
    message: "OK",
  })
})


app.get('/api/account/getUserData', function (req, res) {

  var isAdmin = req.query.id == 1;
  const token = session; // { roleId: 2, userId: 2 };

  res.status(200).send({
    code: 200,
    message: "OK",
    sessionId: "76987-we-1234-sdfad",
    userName: "Tom",
    userId: req.query.id,
    firstName: "Tom",
    lastName: "Cruise",
    isAdmin: isAdmin,
    token,
  })
})

app.get('/api/user/sendEmail', function (req, res) {

  var isAdmin = req.query.id == 1;

  res.status(200).send({
    code: 200,
    message: "OK",
    resetToken: "abcd"
  })
})

app.get('/api/user/resetPassword/:usertoken', function (req, res) {
  var isValid = req.params.usertoken;
  if (isValid) {
    res.status(200).send({
      code: 200,
      message: "OK",
    })
  }
  else {
    res.status(401).send({
      code: 401,
      message: "Invalid User",
    })
  }
})

app.post('user/setPassword', function (req, res) {

  if (req) {
    res.status(200).send({
      code: 200,
      message: "OK",
    })
  }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))