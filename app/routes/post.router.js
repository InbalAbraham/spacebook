var express = require('express')
var router = express.Router()
var commentRouter = require('./comment.router')
var posts = require('../controllers/post.controller.js');


//GET /posts
router.get('/', posts.findAll);

//POST /posts
router.post('/', posts.create);

//GET /posts/1
router.get('/:postId', posts.findOne);

//PUT /posts/1
router.put('/:postId', posts.update);

//DELETE /posts/1
router.delete('/:postId', posts.delete);

// Router for /posts/1/comments ...
router.use('/:postId/comments', commentRouter)

module.exports = router
