const Comment = require('../models/comment.model.js');

module.exports = (app) => {
    console.log('test');
    const comments = require('../controllers/comment.controller.js');
    // Retrieve all comments
    app.get('/comments', comments.findAll);

    app.post('/comments', comments.create2);
}