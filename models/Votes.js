var mongoose = require('mongoose');


const VoteSchema = new mongoose.Schema({
    device_id: {
        type: String,
        required: [true, '{PATH} alanı zorunlu!']
    },
    news_id: {
        type: String,
        required: [true, '{PATH} alanı zorunlu!']
    },
    vote: {
        type: Boolean,
        required: [true, '{PATH} alanı zorunlu!']
    }
});

module.exports = mongoose.model('vote', VoteSchema);