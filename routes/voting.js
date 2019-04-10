var express = require('express');
var router = express.Router();

const Vote = require('../models/Votes');
const News = require('../models/News');

/* GET home page. */
router.get('/:device_id', function(req, res, next) {
  Category.find({}, (err, data) => {
    var cats = [];

    for (var i = 0; i < data.length; i++) {
      cats.push(data[i].title);
    }
    res.render('index', { title: cats });
  });
});

router.get('/vote/:device_id/:vote', function(req, res, next) {
  //Category.find({}, (err, data) => {
    console.log(req.params.device_id + "<"+req.params.vote);


    //res.render('index', { title: cats });
  //});
});


module.exports = router;
