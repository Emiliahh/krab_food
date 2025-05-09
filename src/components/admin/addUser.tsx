import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { registerUser } from "@/services/authService";
import { User } from "@/types/userType";

interface AddUserProps {
  open: boolean;
  onClose: (newUser?: User) => void;
}

const AddUser = ({ open, onClose }: AddUserProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        phone: formData.phone,
      });
      const newUser = response.data;
      setFormData({ email: "", password: "", fullname: "", phone: "" });
      onClose(newUser);
    } catch (error) {
      console.error("Lỗi khi đăng ký người dùng:", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-md">
        <DialogTitle className="text-lg font-bold">Thêm người dùng</DialogTitle>
        <DialogDescription className="sr-only">
          Nhập thông tin người dùng mới
        </DialogDescription>

        <form className="flex flex-col space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Họ và tên</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            THÊM NGƯỜI DÙNG
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
