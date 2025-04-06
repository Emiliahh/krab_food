import { ArrowDownNarrowWide, Search, ShoppingCart, User } from "lucide-react";
import FilterBar from "./filterBar";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import useCartStore from "@/store/useCart";
import useSearchStore from "@/store/useSearch";
import { Link } from "react-router";
import useUserStore from "@/store/useUser";

interface NavBarProps {
  toggle: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ toggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { search, setSearch } = useSearchStore();
  const { isAuthenticated, user, logout } = useUserStore();
  const { cartItems } = useCartStore();
  const toggleFilterBar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className="flex flex-col w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-center px-4 sm:px-8 lg:px-52 items-center py-2 gap-20 ">
        {/* phần logo */}
        <div className="flex flex-row">
          <img
            src="src\assets\Screenshot 2025-04-03 004924.png"
            alt="Logo"
            className="w-full h-12"
          />
        </div>
        {/* thanh tìm kiếm */}
        <div className="flex  max-w-[520px] flex-row items-center flex-1 gap-5 pl-3 pr-1 py-1 rounded-full bg-light-gray border-none  text-gray-700 ">
          <Search size={23} strokeWidth={1.25} />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 focus:outline-none text-sm"
          />
          <button
            className="bg-closet text-white px-4 py-1 rounded-full flex items-center gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowDownNarrowWide size={22} />
            <span className="text-sm">Lọc</span>
          </button>
        </div>
        {/* phần user và giỏ hàng */}
        <div className="flex flex-row gap-5 items-center">
          <div className="dropdown dropdown-hover">
            <div
              role="button"
              className="flex flex-row items-center gap-2 cursor-pointer m-1"
            >
              <User color="#b5292f" size={30} strokeWidth={1.25} />
              {!isAuthenticated ? (
                <span className="text-sm">Đăng nhập/Đăng ký</span>
              ) : (
                <span className="text-sm">{user?.name}</span>
              )}
            </div>
            {!isAuthenticated ? (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow shadow-gray-"
              >
                <li>
                  <Link to="/login">Đăng nhập</Link>
                </li>
                <li>
                  <Link to="/register">Đăng ký</Link>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow shadow-gray-"
              >
                <li>
                  <Link to="/profile">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="/order">Đơn hàng của tôi</Link>
                </li>
                <li onClick={logout}>
                  <a>Đăng xuất</a>
                </li>
              </ul>
            )}
          </div>
          <div
            className="flex flex-row items-center gap-3 cursor-pointer "
            onClick={toggle}
          >
            <div className="relative">
              <ShoppingCart color="#b5292f" size={30} strokeWidth={1.25} />
              <div className="absolute -top-3 -right-4 bg-closet text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </div>
            </div>
            <span className="text-sm">Giỏ hàng</span>
          </div>
        </div>
      </div>
      {/* thanh filter */}
      <AnimatePresence>
        {isOpen && <FilterBar toggle={toggleFilterBar} />}
      </AnimatePresence>
    </nav>
  );
};
export default NavBar;
