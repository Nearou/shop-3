const Comment = require('../models/comment.model.js');
const Item = require('../models/item.model');

exports.create2 = (req, res) => {
    
    //item:req.body.itemId,
    const comment = new Comment({
        text: req.body.text,
        authorName: req.body.authorName,
        authorId: req.body.authorId,
        item: req.body.itemId
    })

    comment.save()
    .then(data => {
        Item.findOne({
            _id: req.body.itemId
        }, function(err, item) {
            if(item){
                item.comments = item.comments.concat(data._id)
                item.save(function(err){
                    if(err) console.log(err)
                    res.send(data);
                })
            }else{
                res.send(data);
            }
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        })
    })
}

exports.findAll = (req, res) => {
    Comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    })
}