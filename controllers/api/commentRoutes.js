const router = require("express").Router();
const { BlogPost, Comment } = require("../../models");

// post a comment
router.post("/:id", async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      blogpost_id: parseInt(req.params.id),
      user_id: req.session.user_id,
    });

    // res.render("comment", { comment: newComment });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: BlogPost,
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
