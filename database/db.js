const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://localhost/yazlab2-2', {useNewUrlParser: true});

    mongoose.connection.on('open', () => {
        console.log("MongoDB Connected!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB ERR! ",err);
    });

    //mongoose.Promise = global.Promise;

}