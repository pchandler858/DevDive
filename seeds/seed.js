const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");

const userData = require("./userData.json");
const reviewData = require("./reviewData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogPosts = [];

  for (const review of reviewData) {
    const createdPost = await BlogPost.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    blogPosts.push(createdPost);
  }

  for (const comment of commentData) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = blogPosts[Math.floor(Math.random() * blogPosts.length)];

    await Comment.create({
      ...comment,
      user_id: randomUser.id,
      blogpost_id: randomPost.id,
    });
  }

  process.exit(0);
};

seedDatabase();
