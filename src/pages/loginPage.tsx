import useUserStore from "@/store/useUser";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useUserStore();
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await login(phoneNumber, password);
    if (success) {
      toast.success("Đăng nhập thành công!");
      console.log(user);
      navigate("/");
    } else {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      setPassword("");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('/path-to-your-food-background.jpg')" }}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-closet mb-6">
          Đăng Nhập
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-closet text-white rounded-lg hover:bg-red-500 transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-closet hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
