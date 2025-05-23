import { registerUser } from "@/services/authService";
import { RegisterDto } from "@/types/userType";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (password.length === 0) return "";
    if (password.length < 8) {
      return "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (!regex.test(password)) {
      return "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt";
    }
    return "";
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreeTerms) {
      toast.error("Bạn cần đồng ý với điều khoản để đăng ký!");
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    const dto: RegisterDto = {
      email,
      fullname: fullName,
      phone: phoneNumber,
      password,
    };
    try {
      await registerUser(dto);
      toast.success("Đăng ký thành công!");
      // Optional: Redirect to login page after successful registration
      // navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("Email này đã được sử dụng. Vui lòng chọn email khác.");
        } else {
          toast.error("Đã có lỗi xảy ra trong quá trình đăng ký.");
        }
      } else {
        toast.error("Đã có lỗi xảy ra trong quá trình đăng ký.");
      }
    }
    // Implement actual registration API call here
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-closet mb-6">
          Đăng Ký Tài Khoản
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc
              biệt
            </p>
          </div>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-600">
              Tôi đồng ý với chính sách của trang web
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-closet text-white rounded-lg hover:bg-red-500 transition"
          >
            ĐĂNG KÝ
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-closet hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
