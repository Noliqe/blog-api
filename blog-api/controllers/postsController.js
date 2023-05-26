const Posts = require("../models/posts");
const Comments = require("../models/comments");
const async = require("async");
const { body, validationResult } = require("express-validator");

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

// Create request for post
exports.post_create_POST = [
    // Validate and sanitize fields.
    body("title")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("text")
        .trim()
        .isLength({min: 1})
        .escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            return next(errors);
          }
    try {
        // Get date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        // Create a post
        const post = await Posts.create({
            title: req.body.title,
            timestamp: today,
            text: req.body.text,
            username: "BigBoss",
            comments: [],
            public: false,
        });
        const result = await post.save();

        // Succesfull
        return res.json(post);
    } catch(err) {
        console.log(err);
        return next(err)
    }
}
]