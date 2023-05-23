const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: { type: String, required: true, maxLength: 30 },
    timestamp: { type: String  },
    text: { type: String, required: true, maxLength: 200 },
    username: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
    public: { type: Boolean, default: false},
});

// Virtual for posts URL
PostSchema.virtual("url").get(function () {
    return `/posts/${this._id}`;
  });

// Export model
module.exports  = mongoose.model("Posts", PostSchema);