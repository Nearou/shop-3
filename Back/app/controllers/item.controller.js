const Item = require('../models/item.model.js');

var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})
// Create and Save a new Note
exports.create = (req, res) => {
 
    if(!req.body.text) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
       // Create a Note
       const item = new Item({
        title: req.body.title || "Untitled Note", 
        text: req.body.text,
       
    });

    // Save Note in the database
    item.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    console.log('serieuczs?');
    Item.find()
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a itemId
exports.findOne = (req, res) => {
    console.log(req.params.Id)
    Item.findOne({_id :req.params.Id}).populate('comments')
    .exec((error,item) => {
        res.json(item);
        console.log(item);
    })
};

// Update a note identified by the itemId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log('prout');
    Item.findOne({_id: req.params.itemId})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }else{
            item.remove();
            res.send({message: "item deleted successfully!"});
        }
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Could not delete item with id " + req.params.itemId
        });
    });
};