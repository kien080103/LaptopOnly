import { apiClient } from './axiosClient';

const apiChatbot = '/api/chatbot';

export const requestCreateMessage = async (data) => {
    const res = await apiClient.post(`${apiChatbot}/create`, data);
    return res.data;
};

export const requestGetMessages = async () => {
    const res = await apiClient.get(`${apiChatbot}/messages`);
    return res.data;
};
