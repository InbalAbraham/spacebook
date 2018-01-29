var Post = require('../models/post.model.js');

// Create and Save a new Post
exports.create = function(req, res) {

    if(!req.body.text || !req.body.user) {
        res.status(400).send({message: "Post must include text and user"});
    }
    else {
      var post = new Post({user: req.body.user, text: req.body.text, comments: []});

      post.save(function(err, data) {
          if(err) {
              console.log(err);
              res.status(500).send({message: "Some error occurred while creating the Post."});
          } else {
              res.send(data);
          }
      });
  }
};

// Retrieve and return all posts
exports.findAll = function(req, res) {
    Post.find(function(err, posts){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving posts."});
        } else {
            res.send(posts);
        }
    });
};

// Retrieve and return a Post identified by the postId
exports.findOne = function(req, res) {
  Post.findById(req.params.postId, function(err, data) {
      if(err) {
          res.status(500).send({message: "Could not retrieve post with id " + req.params.postId});
      } else {
          res.send(data);
      }
  });
};

// Update a Post identified by the postId
exports.update = function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        if(err) {
            res.status(500).send({message: "Could not find a post with id " + req.params.postId});
        }

        post.user = req.body.user;
        post.text = req.body.text;

        post.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update post with id " + req.params.postId});
            } else {
                res.send(data);
            }
        });
    });
};

// Delete a Post with the specified postId
exports.delete = function(req, res) {
    Post.remove({_id: req.params.postId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete post with id " + req.params.id});
        } else {
            res.send({message: "Post deleted successfully!"})
        }
    });
};
