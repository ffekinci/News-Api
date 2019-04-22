var express = require('express');
var router = express.Router();

const Vote = require('../models/Votes');

//Oy verilmiş mi ?
router.get('/:device_id/:news_id', (req, res) => {
    const promise = Vote.findOne({device_id: req.params.device_id, news_id: req.params.news_id});

    promise.then((data) => {
        res.json(data.vote);
    }).catch( (err) =>{
        res.json({status: 0, message: err});
    });
});


router.get('/:device_id/:news_id/:vote', (req, res, next) => {

    const body = {device_id: req.params.device_id, news_id: req.params.news_id, vote: req.params.vote};
    //console.log(body);

    const news = new Vote(body);

    const promise = news.save();

    promise.then(() => {

      res.json({status: 1});

    }).catch(() => {

      res.json({status: 0});
    });

});


module.exports = router;
