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
    req.body.categoryId = mongoose.Types.ObjectId(Category.find({name:req.body.categoryId}).categoryId);

    const news = new News(req.body);

    const promise = news.save();
    promise.then(() => {
        res.redirect("/end");
        res.json({status: 1});
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
    });z
});

router.get('/:id', (req, res) => {
    const promise = News.findById(req.params.id);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({status: 0, message: err});
    });
});

module.exports = router;
