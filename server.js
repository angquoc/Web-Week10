import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//Dữ liệu User giả
const FAKE_USER = {
  id: 1,
  name: "Sinh Vien Cham Chi",
  email: "test@gmail.com",
};

//API LOGIN
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Dữ liệu nhận được:", req.body);
  //Check login đơn giản
  if (email === "test@gmail.com" && password === "123456") {
    return res.json({
      accessToken: "fake-access-token-" + Date.now(), 
      refreshToken: "fake-refresh-token-" + Date.now(),
      user: FAKE_USER
    });
  }

  return res.status(401).json({ message: "Sai email hoặc password" });
});

// API REFRESH TOKEN
app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Thiếu refresh token" });
  }

  //Giả lập logic: Cấp token mới
  console.log("--> Server: Đang refresh token...");
  return res.json({
    accessToken: "new-access-token-" + Date.now(), 
    refreshToken: refreshToken 
  });
});

// API LẤY PROFILE
app.get('/api/auth/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader){
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  // GIẢ LẬP TOKEN HẾT HẠN
  if (authHeader.includes("expired")) {
    console.log("--> Server: Token hết hạn, yêu cầu Frontend refresh!");
    return res.status(401).json({ message: "Token expired" });
  }

  return res.json(FAKE_USER);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});