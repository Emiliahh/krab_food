import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddUser from "@/components/admin/addUser";
import { getUsers } from "@/services/authService";
import { User } from "@/types/userType";

const ITEMS_PER_PAGE = 10;

const CustomerPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [customers, setCustomers] = useState<User[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<User[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            const usersWithStatus: User[] = data.map((user: User) => ({
                ...user,
                status: user.status || "active",
            }));
            setCustomers(usersWithStatus);
            setFilteredCustomers(usersWithStatus);
        } catch (error) {
            console.error("Lỗi khi load khách hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        const lowerValue = value.toLowerCase();
        const filtered = customers.filter(
            (user) =>
                user.fullname?.toLowerCase().includes(lowerValue) ||
                user.phone?.toLowerCase().includes(lowerValue)
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    };

    // const handleDelete = async (id: number) => {
    //     const confirm = window.confirm(
    //         "Bạn có chắc chắn muốn xóa khách hàng này?"
    //     );
    //     if (!confirm) return;

    //     try {
    //         await deleteUser(id);
    //         alert("Xóa khách hàng thành công!");
    //         fetchCustomers();
    //     } catch (error) {
    //         console.error("Lỗi khi xóa:", error);
    //         alert("Xóa thất bại.");
    //     }
    // };

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const currentCustomers = filteredCustomers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border px-3 py-2 rounded-md flex-1"
                />
                <button
                    className="border px-7 py-2 rounded-md"
                    onClick={fetchCustomers}
                >
                    🔄 Làm mới
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => setOpenDialog(true)}
                >
                    + Thêm khách hàng
                </button>
            </div>

            <div className="overflow-auto rounded-md border bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="px-4 py-3">STT</th>
                            <th className="px-4 py-3">HỌ VÀ TÊN</th>
                            <th className="px-4 py-3">LIÊN HỆ</th>
                            <th className="px-4 py-3">TÌNH TRẠNG</th>
                            <th className="px-4 py-3 text-center">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500"
                                >
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : currentCustomers.length > 0 ? (
                            currentCustomers.map((customer, index) => (
                                <tr key={customer.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {(currentPage - 1) * ITEMS_PER_PAGE +
                                            index +
                                            1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {customer.fullname}
                                    </td>
                                    <td className="px-4 py-3">
                                        {customer.phone}
                                    </td>
                                    <td className="px-4 py-3">
                                        {customer.status === "blocked" ? (
                                            <span className="bg-red-400 text-white px-3 py-1 rounded">
                                                Bị khóa
                                            </span>
                                        ) : (
                                            <span className="bg-green-400 text-white px-3 py-1 rounded">
                                                Đang hoạt động
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 flex justify-center gap-2">
                                        <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            className="bg-red-600 p-2 rounded text-white hover:bg-red-700"
                                            // onClick={() =>
                                            //     handleDelete(customer.id)
                                            // }
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <AddUser
                open={openDialog}
                onClose={(newUser?: User) => {
                    setOpenDialog(false);
                    if (newUser) {
                        const userWithStatus = {
                            ...newUser,
                            status: newUser.status || "active",
                        };
                        const updatedList = [userWithStatus, ...customers];
                        setCustomers(updatedList);
                        setFilteredCustomers(updatedList);
                    } else {
                        fetchCustomers();
                    }
                }}
            />
        </div>
    );
};

export default CustomerPage;
