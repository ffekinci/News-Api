const mongoose = require('mongoose');
module.exports = () => {
    //mongodb://localhost/yazlab2-2
    mongoose.connect('mongodb://yazlab22user:123456aa@ds145486.mlab.com:45486/newsapi', {useNewUrlParser: true});

    mongoose.connection.on('open', () => {
        console.log("MongoDB Connected!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB ERR! ",err);
    });

    //mongoose.Promise = global.Promise;

}