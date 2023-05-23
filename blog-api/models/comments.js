const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    name: { type: String, required: true, maxLength: 30},
    timestamp: { type: String  },
    text: { type: String, required: true, maxLength: 200 },
});

// Virtual for Comment URL
CommentSchema.virtual("url").get(function () {
    return `/comments/${this._id}`;
  });

// Export model
module.exports  = mongoose.model("Comment", CommentSchema);