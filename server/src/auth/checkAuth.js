const { AuthFailureError, BadRequestError } = require('../core/error.response');
const { verifyToken } = require('../services/tokenServices');
const modelUser = require('../models/users.model');

const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

const authUser = async (req, res, next) => {
    try {
        const user = req.cookies.token;
        if (!user) throw new AuthFailureError('Vui lòng đăng nhập');
        const token = user;
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);

        next(error);
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const user = req.cookies.token;
        if (!user) throw new AuthFailureError('Bạn không có quyền truy cập');
        const token = user;
        const decoded = await verifyToken(token);
        const { id } = decoded;
        const findUser = await modelUser.findOne({ where: { id } });
        if (findUser.isAdmin === '0') {
            throw new AuthFailureError('Bạn không có quyền truy cập');
        }
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
// const authAdmin = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             throw new AuthFailureError('Bạn chưa đăng nhập');
//         }

//         const token = authHeader.split(' ')[1];
//         if (!token) {
//             throw new AuthFailureError('Token không hợp lệ');
//         }

//         const decoded = await verifyToken(token);
//         const { id } = decoded;

//         const user = await modelUser.findOne({
//             where: { id },
//             attributes: ['id', 'username', 'isAdmin'],
//         });

//         if (!user) {
//             throw new AuthFailureError('Tài khoản không tồn tại');
//         }

//         if (user.isAdmin !== 1) {
//             throw new AuthFailureError('Bạn không có quyền truy cập');
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    asyncHandler,
    authUser,
    authAdmin,
};
