var Post = require('../models/post.model.js');

// Create new comment of post "id"
exports.createInPost = function(req, res) {
    if(!req.body.text || !req.body.user) {
        res.status(400).send({message: "Comment must include text and user"});
    }
    else {
      var newComment = ({user: req.body.user, text: req.body.text});

      Post.findById(req.params.postId, function(err, post) {
          if(err) {
              res.status(500).send({message: "Could not find a post with id " + req.params.postId});
          } else {

            post.comments.push(newComment);

            post.save(function(err, data){
              if(err) {
                  res.status(500).send({message: "Could not add comment to post with id " + req.params.postId});
              } else {
                res.send(post.comments[post.comments.length - 1]);
              }
            });
          }
      });
  }
};

// Get all comments of post "id"
exports.findAllInPost = function(req, res) {
    Post.findById(req.params.postId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve post with id " + req.params.postId});
        } else {
            res.send(data.comments);
        }
    });
};

// update comment "id" from post "id"
exports.update = function(req, res) {
    if(!req.body.text) {
        res.status(400).send({message: "Comment can not be empty"});
    }
    else {
      Post.findById(req.params.postId, function(err, post) {
          if(err) {
              res.status(500).send({message: "Could not find a post with id " + req.params.postId});
          } else {

              var found = post.comments.find(function(element) {
                              return element.id == req.params.commentId;
                            });

              found.text = req.body.text;
              found.user = req.body.user;

              post.save(function(err, data){
                  if(err) {
                      res.status(500).send({message: "Could not update comment " + req.params.commentId + " in post with id " + req.params.postId});
                  } else {
                      res.send(data.comments);
                  }
              });
            }
      });
  }
};

// delete comment "id" from post "id"
exports.delete = function(req, res) {

      Post.findById(req.params.postId, function(err, post) {
      if(err) {
          res.status(500).send({message: "Could not find a post with id " + req.params.postId});
      }

      removeById(post.comments, req.params.commentId);

      post.save(function(err, data){
          if(err) {
              res.status(500).send({message: "Could not delete comment " + req.params.commentId + " from post with id " + req.params.postId});
          } else {
              res.status(200).send({message: "comment " + req.params.commentId + " deleted from post with id " + req.params.postId + " successfully"});
          }
      });
  });
};

function removeById(array, id) {
    var element = array.find(function(element) {
                    return element.id == id;
                  });

     if (element != null) {
        const index = array.indexOf(element);

        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
      }
    return false;
}
