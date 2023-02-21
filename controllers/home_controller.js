const Post = require("../models/posts");
module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

// module.exports.actionName = function(req, res){}
