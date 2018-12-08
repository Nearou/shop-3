var express = require('express');
var router = express.Router();

require('dotenv').config()

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.MY_SECRET,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentification');

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

