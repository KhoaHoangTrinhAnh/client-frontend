# client-frontend

Đây là frontend client dành cho người dùng cuối, cho phép xem nội dung công khai theo thời gian thực.

## 🧱 Công nghệ sử dụng

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

## 🚀 Chức năng

- Đăng ký, đăng nhập người dùng
- Xem nội dung công khai (text, image, video)
- Nhận nội dung mới **real-time** thông qua WebSocket
- Không phân quyền: tất cả user (admin, editor, client) đều có thể đăng nhập và xem

## ⚙️ Cài đặt
```bash
# Clone repository
git clone https://github.com/your-username/client-frontend.git
cd client-frontend

# Cài đặt dependencies
npm install

# Khởi chạy ứng dụng
npm run dev

Ứng dụng sẽ chạy tại: http://localhost:5173
Lưu ý: Hệ thống hoạt động chuẩn khi bạn đã khởi động đúng thứ tự: backend ->  client-frontend -> admin-frontend

📁 Cấu trúc cơ bản
client-frontend/
├── src/
│   ├── pages/         # Các trang chính: Login, Register, Home
│   ├── components/    # Các thành phần giao diện
│   ├── hooks/    # Các thành phần giao diện
│   ├── services/      # Gọi API và socket client
│   └── main.tsx       # Điểm khởi đầu ứng dụng
├── public/
├── vite.config.ts
└── package.json

📦 Phụ thuộc chính
- axios
- react-router-dom
- socket.io-client
- classnames
- tailwindcss, postcss, autoprefixer

📬 Liên hệ
Tác giả: Hoàng Trịnh Anh Khoa
Email: khoahoangtrinhanh@gmail.com
link Github: https://github.com/KhoaHoangTrinhAnh

