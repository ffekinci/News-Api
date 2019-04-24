var express = require('express');
var router = express.Router();

const Category = require('../models/Category');
const News = require('../models/News');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });

});


router.get('/addNews', function(req, res, next) {
  Category.find({}, (err, data) => {
    var cats = [];

    for (var i = 0; i < data.length; i++) {
      cats.push(data[i].title);
    }
    res.render('addNews', { title: cats });
  });

});

router.get('/addCat', function(req, res, next) {
  Category.find({}, (err, data) => {

    res.render('addCat', { });
  });

});


router.get('/news', function(req, res, next) {
  News.find({}, (err, data) => {

    res.render('news', { news: data });
  });

});

router.get('/category', function(req, res, next) {
  Category.find({}, (err, data) => {

    res.render('category', { cat: data });
  });

});

module.exports = router;
