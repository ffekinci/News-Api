var mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunlu!'],
        minlength: 5

    },
    imageUrl: String,
    content: String,
    view: {
        type: Number,
        default: 0
    },
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },

    categoryId: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model('news', NewsSchema);