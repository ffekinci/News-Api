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


    const promisefirst = Vote.findOne({device_id: req.params.device_id, news_id: req.params.news_id});

    promisefirst.then((deta) => {

        console.log(deta.vote + " - "+ req.params.vote + ", is equal? " + (deta.vote == req.params.vote));
        if(deta.vote.toString() == req.params.vote.toString()){
            Vote.findByIdAndRemove(deta._id, () => {

            res.json({stat: 0});
            });
        }
        else{
            Vote.updateOne({device_id: req.params.device_id, news_id: req.params.news_id},{vote: req.params.vote}, () => {

                res.json({stat: 1, message: deta});
            });



        }

    }).catch((er) => {

        const vote = new Vote(body);
        const promise = vote.save();
        promise.then((dat) => {

        res.json({stat: 2, message: dat});
        }).catch((ers)=>{
            res.json({stat: 3});
        });
    });


});


module.exports = router;
