import useCartStore from "@/store/useCart";
import { motion } from "framer-motion";
import {  Plus, ShoppingBasket, X } from "lucide-react";
import CartItems from "./cartItem";
import { useEffect, useState } from "react";
import { mockMenuItems } from "@/types/productType";
import { formatCurrency } from "@/util/currencyFormater";
// import CartItem from "./cartItem";
import { CartItem } from "@/types/cartTypes";
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
// extend type để thêm status checked
interface CartItemCheck extends CartItem {
  checked: boolean;
}
export default function ShoppingCart({ toggle }: { toggle: () => void }) {
  const { cartItems } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsCheck, setCartItemsCheck] = useState<CartItemCheck[]>([]);
  const [checkboxAll, setCheckboxAll] = useState(false);
  //map thêm status checked vào cartItems
  useEffect(() => {
    setCartItemsCheck(
      cartItems.map((item) => ({
        ...item,
        checked: false,
      }))
    );
  }, [cartItems]);
  useEffect(() => {
    setTotalPrice(
      cartItemsCheck.reduce((acc, item) => {
        const itemQuantity = item.quantity || 0;
        const itemPrice =
          mockMenuItems.find((menuItem) => menuItem.id === item.id)?.price || 0;
        return acc + (item.checked ? itemQuantity * itemPrice : 0);
      }, 0)
    );
  }, [cartItemsCheck]);
  const setCheckedItems = (id: string, status: boolean) => {
    setCartItemsCheck((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: status } : item))
    );
  };
  const setCheckAll = (status: boolean) => {
    setCartItemsCheck((prev) =>
      prev.map((item) => ({ ...item, checked: status }))
    );
    setCheckboxAll(status);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[100] overflow-hidden "
        onClick={toggle}
      ></div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-96 h-full fixed top-0 right-1 z-[100] shadow-lg rounded-lg py-2"
      >
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
          {/* this is header part */}
          <div className="h-14 border-b border-gray-300 flex justify-between items-center px-5">
            <span className=" text-gray-800 font-semibold flex items-center gap-3">
              <ShoppingBasket color="#b5292f" size={30} strokeWidth={1.25} />
              Giỏ hàng
            </span>
            <button className="cursor-pointer" onClick={toggle}>
              <X size={25} strokeWidth={1.25} />
            </button>
          </div>
          {/* this is content part */}
          <div className="flex-1 overflow-auto flex flex-col gap-2 py-2 px-5">
            {cartItemsCheck.length === 0 ? (
              <div className="text-center mt-20">
                Không có sản phẩn nào ＞﹏＜
              </div>
            ) : (
              // Map through cartItems here
              cartItemsCheck.map((item) => (
                <CartItems
                  setCheckedItems={setCheckedItems}
                  key={item.id}
                  {...item}
                />
              ))
            )}
          </div>
          {/* button part */}
          <div className=" border-t border-gray-300 flex flex-col py-3 px-4 gap-2">
            <div className="flex justify-between items-center">
              {/* total và check tất cả */}
              <div className="flex gap-3 items-center">
                <input
                  id="checkboxAll"
                  type="checkbox"
                  className="cursor-pointer"
                  checked={checkboxAll}
                  onChange={(e) => setCheckAll(e.target.checked)}
                />
                <label
                  htmlFor="checkboxAll"
                  className="text-base font-semibold"
                >
                  Tất cả
                </label>
                <h1 className="text-base font-semibold">Tổng tiền:</h1>
              </div>
              <h1 className="text-closet font-semibold">
                {formatCurrency(totalPrice)}
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <button className="border-2 border-neutral-900 text-neutral-900 rounded-md py-2 px-4 flex-1 text-sm">
                <span className="flex gap-1 items-center justify-center">
                  <Plus size={24} /> Thêm món
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
export type { CartItemCheck };
