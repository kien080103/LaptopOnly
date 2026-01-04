const { DataTypes } = require('sequelize');
const { connect } = require('../config/connectDB');

const messagerChatbot = connect.define(
    'messagerChatbot',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true, // 👈 Giữ nguyên tên bảng là 'users'
        timestamps: true,
    },
);

module.exports = messagerChatbot;
