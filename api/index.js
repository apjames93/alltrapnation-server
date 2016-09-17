var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var artist = require('./artist');
router.use('/artist', artist);
module.exports = router;
