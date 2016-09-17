require('dotenv').config();
var express = require('express');
var router = express.Router();
var queries = require('../queries/apiQueries');
var auth = require('./helpers.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


router.post('/login', function(req, res, next) {
  console.log(req.query);
  queries.findUserByUserName(req.query.username)
  .then(function(user){
    var plainTextPassword = req.query.password;
    if ( user && bcrypt.compareSync(plainTextPassword, user.password) ) {
      jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '1d'}, function(err, token) {
        if (err){
          res.json({
            message: 'error creating token'
          });
        } else {
          res.json({
            token: token,
            userId: user.id,
            username : user.username
          });
        }
      });
      } else {
      res.status(401);
      res.json({
        message: 'unauthorized'
      });
    }
  });
});

module.exports = router;
