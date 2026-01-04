import axios from 'axios';
import Cookies from 'js-cookie';
import { requestRefreshToken } from './request';

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL || import.meta.env.VITE_API_URL || 'http://localhost:3001';

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            withCredentials: true,
        });

        this.isRefreshing = false;
        this.failedQueue = [];

        this.setupInterceptors();
    }

    // ================= INTERCEPTORS =================
    setupInterceptors() {
        // 👉 REQUEST
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const accessToken = Cookies.get('accessToken');

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error),
        );

        // 👉 RESPONSE
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // ❌ Không có response → lỗi mạng
                if (!error.response) {
                    return Promise.reject(error);
                }

                // ❌ Không phải 401 → bỏ qua
                if (error.response.status !== 401) {
                    return Promise.reject(error);
                }

                // ❌ Tránh loop vô hạn
                if (originalRequest._retry) {
                    this.logoutAndRedirect();
                    return Promise.reject(error);
                }

                // ❌ Chưa login
                if (!this.isLoggedIn()) {
                    this.logoutAndRedirect();
                    return Promise.reject(error);
                }

                // ⏳ Đang refresh → xếp hàng
                if (this.isRefreshing) {
                    return new Promise((resolve, reject) => {
                        this.failedQueue.push({ resolve, reject });
                    })
                        .then(() => this.axiosInstance(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                // 🔁 REFRESH TOKEN
                originalRequest._retry = true;
                this.isRefreshing = true;

                try {
                    await requestRefreshToken();
                    this.processQueue(null);
                    return this.axiosInstance(originalRequest);
                } catch (refreshError) {
                    this.processQueue(refreshError);
                    this.logoutAndRedirect();
                    return Promise.reject(refreshError);
                } finally {
                    this.isRefreshing = false;
                }
            },
        );
    }

    // ================= HELPERS =================
    processQueue(error) {
        this.failedQueue.forEach(({ resolve, reject }) => {
            error ? reject(error) : resolve();
        });
        this.failedQueue = [];
    }

    isLoggedIn() {
        return Cookies.get('logged') === '1';
    }

    async logoutAndRedirect() {
        try {
            await this.axiosInstance.get('/api/users/logout');
        } catch (_) {
            // ignore
        } finally {
            Cookies.remove('accessToken');
            Cookies.remove('logged');
            window.location.href = '/login';
        }
    }

    // ================= METHODS =================
    get(url, config) {
        return this.axiosInstance.get(url, config);
    }

    post(url, data, config) {
        return this.axiosInstance.post(url, data, config);
    }

    put(url, data, config) {
        return this.axiosInstance.put(url, data, config);
    }

    delete(url, config) {
        return this.axiosInstance.delete(url, config);
    }

    patch(url, data, config) {
        return this.axiosInstance.patch(url, data, config);
    }
}

export const apiClient = new ApiClient();
export default apiClient;
