const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    status:{ type: String },
    message: { type: String },
    tests : []

});

module.exports = mongoose.model('Post',postSchema);
