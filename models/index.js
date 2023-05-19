// import models
const User = require('./User');
const BlogPost = require('./BlogPost');

// User belongsTo BlogPost
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// User has many blogposts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  BlogPost,
};
