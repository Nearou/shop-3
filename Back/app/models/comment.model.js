const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: String,
    authorName: String,
    authorId: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);