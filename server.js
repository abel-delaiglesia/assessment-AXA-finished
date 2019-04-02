var clients = [];
var policies = [];

var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var userconnected = "";
var Request = require("request");
let lodash = require('lodash');    

Request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://www.mocky.io/v2/5808862710000087232b75ac",
    "body": JSON.stringify({
        "name": "",
        "email": "",
        "role": ""
    })
}, (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
     clients  = JSON.parse(body);
   
    });
/**/
Request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://www.mocky.io/v2/580891a4100000e8242b75c5",
    "body": JSON.stringify({
        "amountInsured": 0,
        "email": "",
        "inceptionDate": "",
        "installmentPayment": true,
        "clientId": ""
    })
}, (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
    policies = JSON.parse(body);
 
});


// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else {
    var rest = lodash.filter(clients.clients, {"name":req.query.username});

    userconnected = JSON.stringify({
      "name":  rest[0].name,
      "email": rest[0].email,
      "role": rest[0].role
  });  
  if(req.query.username === rest[0].name  || req.query.password === rest[0].name ) {
    res.send("correct user and password, login success! " + userconnected);
  }
}
});

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if(userconnected != "" && req.session)
  {   
      var obj = JSON.parse(userconnected);
      console.dir("user result : " + obj['name'] + "," + obj['email']  + "," +  obj['role']) ;
      if (obj['role'] === "admin" || obj['role'] === "user" )
      {
        console.dir("Role of User connected : " + obj['role']);
        return next();
      }else{
        return res.sendStatus("No user's Role detected");
      }
     }else{
    return res.sendStatus(401);
  }
};

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy(); 
  res.send("logout success!");
});

// Get content endpoint
app.get('/SelectDataFromId/:id', auth, function (req, res) {

   var obj = JSON.parse(userconnected);
   if (req.session)
   {
   if(obj['role'] === "admin" || obj['role'] === "user" )
   {
    var id = req.params.id;
    var rest = lodash.filter(clients.clients, {"id":id});
    res.send("name: " + rest[0].name + "; email: " +  rest[0].email + "; role: " +  rest[0].role);
   }
  }else{
    res.send(" you are not logged with user and password");
  }
});

// Get content endpoint
app.get('/SelectDataFromName/:name', auth, function (req, res) {
 
  var obj = JSON.parse(userconnected);
  if (req.session)
  {
  if(obj['role'] === "admin" || obj['role'] === "user" )
  {
   var name = req.params.name;
   var rest = lodash.filter(clients.clients, {"name":name});
   res.send("name: " + rest[0].name + "; email: " +  rest[0].email + "; role: " +  rest[0].role);
  }
}else{
  res.send("at (/SelectDataFromName/:name) , session status: " + req.session);
}
});

// Get content endpoint
app.get('/SelectListOfpoliciesFromUserName/:name', auth, function (req, res) {

  var obj = JSON.parse(userconnected);
  if (req.session){
    if(obj['role'] === "admin" )
  {
   var name = req.params.name;
   var rest = lodash.filter(clients.clients, {"name":name});
   var policy = lodash.filter(policies.policies, {"clientId": rest[0].id});
   res.send(policy);    
  }else{
   res.send("role admin is mandatorty for this operation");
  }
}else{
  res.send("at (/SelectListOfpoliciesFromUserName/:name) , session status: " + req.session);
}
});

// Get content endpoint
app.get('/SelecUserNameLinkedToPilicy/:PolicyId', auth, function (req, res) {

 var obj = JSON.parse(userconnected);
 if(req.session)
 {
 if (obj['role'] === "admin")
 {
  var PolicyId = req.params.PolicyId;
  var Policy = lodash.filter(policies.policies, {"id":PolicyId});
  var rest = lodash.filter(clients.clients, {"id":Policy[0].clientId});
  res.send("name: " + rest[0].name);
  }else{
  res.send("role admin is mandatorty for this operation");
 }
}else{
  res.send("at (/SelecUserNameLinkedToPilicy/:PolicyId) , session status: " + req.session);
}
}

);

app.listen(3000);
console.log("app running at http://localhost:3000");

