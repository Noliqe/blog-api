var express = require('express');
var router = express.Router();
const posts_controller = require("../controllers/postsController");
const comments_controller = require("../controllers/commentsController");

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    message: "welcome to the API"
  });
});

/* GET posts */
router.get("/posts", posts_controller.posts_list);

router.get("/posts/:id", posts_controller.post_item);

router.get("/posts/:id/comments", posts_controller.post_and_comments);

router.post("/posts/:id/comments", comments_controller.comment_POST);

router.get("/posts/:id/comments/:id", comments_controller.comment_get_one);

router.post("/admin/public", posts_controller.post_update_public_POST);

router.post("/admin/create-post", posts_controller.post_create_POST);

router.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

router.get('/blogs')

module.exports = router;