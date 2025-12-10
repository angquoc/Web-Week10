# React Authentication with JWT (Access + Refresh Token)

Dự án Demo hệ thống xác thực người dùng (Authentication) hoàn chỉnh phía Client sử dụng React, Axios Interceptors và React Query.

## Live Demo
Trang web đã được deploy tại: **[DÁN LINK VERCEL/NETLIFY CỦA BẠN VÀO ĐÂY]**

## Tính năng chính
* **Đăng nhập (Login):** Sử dụng React Hook Form để validate.
* **Tự động Refresh Token:** Sử dụng Axios Interceptor để bắt lỗi 401 và lấy token mới tự động.
* **Protected Routes:** Bảo vệ các trang Dashboard, chỉ cho phép truy cập khi đã đăng nhập.
* **Đăng xuất (Logout):** Xóa sạch token ở LocalStorage và Cache.
* **Persistent Login:** Giữ trạng thái đăng nhập khi f5 trang.

## Công nghệ sử dụng
* **Frontend:** React (Vite), React Router Dom
* **State Management:** TanStack Query (React Query)
* **API Client:** Axios (kèm Interceptors)
* **Form:** React Hook Form
* **Backend:** Node.js (Mock Server đơn giản)

## Hướng dẫn Cài đặt & Chạy (Setup & Run)

Để chạy dự án dưới local, bạn cần mở 2 terminal (một cho Frontend, một cho Backend).

### 1. Clone dự án
```bash
git clone https://github.com/angquoc/Web-Week10
cd [TEN_THU_MUC]
```

### 2. Chạy Backend (Mock Server)
Server sẽ chạy tại http://localhost:3000

```bash
# Cài đặt thư viện cho server (nếu chưa cài)
npm install express cors jsonwebtoken

# Chạy server
node server.js
```

### 3. Chạy Frontend (React App)
Frontend sẽ chạy tại http://localhost:5173

```bash
# Cài đặt thư viện frontend
npm install

# Khởi chạy dự án
npm run dev
```

## Tài khoản Test
**Email:** test@gmail.com
**Password:** 123456