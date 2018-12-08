const mongoose = require('mongoose');
const Comment = require('../models/comment.model')

const ItemSchema = mongoose.Schema({
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' 
    }],
    command : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Command' 
    }],
    title: String,
    description: String,
    image: [{
    
    }],
    price: Number,
    stock : Number,
    //slug: String, 
}, {
    timestamps: true
});

// ItemSchema.pre('save', function(next) {
    
//     this.slug = _.kebabCase(this.title)
//     next();
// })

ItemSchema.pre('remove', function(next) {
    console.log('delete comments');
    Comment.deleteMany({ item : this._id}, function(err){
        if(err) console.log(err);
        next();
    })
})

module.exports = mongoose.model('Item', ItemSchema);