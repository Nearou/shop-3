const Command = require('../models/command.model.js');

module.exports = (app) => {
    console.log('test');
   // const commands = require('../controllers/command.controller.js');
    // Retrieve all comments
    app.get('/commands', function(req, res, next){
        Command.find().populate('item')
        .exec((error,item) => {
            res.json(item);
          
            console.log(item);
        })
    });

    
}