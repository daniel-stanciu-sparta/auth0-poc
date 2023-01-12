var express = require('express');
var router = express.Router();
const {requiresAuth} = require('express-openid-connect');
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.get('/secured', requiresAuth(), async function async(req, res, next) {
  let data = {};
  const refreshToken = req.oidc.refreshToken || undefined;
  const {token_type, access_token} = req.oidc.accessToken;

  try {
    const apiResponse = await axios.get('http://localhost:4000/private', {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) {
    // handle error
  }

  res.render('secured', {
    title: 'Secure Page',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

module.exports = router;
