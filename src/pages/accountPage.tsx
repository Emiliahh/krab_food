import { UpdateUser, UpdateUserPassword } from "@/services/userService";
import useUserStore from "@/store/useUser";
import { Save, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const AccountPage = () => {
  const { user, validate } = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUser, setUpdate] = useState<UpdateUser>({
    fullname: user?.fullname,
    phone: user?.phone,
    address: user?.address,
  });
  const handleUpdate = async () => {
    try {
      const response = await UpdateUser(updateUser);
      console.log("Cập nhật thành công:", response);
      await validate();
      const res = await UpdateUser(updateUser);
      if (res) {
        toast.success("Cập nhật thành công");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  const updateUserInfo = (field: string, value: string) => {
    setUpdate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleChangePassword = async () => {
    const isValidPassword = (password: string): boolean => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(password);
    };
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    if (!isValidPassword(newPassword)) {
      toast.error(
        "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt"
      );
      return;
    }
    try {
      const response = await UpdateUserPassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      console.log("Cập nhật mật khẩu thành công:", response);
      toast.success("Cập nhật mật khẩu thành công");
    } catch (error) {
      toast.error("Cập nhật mật khẩu thất bại");
      console.error("Lỗi khi cập nhật mật khẩu:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 border rounded-md border-gray-300 mt-2">
      <h2 className="text-2xl font-semibold mb-1">
        Thông tin tài khoản của bạn
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Quản lý thông tin để bảo mật tài khoản
      </p>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 space-y-4 p-6 border-r border-gray-300">
          <div>
            <label className="block mb-1 font-medium">Họ và tên</label>
            <input
              type="text"
              onChange={(e) => updateUserInfo("fullname", e.target.value)}
              defaultValue={user?.fullname}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              defaultValue={user?.phone}
              onChange={(e) => updateUserInfo("phone", e.target.value)}
              className="w-md border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              disabled={true}
              defaultValue={user?.email}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Địa chỉ</label>
            <input
              type="text"
              onChange={(e) => updateUserInfo("address", e.target.value)}
              defaultValue={user?.address}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            onClick={() => handleUpdate()}
            className="flex items-center gap-2 bg-closet hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            <Save className="w-4 h-4" />
            Lưu thay đổi
          </button>
        </div>

        {/* Cột phải */}
        <div className="flex-1 space-y-4 p-6 ">
          <div>
            <label className="block mb-1 font-medium">Mật khẩu hiện tại</label>
            <input
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              placeholder="Nhập mật khẩu hiện tại"
              className="w-md  border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mật khẩu mới</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Xác nhận mật khẩu mới
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button onClick={handleChangePassword} className="flex items-center gap-2 bg-closet hover:bg-red-700 text-white px-4 py-2 rounded">
            <KeyRound className="w-4 h-4" />
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
