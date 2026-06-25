import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // In-memory database for consultation bookings
  let bookings = [
    {
      id: 'book-1',
      customerName: 'Trần Văn Hùng',
      phone: '0912345678',
      email: 'hung.tran@gmail.com',
      productInterest: 'Vay Kinh Doanh',
      appointmentDate: '2026-07-02',
      preferredTime: '09:00',
      note: 'Tôi cần vay 1.5 tỷ kinh doanh vật liệu xây dựng tại thị trấn Bến Lức.',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
      status: 'contacted'
    },
    {
      id: 'book-2',
      customerName: 'Lê Thị Mai',
      phone: '0987654321',
      email: 'maile@yahoo.com',
      productInterest: 'Tiết Kiệm iPay',
      appointmentDate: '2026-07-03',
      preferredTime: '14:30',
      note: 'Muốn tìm hiểu gửi tiết kiệm online nhận cộng thêm lãi suất.',
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
  ];

  // Initialize Gemini API Client
  const geminiApiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (geminiApiKey) {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn('⚠️ Warning: GEMINI_API_KEY environment variable is not defined.');
  }

  // --- API ENDPOINTS ---

  // Get all bookings (simple access, can support custom password)
  app.get('/api/bookings', (req, res) => {
    const password = req.query.password;
    // We let Mrs. Cẩm Tú access with password "camtu123"
    if (password !== 'camtu123' && req.headers['authorization'] !== 'camtu123') {
      return res.status(200).json({ success: true, bookings: [] }); // Empty or mock restricted state
    }
    res.json({ success: true, bookings });
  });

  // Create new booking
  app.post('/api/bookings', (req, res) => {
    const { customerName, phone, email, productInterest, appointmentDate, preferredTime, note } = req.body;

    if (!customerName || !phone || !productInterest) {
      return res.status(400).json({ error: 'Họ tên, số điện thoại và dịch vụ quan tâm là bắt buộc.' });
    }

    const newBooking = {
      id: `book-${Date.now()}`,
      customerName,
      phone,
      email,
      productInterest,
      appointmentDate,
      preferredTime,
      note,
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
    };

    bookings.unshift(newBooking); // Add to beginning of the array
    res.status(201).json({ success: true, booking: newBooking });
  });

  // Update booking status
  app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const bookingIndex = bookings.findIndex((b) => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Không tìm thấy hồ sơ lịch hẹn.' });
    }

    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      status: status || bookings[bookingIndex].status,
    };

    res.json({ success: true, booking: bookings[bookingIndex] });
  });

  // Delete booking (For cleaning up)
  app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    bookings = bookings.filter((b) => b.id !== id);
    res.json({ success: true });
  });

  // AI Assistant Chat endpoint using server-side Gemini SDK
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Nội dung tin nhắn trống.' });
    }

    if (!ai) {
      return res.json({
        reply: 'Xin chào! Tôi là Trợ lý AI của chị Nguyễn Thị Cẩm Tú - Phó Giám đốc VietinBank Bến Lức. Hiện tại Hệ thống AI đang ở chế độ offline do thiếu khóa API, tuy nhiên bạn có thể liên hệ trực tiếp số Hotline 0908.123.456 hoặc điền phiếu đặt hẹn tư vấn để được chị Tú và nhóm chuyên viên hỗ trợ trực tiếp nhanh nhất nhé!',
      });
    }

    try {
      // Setup the systemic prompt containing localized knowledge about VietinBank Bến Lức, Mrs. Nguyễn Thị Cẩm Tú, and products
      const systemInstruction = `
Bạn là Trợ lý AI cá nhân vô cùng chuyên nghiệp, lịch sự và chu đáo của chị Nguyễn Thị Cẩm Tú - Phó Giám đốc VietinBank Chi nhánh Bến Lức (Long An).
Nhiệm vụ của bạn là thay mặt chị Nguyễn Thị Cẩm Tú chào đón, tư vấn và giải đáp các thắc mắc về dịch vụ tài chính của VietinBank Bến Lức cho khách hàng.

Thông tin về chị Nguyễn Thị Cẩm Tú & Chi nhánh Bến Lức:
- Chủ quản trang web: Nguyễn Thị Cẩm Tú, chức vụ Phó Giám đốc VietinBank Chi nhánh Bến Lức.
- Địa chỉ chi nhánh: Số 159, Quốc lộ 1A, Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An.
- SĐT Hotline hỗ trợ: 0908.123.456 (khuyên khách hàng gọi hoặc đăng ký đặt lịch để chị Tú và chuyên viên hỗ trợ chu đáo nhất).
- Phong cách giao tiếp: Lịch lãm, chuyên nghiệp, ấm áp, tận tâm, mang đậm dấu ấn ngân hàng quốc doanh VietinBank. Sử dụng tiếng Việt lịch sự, thường xuyên xưng "Tôi" hoặc "VietinBank Bến Lức" hoặc "Trợ lý của chị Cẩm Tú", gọi người dùng là "Anh/Chị" hoặc "Quý khách".

Danh mục sản phẩm cốt lõi tại VietinBank Bến Lức để bạn tư vấn:
1. Gói Vay Sản Xuất Kinh Doanh Ưu Đãi: Lãi suất cạnh tranh từ 5.0% - 5.5%/năm, hạn mức tới 85% vốn thực tế, giải ngân thần tốc trong 24h - 48h. Rất phù hợp với các doanh nghiệp sản xuất, doanh nghiệp phụ trợ trong các khu công nghiệp tại Bến Lức (Thuận Đạo, Vĩnh Lộc 2, Phúc Long, Phú An Thạnh...) và các hộ kinh doanh địa phương.
2. Cho vay mua nhà tổ ấm: Lãi suất cố định chỉ từ 5.8%/năm, thời gian vay tối đa 35 năm, tỷ lệ tài trợ đến 80% tài sản bảo đảm.
3. Gửi Tiết Kiệm iPay: Cộng thêm lãi suất online từ +0.3% đến +0.5%/năm so với tại quầy, lãi suất cực hạn lên tới 6.0%/năm. Giao dịch an toàn 100% qua app iPay.
4. Hệ sinh thái số VietinBank iPay: Miễn phí chuyển tiền trọn đời, mở tài khoản trực tuyến eKYC trong 2 phút, đặc quyền đặt tài khoản biệt danh Alias/Nickname.
5. Đặc quyền Khách hàng ưu tiên (VietinBank Premium / Priority): Sảnh chờ VIP chuyên biệt, quầy phục vụ ưu tiên tại Bến Lức, thẻ tín dụng Signature hoàn tiền 15%, đặc quyền phòng chờ sân bay miễn phí toàn cầu, tư vấn quản lý tài sản chuyên sâu trực tiếp từ chị Nguyễn Thị Cẩm Tú và đội ngũ chuyên viên cấp cao.

Quy định tư vấn:
- Luôn trả lời ngắn gọn, rõ ràng, chia ý rõ bằng gạch đầu dòng để khách hàng dễ đọc trên di động.
- Tránh trả lời chung chung. Hãy gắn liền giải pháp tài chính với lợi thế địa bàn huyện Bến Lức (như vị trí thuận lợi, kết nối các khu công nghiệp, hỗ trợ doanh nghiệp nông sản/thủy sản/sản xuất công nghiệp).
- Cuối câu trả lời luôn gợi ý lịch sự rằng khách hàng có thể sử dụng tính năng "Đăng ký tư vấn trực tiếp" trên website hoặc liên hệ hotline 0908.123.456 để chị Cẩm Tú đặt lịch làm việc riêng.
- Nếu câu hỏi không liên quan đến ngân hàng hoặc dịch vụ của VietinBank, hãy lịch sự lái câu chuyện về thế mạnh hỗ trợ tài chính của VietinBank Bến Lức.
`;

      // Build chat content including simplified history
      const formattedContents = [];

      if (history && Array.isArray(history)) {
        for (const msg of history) {
          formattedContents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
      }

      // Add the latest message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Call Gemini API
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Xin lỗi, tôi không nhận được phản hồi từ hệ thống trí tuệ nhân tạo. Quý khách vui lòng thử lại hoặc đăng ký tư vấn trực tiếp nhé!';
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: 'Lỗi máy chủ khi kết nối với Trợ lý AI.',
        reply: 'Hệ thống Trợ lý AI tạm thời bận. Anh/Chị có thể trực tiếp gửi thông tin qua form đăng ký tư vấn ở bên dưới hoặc liên hệ số Hotline 0908.123.456 để chị Nguyễn Thị Cẩm Tú trực tiếp hỗ trợ ngay nhé!',
      });
    }
  });

  // --- VITE DEV SERVER & STATIC ASSETS HANDLER ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
