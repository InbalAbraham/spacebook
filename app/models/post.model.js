var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    user: String,
    text: String,
    comments: [{
      user: String,
      text: String
    }]
  });

  /*
  , {
      timestamps: true
  }
  */

module.exports = mongoose.model('Post', PostSchema);
