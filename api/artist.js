var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var helpers = require('../auth/helpers.js');



  router.get('/', function(req, res, next){
    queries.getArtistData()
    .then(function(data){
      res.json({user : data});
    });
  });
  router.get('/album', function(req, res, next){
    queries.getAlbumData()
    .then(function(data){
      res.json({user : data});
    });
  });

  router.get('/:id', function(req, res, next){
    console.log(req.params.id);
    queries.getArtistinfo(req.params.id)
    .then(function(data){
      res.json({user : data});
    });
  });

  router.delete('/',helpers.ensureauthenticated,  function(req, res, next){
    queries.deleteData(req.query)
    .then(function(data){
      res.json({data : "deleted"});
    });
  });

  router.post('/',helpers.ensureauthenticated, function(req, res,next){
    queries.addData(req.query)
    .then(function(data){
      res.json({data: 'added'});
    });
  });

  router.put('/',helpers.ensureauthenticated, function(req, res,next){
    queries.editData(req.query)
    .then(function(data){
      res.json({data: 'it has been done '});
    });
  });





module.exports = router;
