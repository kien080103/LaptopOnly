const { connect } = require('../config/connectDB');
const { DataTypes } = require('sequelize');

const modelUser = require('./users.model');
const modelApikey = require('./apiKey.model');
const modelCategory = require('./category.model');
const modelProduct = require('./products.model');
const modelCart = require('./cart.model');
const modelCoupon = require('./counpon.model');
const modelPayment = require('./payments.model');
const modelMessage = require('./message.model');
const modelPreviewProduct = require('./previewProduct.model');
const modelNotication = require('./notication.model');
const modelOtp = require('./otp.model');
const modelBlog = require('./blog.model');
const modelChatbot = require('./messagerChatbot.model');

// ========== USER RELATIONSHIPS ==========
// User có nhiều API keys
modelUser.hasMany(modelApikey, {
    foreignKey: 'userId',
    as: 'apiKeys',
});
modelApikey.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// User có nhiều Cart items
modelUser.hasMany(modelCart, {
    foreignKey: 'userId',
    as: 'cartItems',
});
modelCart.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// User có nhiều Payments
modelUser.hasMany(modelPayment, {
    foreignKey: 'userId',
    as: 'payments',
});
modelPayment.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// User có nhiều Messages (có thể là tin nhắn gửi hoặc nhận)
modelUser.hasMany(modelMessage, {
    foreignKey: 'senderId',
    as: 'sentMessages',
});
modelUser.hasMany(modelMessage, {
    foreignKey: 'receiverId',
    as: 'receivedMessages',
});
modelMessage.belongsTo(modelUser, {
    foreignKey: 'senderId',
    as: 'sender',
});
modelMessage.belongsTo(modelUser, {
    foreignKey: 'receiverId',
    as: 'receiver',
});

// User có nhiều Notifications
modelUser.hasMany(modelNotication, {
    foreignKey: 'userId',
    as: 'notifications',
});
modelNotication.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// User có nhiều OTP
modelUser.hasMany(modelOtp, {
    foreignKey: 'userId',
    as: 'otpCodes',
});
modelOtp.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// User có nhiều Blogs (nếu user có thể viết blog)
modelUser.hasMany(modelBlog, {
    foreignKey: 'authorId',
    as: 'blogs',
});
modelBlog.belongsTo(modelUser, {
    foreignKey: 'authorId',
    as: 'author',
});

// ========== CATEGORY RELATIONSHIPS ==========
// Category có nhiều Products
modelCategory.hasMany(modelProduct, {
    foreignKey: 'categoryId',
    as: 'products',
});
modelProduct.belongsTo(modelCategory, {
    foreignKey: 'categoryId',
    as: 'category',
});

// ========== PRODUCT RELATIONSHIPS ==========
// Product có nhiều Cart items
modelProduct.hasMany(modelCart, {
    foreignKey: 'productId',
    as: 'cartItems',
});
modelCart.belongsTo(modelProduct, {
    foreignKey: 'productId',
    as: 'product',
});

// Product có nhiều Payments (đã có)
modelPayment.belongsTo(modelProduct, {
    foreignKey: 'productId',
    as: 'product',
});
modelProduct.hasMany(modelPayment, {
    foreignKey: 'productId',
    as: 'payments',
});

// Product có nhiều Preview Products
modelProduct.hasMany(modelPreviewProduct, {
    foreignKey: 'productId',
    as: 'previews',
});
modelPreviewProduct.belongsTo(modelProduct, {
    foreignKey: 'productId',
    as: 'product',
});

// ========== COUPON RELATIONSHIPS ==========
// Coupon có thể được sử dụng trong nhiều Payments
modelCoupon.hasMany(modelPayment, {
    foreignKey: 'couponId',
    as: 'payments',
});
modelPayment.belongsTo(modelCoupon, {
    foreignKey: 'couponId',
    as: 'coupon',
});

// User có thể có nhiều Coupon (nếu coupon được assign cho user)
modelUser.hasMany(modelCoupon, {
    foreignKey: 'userId',
    as: 'coupons',
});
modelCoupon.belongsTo(modelUser, {
    foreignKey: 'userId',
    as: 'user',
});

// ========== MANY-TO-MANY RELATIONSHIPS ==========
// User và Product có quan hệ many-to-many qua Cart
// (Đã thiết lập thông qua Cart ở trên)

// User và Coupon có thể có quan hệ many-to-many nếu cần
// (Có thể tạo bảng UserCoupon riêng nếu 1 coupon có thể dùng cho nhiều user)

// Hàm dọn dẹp dữ liệu không hợp lệ
const cleanupInvalidData = async () => {
    try {
        // Xóa notifications có userId không tồn tại trong users
        await connect.query(`
            DELETE n FROM notications n 
            LEFT JOIN users u ON n.userId = u.id 
            WHERE u.id IS NULL AND n.userId IS NOT NULL
        `);

        // Xóa các bản ghi khác có foreign key không hợp lệ
        await connect.query(`
            DELETE c FROM carts c 
            LEFT JOIN users u ON c.userId = u.id 
            WHERE u.id IS NULL AND c.userId IS NOT NULL
        `);

        await connect.query(`
            DELETE p FROM payments p 
            LEFT JOIN users u ON p.userId = u.id 
            WHERE u.id IS NULL AND p.userId IS NOT NULL
        `);

        console.log('✅ Cleaned up invalid foreign key data');
    } catch (error) {
        console.log('⚠️ Cleanup warning:', error.message);
    }
};

const sync = async () => {
    try {
        // Bước 1: Dọn dẹp dữ liệu không hợp lệ trước
        await cleanupInvalidData();

        // Bước 2: Sync các bảng parent trước (không có foreign key)
        await modelUser.sync({ alter: true });
        await modelCategory.sync({ alter: true });

        // Bước 3: Sync các bảng có foreign key theo thứ tự dependency
        await modelApikey.sync({ alter: true });
        await modelProduct.sync({ alter: true });
        await modelCoupon.sync({ alter: true });
        await modelCart.sync({ alter: true });
        await modelPayment.sync({ alter: true });
        await modelMessage.sync({ alter: true });
        await modelPreviewProduct.sync({ alter: true });
        await modelNotication.sync({ alter: true });
        await modelOtp.sync({ alter: true });
        await modelBlog.sync({ alter: true });
        await modelChatbot.sync({ alter: true });

        // Bước 4: Sync toàn bộ database với relationships
        await connect.sync({ alter: true });

        console.log('✅ Database synced successfully with relationships');
    } catch (error) {
        console.error('❌ Error syncing database:', error);

        // Thử phương án backup: sync mà không thay đổi cấu trúc
        try {
            console.log('🔄 Trying fallback sync without alter...');
            await connect.sync({ force: false });
            console.log('✅ Fallback sync completed');
        } catch (fallbackError) {
            console.error('❌ Fallback sync also failed:', fallbackError.message);
            throw error;
        }
    }
};

module.exports = sync;
