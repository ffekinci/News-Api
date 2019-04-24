var express = require('express');
var router = express.Router();

const Vote = require('../models/Votes');

//Oy verilmiş mi ?
router.get('/:device_id/:news_id', (req, res) => {
    const promise = Vote.findOne({device_id: req.params.device_id, news_id: req.params.news_id});

    promise.then((data) => {
        res.json({status: 1, vote: data.vote});
    }).catch( (err) =>{
        res.json({status: 0, message: err});
    });
});

//oy Ver ysada geri çek yada değiştir
router.get('/:device_id/:news_id/:vote', (req, res, next) => {

    const body = {device_id: req.params.device_id, news_id: req.params.news_id, vote: req.params.vote};
    //console.log(body);


    const promisefirst = Vote.findOne({device_id: req.params.device_id, news_id: req.params.news_id});

    promisefirst.then((deta) => {

        //console.log(deta.vote + " - "+ req.params.vote + ", is equal? " + (deta.vote.toString() == req.params.vote.toString()));
        if(deta.vote.toString() == req.params.vote.toString()){
            Vote.findByIdAndRemove(deta._id, () => {

            res.json({stat: 4});
            });
        }
        else {
            Vote.updateOne({device_id: req.params.device_id, news_id: req.params.news_id},{vote: req.params.vote}, (d2) => {

                res.json({vote: req.params.vote});
            });
        }

    }).catch((er) => {

        const vote = new Vote(body);
        const promise = vote.save();
        promise.then((dat) => {

        res.json({vote: dat.vote});
        }).catch((ers)=>{
            res.json({stat: 3});
        });
    });


});


module.exports = router;
