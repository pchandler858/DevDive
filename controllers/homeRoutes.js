// dependencies
const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to landing page
router.get('/', (req, res) => {
  try {
    res.render('landing');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard route
// Maps blogposts to the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    let blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    blogData = blogData.map((blogpost) => blogpost.get({ plain: true }));

    console.log(blogData);

    res.render('dashboard', {
      blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
// If user is logged in, redirect to dashboard
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//Route to signp
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Route to create a new post
router.get('/newpost', (req, res) => {
  res.render('newpost');
});

module.exports = router;
