var mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunlu!']

    }
});

module.exports = mongoose.model('category', CategorySchema);