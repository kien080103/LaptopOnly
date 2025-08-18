const { connect } = require('../config/connectDB');
const { DataTypes } = require('sequelize');

const modelUser = require('./users.model');
const modelApikey = require('./apiKey.model');
const modelCategory = require('./category.model');
const modelProduct = require('./products.model');
const modelCart = require('./cart.model');
const modelCoupon = require('./coupon.model');
const modelPayment = require('./payments.model');
const modelMessage = require('./message.model');

const sync = async () => {
    await connect.sync({ alter: true });
    await modelUser.sync();
    await modelApikey.sync();
    await modelCategory.sync();
    await modelProduct.sync({ alter: true });
    await modelCart.sync({ alter: true });
    await modelCoupon.sync({ alter: true });
    await modelPayment.sync({ alter: true });
    await modelMessage.sync({ alter: true });
};

module.exports = sync;
