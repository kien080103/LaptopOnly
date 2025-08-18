import axios from 'axios';

import { apiClient } from './axiosClient';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const apiUser = '/api/user';

export const requestRegister = async (data) => {
    const res = await request.post(`${apiUser}/register`, data);
    return res;
};

export const requestLogin = async (data) => {
    const res = await request.post(`${apiUser}/login`, data);
    return res;
};

export const requestLoginGoogle = async (data) => {
    const res = await request.post(`${apiUser}/login-google`, data);
    return res;
};

export const requestAuth = async () => {
    const res = await apiClient.get(`${apiUser}/auth`);
    return res.data;
};

export const requestLogout = async () => {
    const res = await apiClient.get(`${apiUser}/logout`);
    return res.data;
};

export const requestRefreshToken = async () => {
    const res = await request.get(`${apiUser}/refresh-token`);
    return res.data;
};

export const requestGetUsers = async () => {
    const res = await apiClient.get(`${apiUser}/get-users`);
    return res.data;
};

export const requestUpdateUser = async (data) => {
    const res = await apiClient.post(`${apiUser}/update-user`, data);
    return res.data;
};

export const requestDeleteUser = async (data) => {
    const res = await apiClient.post(`${apiUser}/delete-user`, data);
    return res.data;
};

export const requestUpdatePassword = async (data) => {
    const res = await apiClient.post(`${apiUser}/update-password`, data);
    return res.data;
};

export const requestGetDashboard = async () => {
    const res = await apiClient.get(`${apiUser}/get-dashboard`);
    return res.data;
};

export const requestForgotPassword = async (data) => {
    const res = await apiClient.post(`${apiUser}/forgot-password`, data);
    return res.data;
};

export const requestResetPassword = async (data) => {
    const res = await apiClient.post(`${apiUser}/reset-password`, data);
    return res.data;
};

export const requestCreateUser = async (data) => {
    const res = await apiClient.post(`${apiUser}/create-user`, data);
    return res.data;
};

export const requestGetAllUser = async () => {
    const res = await apiClient.get(`${apiUser}/get-users`);
    return res.data;
};

export const requestUpdateUserAdmin = async (data) => {
    const res = await apiClient.post(`${apiUser}/update-user-admin`, data);
    return res.data;
};

//// category

const apiCategory = '/api/category';

export const requestGetCategories = async () => {
    const res = await apiClient.get(`${apiCategory}/gets`);
    return res.data;
};

export const requestCreateCategory = async (data) => {
    const res = await apiClient.post(`${apiCategory}/create`, data);
    return res.data;
};

export const requestUpdateCategory = async (data) => {
    const res = await apiClient.post(`${apiCategory}/update`, data);
    return res.data;
};

export const requestDeleteCategory = async (data) => {
    const res = await apiClient.post(`${apiCategory}/delete`, data);
    return res.data;
};

//// product
const apiProduct = '/api/product';

export const requestGetProducts = async () => {
    const res = await apiClient.get(`${apiProduct}/get-products`);
    return res.data;
};

export const requestGetProductById = async (id) => {
    const res = await apiClient.get(`${apiProduct}/product?id=${id}`);
    return res.data;
};

export const requestSearchProduct = async (data) => {
    const res = await request.get(`${apiProduct}/search?q=${data}`);
    return res.data;
};

export const requestGetAllProducts = async () => {
    const res = await apiClient.get(`${apiProduct}/all`);
    return res.data;
};

export const requestUploadImageProduct = async (data) => {
    const res = await apiClient.post(`${apiProduct}/uploads`, data);
    return res.data;
};

export const requestCreateProduct = async (data) => {
    const res = await apiClient.post(`${apiProduct}/create`, data);
    return res.data;
};

export const requestUpdateProduct = async (data) => {
    const res = await apiClient.post(`${apiProduct}/update`, data);
    return res.data;
};

export const requestDeleteProduct = async (data) => {
    const res = await apiClient.post(`${apiProduct}/delete`, data);
    return res.data;
};

//// cart
const apiCart = '/api/cart';

export const requestCreateCart = async (data) => {
    const res = await apiClient.post(`${apiCart}/create`, data);
    return res.data;
};

export const requestGetCart = async () => {
    const res = await apiClient.get(`${apiCart}/get-cart`);
    return res.data;
};

export const requestRemoveCartItem = async (productId) => {
    const res = await apiClient.post(`${apiCart}/remove`, { productId });
    return res.data;
};

export const requestUpdateInfoCart = async (data) => {
    const res = await apiClient.post(`${apiCart}/update-info`, data);
    return res.data;
};

export const requestUpdateQuantityCart = async (data) => {
    const res = await apiClient.put(`${apiCart}/update-quantity`, data);
    return res.data;
};

export const requestGetInfoCart = async () => {
    const res = await apiClient.get(`${apiCart}/get-info-cart`);
    return res.data;
};

/// payments
const apiPayments = '/api/payments';

export const requestCreatePayment = async (data) => {
    const res = await apiClient.post(`${apiPayments}/create`, data);
    return res.data;
};

export const requestGetPaymentById = async (id) => {
    const res = await apiClient.get(`${apiPayments}/payment?id=${id}`);
    return res.data;
};

export const requestGetPaymentsUser = async () => {
    const res = await apiClient.get(`${apiPayments}/payments`);
    return res.data;
};

export const requestCancelPayment = async (data) => {
    const res = await apiClient.post(`${apiPayments}/cancel`, data);
    return res.data;
};

export const requestGetPayments = async () => {
    const res = await apiClient.get(`${apiPayments}/payments-admin`);
    return res.data;
};

export const requestUpdateStatusPayment = async (data) => {
    const res = await apiClient.post(`${apiPayments}/update-status`, data);
    return res.data;
};

/// favourite
const apiFavourite = '/api/favourite';

export const requestAddFavouriteProduct = async (data) => {
    const res = await apiClient.post(`${apiFavourite}/add-favourite-product`, data);
    return res.data;
};

export const requestDeleteFavouriteProduct = async (data) => {
    const res = await apiClient.post(`${apiFavourite}/delete-favourite-product`, data);
    return res.data;
};

export const requestGetFavouriteProducts = async () => {
    const res = await apiClient.get(`${apiFavourite}/get-favourite-products`);
    return res.data;
};

/// website
const apiWebsite = '/api/website';

export const requestCreateBanner = async (data) => {
    const res = await apiClient.post(`${apiWebsite}/create`, data);
    return res.data;
};

export const requestGetBanner = async () => {
    const res = await apiClient.get(`${apiWebsite}/get`);
    return res.data;
};

export const requestDeleteBanner = async (data) => {
    const res = await apiClient.post(`${apiWebsite}/delete`, data);
    return res.data;
};

//// message
const apiMessage = '/api/message';

export const requestCreateMessage = async (data) => {
    const res = await apiClient.post(`${apiMessage}/create`, data);
    return res.data;
};

export const requestGetMessagesUser = async () => {
    const res = await apiClient.get(`${apiMessage}/all`);
    return res.data;
};

export const requestGetMessages = async (data) => {
    const res = await apiClient.get(`${apiMessage}/get-message`, {
        params: {
            receiverId: data?.receiverId,
            senderId: data?.senderId,
        },
    });
    return res.data;
};

export const requestCreateMessageAdmin = async (data) => {
    const res = await apiClient.post(`${apiMessage}/create-admin`, data);
    return res.data;
};

export const requestReadMessage = async (data) => {
    const res = await apiClient.get(`${apiMessage}/read-message`, {
        params: {
            receiverId: data?.receiverId,
            senderId: data?.senderId,
        },
    });
    return res.data;
};
