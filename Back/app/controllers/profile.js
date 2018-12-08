

const User = require('../models/users.js');
const Command = require('../models/command.model');

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        console.log(user._id);
        console.log(user);
        Command.find({'user._id': user._id}, function(err, commands) {
          res.status(200).json({
            ...JSON.parse(JSON.stringify(user)),
            commands: commands
          });
        })
      });

      
  }

};