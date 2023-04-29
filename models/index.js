const User = require("./User");
const Blog = require("./Blog");
const Comment = require('./Comment');

//user can have many blog posts 
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//blog post belongs to a user
Blog.belongsTo(User, {
foreignKey: 'user_id'
});

//user can have many comments 
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Blog post can have many comments
Blog.hasMany(Comment, {
    foreignKey: 'comment_id'
});

Comment.belongsTo(Blog, {
    
});


module.exports = { User, Blog, Comment };
