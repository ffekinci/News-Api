var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//models
const News = require('../models/News');
const Category = require('../models/Category');

/* GET users listing. */
router.get('/', (req, res) => {
    News.find({}).select(['title', 'imageUrl']).exec( (err, data) => {
        res.json(data);
    });

});

router.post('/', (req, res, next) => {
    //Category.find({title:req.body.categoryId}).categoryId

    const promise2 = Category.find({title:req.body.categoryId});

    promise2.then((data) => {
        req.body.categoryId = mongoose.Types.ObjectId(data[0]._id);

        const news = new News(req.body);

        const promise = news.save();

        promise.then(() => {
            //res.redirect("/end");
            res.json({status: 1});

        }).catch( (err) =>{
            res.render('error',{message: "Error", error: err});
            res.end();
            //res.json({status: 0, message: err});
        });

    }).catch( (err) =>{
        res.render('error',{message: "Error", error: err});
        res.end();
        //res.json({status: 0, message: err});
    });



});

router.delete('/:id', (req, res) => {
    const promise = News.findByIdAndRemove(req.params.id);

    promise.then(() => {
        res.json({status: 1});
    }).catch( (err) =>{
        res.json({status: 0, message: err});
    });
});

router.get('/:id', (req, res) => {
    const promise = News.findById(req.params.id);

    promise.then((data) => {
        data.view++;
        data.save();

        res.json(data);
    }).catch((err) => {
        res.json({status: 0, message: err});
    });
});

router.get('/cat/:title', (req, res) => {
    const promise1 = Category.find({title:req.params.title});

    promise1.then((data) => {
        const catId = data[0]._id;
        //console.log(catId);
        //res.json(data);

        const promise = News.find({categoryId: mongoose.Types.ObjectId(catId)});
        promise.then((data2) => {
            res.json(data2);
        }).catch((err) => {
            res.json({status: 0, message: err});
        });

    }).catch((err) => {
        res.json({status: 0, message: err});
    });



});


module.exports = router;
