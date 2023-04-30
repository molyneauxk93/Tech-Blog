const User = require("./User");
const Blog = require("./Blog");
const Comment = require('./Comment');

//blog post belongs to a user
Blog.belongsTo(User, {
    foreignKey: 'userId'
});

//user can have many comments 
Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    // onDelete: 'CASCADE'
});

//comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'userId',
});



module.exports = { User, Blog, Comment };
