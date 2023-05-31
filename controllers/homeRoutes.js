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
      order: [["post_date", "desc"]],
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
router.get("/dashboard", withAuth, async (req, res) => {
  const loggedIn = req.session.logged_in || false; //

  try {
    let blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: { user_id: req.session.user_id }, // only show posts by logged in user
      order: [["post_date", "desc"]], // order by most recent
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

router.get("/post/:id", withAuth, async (req, res) => {
  const loggedIn = req.session.logged_in || false;
  try {
    let blogData = await BlogPost.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    blogData = blogData.get({ plain: true });

    res.render("comment", {
      ...blogData,
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

// route to render the edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    let blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    blogData = blogData.get({ plain: true });
    console.log(blogData);

    res.render("editpost", {
      ...blogData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// rout to

module.exports = router;
