const Posts = require("../models/posts");
const async = require("async");

//Display list of all Posts
exports.posts_list = async function (req, res, next) {
    try {
        const post = await Posts.find();
        if (!post || post.length === 0) {
            return res.json({
                message: "No posts have been found!"
              });
        };
        // Succesfull
        return res.json(post);
    } catch(err) {
        return next(err);
    }
}

// GET request for one post
exports.post_item = async function (req, res, next) {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post || post.length === 0) {
            return res.json({
                message: "No posts have been found!"
              });
        };
        // Succesfull
        return res.json(post);
    } catch(err) {
        return next(err);
    }
}

// Get request for one post and it's comments
exports.post_and_comments = async function (req, res, next) {
    try {
        const post = await Posts.findById(req.params.id).populate("comments");
        if (!post || post.length === 0) {
            return res.json({
                message: "No posts have been found!"
              });
        };
        // Succesfull
        return res.json(post);
    } catch(err) {
        return next(err);
    }
}

// Update request for post_public
exports.post_update_public_POST = async function (req, res, next) {
    try {
        const post = await Posts.findByIdAndUpdate(
            {"_id": req.body.id}, // filter
            {"$set": {"public": req.body.public}}
        );
        return res.json({
            message: "succesfull"
        })
    } catch(err) {
        return next(err);
    }
}