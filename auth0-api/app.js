var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://________.auth0.com/.well-known/jwks.json' // TODO: insert your own
  }),
  audience: 'http://localhost:4000',
  issuer: 'https://________.auth0.com/', // TODO: insert your own
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
