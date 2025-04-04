import { ArrowDownNarrowWide, Search, ShoppingCart, User } from "lucide-react";
import FilterBar from "./filterBar";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
interface NavBarProps {
  toggle: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ toggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-full bg-white shadow-md sticky top-0 z-50 ">
      <div
        className="flex justify-center px-4 sm:px-8 lg:px-52 items-center py-2 gap-20 "
      >
        {/* phần logo */}
        <div className="flex flex-row">
          <img
            src="src\assets\Screenshot 2025-04-03 004924.png"
            alt="Logo"
            className="w-full h-12"
          />
        </div>
        {/* thanh tìm kiếm */}
        <div className="flex flex-row items-center flex-1 gap-5 pl-3 pr-1 py-1 rounded-full bg-light-gray border-none  text-gray-700 ">
          <Search size={23} strokeWidth={1.25} />
          <input placeholder="Search" className="flex-1 focus:outline-none" />
          <button
            className="bg-closet text-white px-4 py-1 rounded-full flex items-center gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowDownNarrowWide size={22} />
            <span>Lọc</span>
          </button>
        </div>
        {/* phần user và giỏ hàng */}
        <div className="flex flex-row gap-5">
          <div className="flex flex-row items-center gap-2 cursor-pointer ">
            <User color="#b5292f" size={30} strokeWidth={1.25} />
            <span>Đăng nhập/Đăng ký</span>
          </div>
          <div
            className="flex flex-row items-center gap-3 cursor-pointer "
            onClick={toggle}
          >
            <div className="relative">
              <ShoppingCart color="#b5292f" size={30} strokeWidth={1.25} />
              <div className="absolute -top-3 -right-4 bg-closet text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </div>
            </div>
            <span className="font-xs">Giỏ hàng</span>
          </div>
        </div>
      </div>
      {/* thanh filter */}
      <AnimatePresence>{isOpen && <FilterBar />}</AnimatePresence>
    </div>
  );
};
export default NavBar;
