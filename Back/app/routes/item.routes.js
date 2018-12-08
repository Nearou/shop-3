var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var fs = require('fs');
var Cart = require('../models/cart');
const Item = require('../models/item.model.js');
const Command = require('../models/command.model.js');
var async = require('async');

module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    // Create a new Note
    app.post('/items', upload.any(), function (req, res, next) {
        console.log(req.files)
        console.log(req.body)
        if (req.files) {
            console.log(req.files[0].path)
            console.log(req.files.originalname)
            req.files.forEach(file => {
                console.log('plop', file);
                fs.rename(file.path, 'public/images/' + file.originalname, function (err) {
                    var test = []
                    test.push(file.originalname)
                    if (err) throw err;
                    console.log('file uploaded')
                    console.log(req.files);
                })
            });

            var item = new Item({
                title: req.body.title,
                description: req.body.description,
                image: req.files,
                price: req.body.price,
                stock: req.body.stock
            });
            item.save()
                .then(data => {
                    res.send(data)
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                });

        }
    });

    // Retrieve all items
    app.get('/items', items.findAll);

    // Retrieve a single Note with noteId
    app.get('/items/:Id', items.findOne);

    // Update a Note with noteId
    app.put('/items/:noteId', items.update);

    // Delete a Note with noteId
    app.delete('/items/:itemId', items.delete);

    app.get('/add-to-cart/:id', function (req, res, next) {
        var itemId = req.params.id;
        var cart = new cart(req.session.cart ? req.session.cart : {
            items: {}
        });

        Item.findById(itemId, function (err, item) {
            if (err) {
                return res.send('y a une erreur')
            }
            cart.add(item, item.id);
            console.log(req.session.cart)
            req.session.cart = cart;
        })
    })

    app.get('/new-items', function (req, res, next) {
        console.log('lolilol')
        Item.find({}).sort({
                createdAt: -1
            }).limit(6)
            .then(items => {
                res.send(items);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });

    })

    app.post('/items/cart', function (req, res, next) {
// console.log(req.body);
        var items = req.body.items;
        console.log('items',items);
   /*     var itemId = []
        var item = []
        for (let i = 0; i < items.length; i++) {
            itemId.push(items[i]._id)
            item.push(items[i])
        }*/
       // items.splice(items.length - 1, 1);
        // console.log('item', item);
        var command = new Command({
            user: {
                _id: req.body.user._id,
                name: req.body.user.name,
                email: req.body.user.email,
            },
                    items: items,
                    total : req.body.total,
                    status : 'Pending',
            
            

                

            
        });
        command.save()
            .then(data => {
                console.log('data', data);
                res.send(data)

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });



        async.eachSeries(items, function updateObject(obj, done) {
            // Model.update(condition, doc, callback)
            
            Item.update({
                _id: obj._id
            }, {
                $set: {
                    stock: obj.stock - obj.quantity
                }
            }, done);
        }, function allDone(err) {
            // this will be called when all the updates are done or an error occurred during the iteration
        });
    })
}