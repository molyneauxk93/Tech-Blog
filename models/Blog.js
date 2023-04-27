const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { }

Blog.init(
    {

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;