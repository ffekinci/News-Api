var express = require('express');
var router = express.Router();

//models
const Category = require('../models/Category');

/* GET category listing. */
router.get('/', (req, res) => {
    Category.find({}, (err, data) => {
        res.json(data);
    });

});

router.delete('/:id', (req, res) => {
    const promise = Category.findByIdAndRemove(req.params.id);

    promise.then(() => {
        res.json({status: 1});
    }).catch( (err) =>{
        res.json({status: 0, message: err});
    });
});

router.post('/', (req, res) => {
    const news = new Category(req.body);

    const promise = news.save();

    promise.then(() => {
        res.json({status: 1});
    }).catch( (err) =>{
        res.json({status: 0, message: err});
    });

});

module.exports = router;
