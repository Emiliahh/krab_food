import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import ShoppingCart from "@/components/layout/sideCart";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router";
const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
    return () => {};
  }, [isOpen]);
  return (
    <div className="flex flex-col w-full   ">
      <NavBar toggle={toggle} />
      <div className="flex-1 flex flex-col overflow-y-auto gap-5">
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
