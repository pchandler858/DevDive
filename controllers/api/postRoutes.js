// dependencies
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
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

// Update route if we set that up later for posts.
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const updatedPost = await Post.update({
//         name: req.body.name,
//         description: req.body.description,
//     },
//     {
//       where: {id: req.params.id},
//     },
//     )
//     res.status(200).json(updatedPost);
//     }catch (err) {
//     res.status(400).json(err);
//   }
// });

// Delete route for posts when we get the button set up.
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const postData = await Post.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!postData) {
//         res.status(404).json({ message: 'No post found with this id!' });
//         return;
//       }
  
//       res.status(200).json(postData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;