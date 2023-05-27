// dependencies
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to home page
router.get("/", async (req, res) => {
  const loggedIn = req.session.logged_in || false;
  try {
    let blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    blogData = blogData.map((post) => post.get({ plain: true }));

    res.render("landing", {
      blogData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
// If user is logged in, redirect to dashboard
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//Route to signp
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

// Dashboard route
// Maps blogposts to the dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  const loggedIn = req.session.logged_in || false; //

  try {
    let blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    blogData = blogData.map((post) => post.get({ plain: true }));

    console.log(blogData);

    res.render("dashboard", {
      blogData,
      logged_in: req.session.logged_in,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/:id", withAuth, async (req, res) => {
  const loggedIn = req.session.logged_in || false;
  try {
    let blogData = await BlogPost.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          model: Comment,
        },
      ],
    });

    blogData = blogData.get({ plain: true });

    console.log(blogData);
    let commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },
      include: [
        {
          model: User,
          model: BlogPost,
        },
      ],
    });
    commentData = commentData.map((comment) => comment.get({ plain: true }));
    console.log(commentData);
    res.render("post", {
      blogData,
      commentData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new post
router.get("/newpost", async (req, res) => {
  // const loggedIn = req.session.logged_in || false;
  try {
    let userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    userData = userData.get({ plain: true });
    
    res.render("newpost", {
      // loggedIn,
      ...userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
