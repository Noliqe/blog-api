const Comments = require("../models/comments");
const Posts = require("../models/posts");
const { body, validationResult } = require("express-validator");

// GET request for one Comment
exports.comment_get_one = async function (req, res, next) {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment || comment.length === 0) {
            return res.json({
                message: "No comments have been found!"
              });
        };
        // Succesfull
        return res.json(comment);
    } catch(err) {
        return next(err);
    }
}

// GET request for one Comment
exports.comment_get_one_Id = async function (req, res, next) {
    try {
        const comment = await Comments.findById(req.body.id);
        if (!comment || comment.length === 0) {
            return res.json({
                message: "No comments have been found!"
              });
        };
        // Succesfull
        return res.json(comment);
    } catch(err) {
        return next(err);
    }
}

// POST request comment
exports.comment_POST = [
    // Validate and sanitize fields.
    body("name")
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

        // Create a comment
        const comment = await Comments.create({
            name: req.body.name,
            timestamp: today,
            text: req.body.text
        });
        const result = await comment.save();
        // Succesfull
        const post = await Posts.findByIdAndUpdate(
            {"_id": req.body.id}, // filter
            {"$push": {"comments": comment}}
        );


        // Succesfull
        return res.json(comment);
    } catch(err) {
        console.log(err);
        return next(err)
    }
}
]

// delete request for comment POST
exports.remove_comment_POST = async function (req, res, next) {
    try {
        const post = await Posts.findByIdAndUpdate(
            {"_id": req.body.postId}, // filter
            {"$pull": { comments: req.body.commentId}}
        );
        // succesfull
        const comment = await Comments.findByIdAndRemove(req.body.commentId)

        // succesfull
        return res.json({
            message: "succesfull"
        })
    } catch(err) {
        return next(err);
    }
}

// edit request for comment POST
exports.edit_comment_POST = [
    // Validate and sanitize fields.
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
            const comment = await Comments.findByIdAndUpdate(
                {"_id": req.body.id}, // filter
                {"$set": {"text": req.body.text}}
            );
    
            // Succesfull
            return res.json(comment);
        } catch(err) {
            console.log(err);
            return next(err)
        }
    }
]
