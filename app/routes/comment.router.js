var express = require('express')
var router = express.Router({mergeParams: true})
var comments = require('../controllers/comment.controller.js');

// GET /posts/3/comments
router.get('/', comments.findAllInPost);

//POST /posts/3/comments
router.post('/', comments.createInPost);

//PUT /posts/3/comments/12
router.put('/:commentId', comments.update);

//DELETE /posts/3/comments/12
router.delete('/:commentId', comments.delete);

module.exports = router
