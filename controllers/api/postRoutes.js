// dependencies
const router = require("express").Router();
const { BlogPost, Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// Route to create a new post
router.post("/", async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to render the edit post page
router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);
    res.render("editpost", { postData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get a single post
router.get("/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a post
router.put("/:id", async (req, res) => {
  try {
    const postData = await BlogPost.update(
      {
        title: req.body.title,
        post: req.body.post,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
