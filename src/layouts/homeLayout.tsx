import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import ShoppingCart from "@/components/layout/sideCart";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router";
const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else document.body.style.overflow = "auto";
  //   return () => {};
  // }, [isOpen]);
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <NavBar toggle={toggle} />
      <div className="flex-1 w-full items-center flex flex-col overflow-y-auto gap-5 [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
      <AnimatePresence>
        {isOpen && <ShoppingCart toggle={toggle} />}
      </AnimatePresence>
    </div>
  );
};
export default HomeLayout;
