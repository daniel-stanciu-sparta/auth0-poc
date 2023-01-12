var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-ol8hfzsdip240bhf.uk.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:4000',
  issuer: 'https://dev-ol8hfzsdip240bhf.uk.auth0.com/',
  algorithms: ['RS256']
});

app.get('/public', (req, res) => {
  res.json({
    type: 'public'
  });
})

app.get('/private', jwtCheck, (req, res) => {
  res.json({
    type: 'private'
  });
})

module.exports = app;
