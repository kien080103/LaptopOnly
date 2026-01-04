const Groq = require('groq-sdk');
const product = require('../models/products.model');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
});

// Mapping mục đích sử dụng (GIỮ NGUYÊN)
const purposeMapping = {
    gaming: {
        name: 'Chơi Game',
        description: 'Game AAA, FPS cao, streaming',
        requirements: {
            cpu: 'Intel i5/i7 gen 10+ hoặc AMD Ryzen 5/7',
            gpu: 'GPU rời RTX 3060/4060+ hoặc RX 6600+',
            ram: 'RAM 16GB DDR4/DDR5',
            storage: 'SSD NVMe 512GB+',
            display: 'Màn hình 120Hz+, độ trễ thấp',
            cooling: 'Hệ thống tản nhiệt mạnh',
        },
        priorities: ['GPU hiệu năng cao', 'CPU mạnh', 'RAM đủ lớn', 'Tản nhiệt tốt', 'Màn hình cao tần số'],
    },
    office: {
        name: 'Văn Phòng',
        description: 'Word, Excel, PowerPoint, Email',
        requirements: {
            cpu: 'Intel i3/i5 hoặc AMD Ryzen 3/5',
            gpu: 'GPU tích hợp đã đủ',
            ram: 'RAM 8-16GB',
            storage: 'SSD 256GB+',
            display: 'Màn hình Full HD, chống chói',
            battery: 'Pin 6-8 tiếng sử dụng',
        },
        priorities: ['Thời lượng pin', 'Trọng lượng nhẹ', 'Giá cả hợp lý', 'Độ bền', 'Màn hình rõ nét'],
    },
    design: {
        name: 'Thiết Kế Đồ Họa',
        description: 'Photoshop, Illustrator, Figma',
        requirements: {
            cpu: 'Intel i7/i9 hoặc AMD Ryzen 7/9',
            gpu: 'GPU rời RTX 3070+ hoặc RX 6700XT+',
            ram: 'RAM 16-32GB',
            storage: 'SSD NVMe 1TB+',
            display: 'Màn hình 4K hoặc 2K, độ chính xác màu cao',
            color: '100% sRGB, Adobe RGB',
        },
        priorities: ['Chất lượng màn hình', 'GPU mạnh', 'RAM lớn', 'CPU đa nhân', 'Không gian lưu trữ'],
    },
    video: {
        name: 'Dựng Video',
        description: 'Premiere, After Effects, DaVinci',
        requirements: {
            cpu: 'Intel i7/i9 hoặc AMD Ryzen 7/9',
            gpu: 'GPU rời RTX 4070+ với VRAM 12GB+',
            ram: 'RAM 32GB+ DDR4/DDR5',
            storage: 'SSD NVMe 1TB+ tốc độ cao',
            display: 'Màn hình 4K, độ chính xác màu cao',
            cooling: 'Tản nhiệt mạnh cho workload nặng',
        },
        priorities: ['CPU đa nhân mạnh', 'RAM siêu lớn', 'GPU VRAM cao', 'SSD tốc độ cao', 'Tản nhiệt xuất sắc'],
    },
    coding: {
        name: 'Lập Trình',
        description: 'VS Code, Database, Server',
        requirements: {
            cpu: 'Intel i5/i7 hoặc AMD Ryzen 5/7',
            gpu: 'GPU tích hợp đủ dùng',
            ram: 'RAM 16GB+',
            storage: 'SSD NVMe 512GB+',
            display: 'Màn hình Full HD+, không nhấp nháy',
            keyboard: 'Bàn phím tốt, gõ êm',
        },
        priorities: ['CPU ổn định', 'RAM đủ lớn', 'SSD nhanh', 'Màn hình không mỏi mắt', 'Bàn phím chất lượng'],
    },
    student: {
        name: 'Học Tập',
        description: 'Nghiên cứu, học online, giải trí',
        requirements: {
            cpu: 'Intel i3/i5 hoặc AMD Ryzen 3/5',
            gpu: 'GPU tích hợp',
            ram: 'RAM 8-16GB',
            storage: 'SSD 256-512GB',
            display: 'Màn hình Full HD, bảo vệ mắt',
            battery: 'Pin 6-10 tiếng',
        },
        priorities: ['Giá cả phải chăng', 'Pin lâu', 'Trọng lượng nhẹ', 'Độ bền tốt', 'Đa tác vụ cơ bản'],
    },
};

// ==============================
// 🎯 MAIN FUNCTION
// ==============================
async function analyzeProductForPurpose(reviewData) {
    try {
        const { purpose, productId } = reviewData;

        const productData = await product.findOne({ where: { id: productId } });
        if (!productData) throw new Error('Sản phẩm không tồn tại');

        const purposeInfo = purposeMapping[purpose];
        if (!purposeInfo) throw new Error('Mục đích sử dụng không hợp lệ');

        // HTML sản phẩm
        const productHTML = `
        <div style="border:2px solid #007bff;padding:16px;border-radius:12px;background:#f8f9ff">
            <h2>${productData.nameProduct}</h2>
            <p>💰 Giá: ${Number(productData.priceProduct).toLocaleString('vi-VN')} VND</p>
            <p><strong>Danh mục:</strong> ${productData.categoryProduct}</p>
            <p><strong>Mô tả:</strong> ${productData.descriptionProduct}</p>
        </div>
        `;

        // Prompt
        const prompt = `
Bạn là CHUYÊN GIA tư vấn laptop chuyên nghiệp.

MỤC ĐÍCH SỬ DỤNG:
- ${purposeInfo.name}: ${purposeInfo.description}

YÊU CẦU KỸ THUẬT:
${Object.entries(purposeInfo.requirements)
    .map(([k, v]) => `- ${k.toUpperCase()}: ${v}`)
    .join('\n')}

ƯU TIÊN:
${purposeInfo.priorities.join(', ')}

SẢN PHẨM:
${productHTML}

YÊU CẦU:
- Phân tích chi tiết theo từng mục
- Chấm điểm 1-10
- Trả về HTML đẹp
- Không bịa thông tin
`;

        // ==============================
        // 🔥 GROQ API CALL
        // ==============================
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'Bạn là chuyên gia tư vấn laptop.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.4,
            max_tokens: 4000,
        });

        const analysis = completion.choices[0].message.content;

        return {
            success: true,
            analysis: analysis.replace(/```(html)?/g, '').trim(),
            purpose: purposeInfo.name,
            productName: productData.nameProduct,
            productId,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error.message,
            analysis: `
            <div style="padding:16px;color:#c53030">
                ❌ Không thể phân tích sản phẩm lúc này
            </div>
            `,
        };
    }
}

module.exports = { analyzeProductForPurpose };
