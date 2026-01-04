const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const Product = require('../models/products.model');
const MessageChatbot = require('../models/messagerChatbot.model');

/**
 * AI tư vấn laptop (có ngữ cảnh hội thoại)
 * @param {string} question - Câu hỏi người dùng
 * @param {string} userId - ID người dùng
 * @returns {Promise<string>} - Câu trả lời từ AI
 */
async function askLaptopAssistant(question, userId) {
    try {
        // 🧠 Lấy 5 tin nhắn gần nhất
        const recentMessages = await MessageChatbot.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 5,
        });

        const conversation = recentMessages.reverse();

        const conversationText = conversation
            .map((msg) => `${msg.sender === 'user' ? 'Người dùng' : 'Bot'}: ${msg.content}`)
            .join('\n');

        // 💻 Lấy danh sách laptop (20 sản phẩm mới nhất)
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']],
            limit: 20,
        });

        if (!products.length) {
            return '💻 Hiện tại cửa hàng chưa có laptop nào. Vui lòng quay lại sau.';
        }

        const formatPrice = (price) => {
            if (price >= 1e6) return `${(price / 1e6).toFixed(1)} triệu`;
            return price.toLocaleString('vi-VN');
        };

        const productData = products
            .map((p) => {
                return `
🖥️ Tên: ${p.nameProduct}
💰 Giá: ${formatPrice(p.priceProduct)} VNĐ
🏷️ Danh mục: ${p.categoryProduct}
📦 Tồn kho: ${p.stockProduct}
🎯 Giảm giá: ${p.discountProduct}%
⚙️ Cấu hình:
- CPU: ${p.specsProduct?.cpu || 'N/A'}
- RAM: ${p.specsProduct?.ram || 'N/A'}
- Ổ cứng: ${p.specsProduct?.storage || 'N/A'}
- GPU: ${p.specsProduct?.gpu || 'N/A'}
- Màn hình: ${p.specsProduct?.screen || 'N/A'}
📝 Mô tả: ${p.descriptionProduct ? p.descriptionProduct.substring(0, 100) + '...' : 'Không có'}
--------------------------`;
            })
            .join('\n');

        // 🧩 Prompt huấn luyện
        const trainingPrompt = `
Bạn là "LaptopBot" – trợ lý AI tư vấn laptop chuyên nghiệp tại Việt Nam.

Danh sách laptop hiện có trong cửa hàng:

${productData}

Lịch sử trò chuyện gần đây:
${conversationText}

Người dùng vừa hỏi: "${question}"

Nhiệm vụ của bạn:
1. 🎯 Hiểu nhu cầu người dùng:
   - Mục đích sử dụng (học tập, văn phòng, lập trình, gaming, thiết kế, AI, đồ họa)
   - Ngân sách
   - Ưu tiên cấu hình (CPU, RAM, GPU, màn hình)
2. 💻 Gợi ý laptop phù hợp nhất:
   - So sánh hiệu năng / giá
   - Giải thích rõ ưu & nhược điểm
   - Gợi ý nâng cấp nếu cần
3. 💬 Trả lời như nhân viên tư vấn laptop chuyên nghiệp:
   - Thân thiện, dễ hiểu
   - Dùng emoji hợp lý 💻🔥
4. ⚠️ KHÔNG chốt đơn, KHÔNG tạo giao dịch
5. ❓ Nếu người dùng hỏi chung chung → hỏi lại để làm rõ nhu cầu
6. ✅ Nếu không có laptop phù hợp 100%, hãy gợi ý phương án gần đúng nhất

Luôn trả lời bằng TIẾNG VIỆT, ngắn gọn, rõ ràng.
`;

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content:
                        'Bạn là LaptopBot – trợ lý AI tư vấn laptop tại Việt Nam. Bạn am hiểu phần cứng, giá cả thị trường, thân thiện và tư vấn trung thực. Luôn trả lời bằng tiếng Việt và có dùng emoji phù hợp.',
                },
                {
                    role: 'user',
                    content: trainingPrompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ Lỗi askLaptopAssistant:', error);
        return '💻 Xin lỗi, hệ thống tư vấn laptop đang gặp lỗi. Vui lòng thử lại sau.';
    }
}

module.exports = { askLaptopAssistant };
