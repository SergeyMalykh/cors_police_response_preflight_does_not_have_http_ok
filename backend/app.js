require('app-module-path').addPath(`${__dirname}`);
var express = require('express');
var path = require('path');
var cors = require('cors');

console.log('NODE_ENV = ' + process.env.NODE_ENV);

// APP Express
var app = express(); 


var whitelist = ['http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Permite os requests quando em ambiente de desenvolvimento!
/*app.use(function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', "http://localhost:8080");
  //res.header("Access-Control-Allow-Origin", `${C.PROTOCOL}://${C.DOMAIN}:${C.PORT}`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Request-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, access-control-request-headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization, Access-Control-Allow-Credentials, X-Auth-Token, X-Accept-Charset,X-Accept");
  //res.header("Access-Control-Allow-Headers", "*");
  
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

// FAKE middleware autentication Metod, need to exist "authorization" in the header
// On a real app, I use, passport, with token, like this example:
// https://blog.sqreen.io/authentication-best-practices-vue/
var isAutenticated = function() {
  return [
    function(req, res, next) {
      
      console.log('-----------------------------------------------');
      console.log(' ---> From: ', req.get('origin'));

      if (req.headers) { console.log(' ---> Headers - Exists'); }
      if (req.headers.authorization || req.headers.Authorization) { 
        console.log(' ---> Headers :: Authorization - Exists'); 
      } else {
        console.error(' ---> Headers :: Authorization - DOES NOT Exists'); 
      }

      if (req.headers.authorization) {
        next();
      } else {
        res.sendStatus(401);
      }
    }
  ];
};


// static files
app.use(express.static(path.join(__dirname, 'public')));

// Cadastros
app.use('/api/products', cors({credentials: true, origin: 'http://localhost:8080'}), isAutenticated(), function(req, res, next) {
  res.json({id: '1000', text: 'test'});
});

// Inicialização final do servidor
let port = process.env.PORT || 3000;
let server = app.listen(port, function() {
  console.log('Express server listening on port ' + port)
});

module.exports = server;

