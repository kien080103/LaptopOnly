const userRoutes = require('./users.routes');
const categoryRoutes = require('./category.routes');
const productsRoutes = require('./products.routes');
const cartRoutes = require('./cart.routes');
const couponRoutes = require('./coupon.routes');
const paymentsRoutes = require('./payments.routes');
const favoriteRoutes = require('./favouriteProduct.routes');
const websiteRoutes = require('./website.routes');
const messageRoutes = require('./message.routes');

function routes(app) {
    app.use('/api/user', userRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/product', productsRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/coupon', couponRoutes);
    app.use('/api/payments', paymentsRoutes);
    app.use('/api/favourite', favoriteRoutes);
    app.use('/api/website', websiteRoutes);
    app.use('/api/message', messageRoutes);
}

module.exports = routes;
