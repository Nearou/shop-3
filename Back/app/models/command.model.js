const mongoose = require('mongoose');
const Comment = require('./comment.model')

const CommandSchema = mongoose.Schema({
   
    
   user : {
       _id : String,
    name : String,
    email : String,
},
    items : [{
        title: String,
    description: String,
    image: [{
    
    }],
    price: Number,
    stock : Number,
    quantity : Number,
    }],
    total : Number,
    status : String,
  
   
    //slug: String, 
}, {
    timestamps: true
});

// CommandSchema.pre('save', function(next) {
    
//     this.slug = _.kebabCase(this.title)
//     next();
// })


module.exports = mongoose.model('Command', CommandSchema);