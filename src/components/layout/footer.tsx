const Footer = () => {
    return (
        <footer className=" border-t border-red-500">
            <div className="max-w-screen-xl mx-auto px-6 py-10">
                {/* Logo + Đăng ký nhận tin */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b">
                    <div className="flex items-center gap-4">
                        <img
                            src="src/assets/Screenshot 2025-04-03 004924.png"
                            className="w-20 h-16"
                        />
                        <h2 className="text-3xl font-bold text-red-700">
                            Krab Food
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold">
                                ĐĂNG KÝ NHẬN TIN
                            </h3>
                            <p className="text-sm text-gray-500">
                                Nhận thông tin mới nhất từ chúng tôi
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="px-4 py-2 rounded-full border border-gray-300 outline-none"
                            />
                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full">
                                ĐĂNG KÝ →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nội dung chính */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                    {/* Cột 1 */}
                    <div>
                        <h4 className="font-bold uppercase border-b-2 border-red-600 inline-block mb-2">
                            VỀ CHÚNG TÔI
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                            Krab Food là thương hiệu được thành lập vào năm 2022
                            với tiêu chí đặt chất lượng sản phẩm lên hàng đầu.
                        </p>
                        <div className="flex gap-3">
                            <a href="#">
                                <i className="fab fa-facebook-f border p-2 rounded-full"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter border p-2 rounded-full"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-linkedin border p-2 rounded-full"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-whatsapp border p-2 rounded-full"></i>
                            </a>
                        </div>
                    </div>

                    {/* Cột 2 */}
                    <div>
                        <h4 className="font-bold uppercase border-b-2 border-red-600 inline-block mb-2">
                            LIÊN KẾT
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#">→ Về chúng tôi</a>
                            </li>
                            <li>
                                <a href="#">→ Thực đơn</a>
                            </li>
                            <li>
                                <a href="#">→ Điều khoản</a>
                            </li>
                            <li>
                                <a href="#">→ Liên hệ</a>
                            </li>
                            <li>
                                <a href="#">→ Tin tức</a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3 */}
                    <div>
                        <h4 className="font-bold uppercase border-b-2 border-red-600 inline-block mb-2">
                            THỰC ĐƠN
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>→ Điểm tâm</li>
                            <li>→ Món chay</li>
                            <li>→ Món mặn</li>
                            <li>→ Nước uống</li>
                            <li>→ Tráng miệng</li>
                        </ul>
                    </div>

                    {/* Cột 4 */}
                    <div>
                        <h4 className="font-bold uppercase border-b-2 border-red-600 inline-block mb-2">
                            LIÊN HỆ
                        </h4>
                        <ul className="text-sm space-y-2">
                            <li>
                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>{" "}
                                Dịch Vọng Hậu - Cầu Giấy - Hà Nội
                            </li>
                            <li>
                                <i className="fas fa-phone-alt text-red-600 mr-2"></i>{" "}
                                0123 456 789
                            </li>
                            <li>
                                <i className="fas fa-envelope text-red-600 mr-2"></i>{" "}
                                abc@domain.com
                            </li>
                            <li>
                                <i className="fas fa-envelope text-red-600 mr-2"></i>{" "}
                                infoabc@domain.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bản quyền */}
                <div className="text-center text-sm text-gray-500 mt-10">
                    Copyright 2022 © Krab Food. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
