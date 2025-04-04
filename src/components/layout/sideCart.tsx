import { motion } from "framer-motion";
import { Plus, ShoppingBasket, X } from "lucide-react";
const containerVariants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      bounce: 1,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      bounce: 1,
    },
  },
};
export default function ShoppingCart({ toggle }: { toggle: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[100] overflow-y-hidden "
        onClick={toggle}
      ></div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-96 h-full fixed top-0 right-1 z-[100] shadow-lg rounded-lg py-3"
      >
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
          {/* this is header part */}
          <div className="h-14 border-b border-gray-300 flex justify-between items-center px-5">
            <span className=" text-gray-800 font-semibold flex items-center gap-3">
              <ShoppingBasket color="#b5292f" size={30} strokeWidth={1.25} />
              Giỏ hàng
            </span>
            <button className="cursor-pointer" onClick={toggle}>
              <X size={30} strokeWidth={1.25} />
            </button>
          </div>
          {/* this is content part */}
          <div className="flex-1 overflow-auto flex flex-col gap-2 py-2 px-4"></div>
          {/* button part */}
          <div className=" border-t border-gray-300 flex flex-col py-3 px-4 gap-2">
            <div className="flex justify-between items-center">
              <h1 className="text-base font-semibold">Tổng tiền:</h1>
              <h1 className="text-closet font-semibold">180.000 đ</h1>
            </div>
            <div className="flex gap-2 items-center">
              <button className="border-2 border-neutral-900 text-neutral-900 rounded-md py-2 px-4 flex-1 text-sm">
                <span className="flex gap-1 items-center justify-center">
                  <Plus size={24}/> Thêm món
                </span>
              </button>
              <button className="bg-closet h-full text-sm text-white rounded-md py-2 px-4 flex-1">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
