const { askLaptopAssistant } = require('../utils/askComputerAssistant');

const chatbotModel = require('../models/messagerChatBot.model');
const { OK } = require('../core/success.response');

class ChatbotController {
    async createMessage(req, res) {
        const { question } = req.body;
        const { id: userId } = req.user;
        const response = await askLaptopAssistant(question, userId);

        await chatbotModel.create({
            userId: userId,
            sender: 'user',
            content: question,
        });

        await chatbotModel.create({
            userId: userId,
            sender: 'bot',
            content: response,
        });

        return new OK({
            message: 'Success',
            metadata: response,
        }).send(res);
    }

    async getMessages(req, res) {
        const { id: userId } = req.user;
        const messages = await chatbotModel.findAll({ where: { userId } });

        return new OK({
            message: 'Success',
            metadata: messages,
        }).send(res);
    }
}

module.exports = new ChatbotController();
