const { DataTypes } = require('sequelize');
const { connect } = require('../config/connectDB');

const User = connect.define(
    'users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthDay: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user',
        },
        typeLogin: {
            type: DataTypes.ENUM('google', 'email'),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'inactive',
        },
        isOnline: {
            type: DataTypes.ENUM('online', 'offline'),
            allowNull: false,
            defaultValue: 'online',
        },
    },
    {
        freezeTableName: true, // 👈 Giữ nguyên tên bảng là 'users'
        timestamps: true,
    },
);

module.exports = User;
