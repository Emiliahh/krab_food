import useCartStore from "@/store/useCart";
import { formatCurrency } from "@/util/currencyFormater";
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import { CartItemCheck } from "./sideCart";
interface CartItemProps extends CartItemCheck {
  setCheckedItems: (id: string, status: boolean) => void;
}
const CartItems: React.FC<CartItemProps> = ({
  id,
  quantity,
  note,
  checked,
  price,
  name,
  setCheckedItems,
}) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  // const item = mockMenuItems.find((item) => item.id === id);
  return (
    <div className="flex flex-col gap-1.5 py-2 border-b border-gray-300">
      <div className="flex justify-between text-sm">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setCheckedItems(id, e.target.checked)}
          ></input>
          <h1>{name}</h1>
        </div>
        <h1 className="text-gray-600 font-semibold">
          {formatCurrency(price ?? 0)}
        </h1>
      </div>
      <span className="italic text-gray-500 text-xs flex gap-2 items-center py-1">
        <Pencil size={15} />
        {note || "Không có ghi chú"}
      </span>
      <div className="flex justify-between text-base">
        {/* delete btn */}
        <button className="py-1 px-3 rounded-sm bg-closet text-white" onClick={() => removeItem(id)}>
          <span className=" text-sm flex gap-2 items-center ">
            <Trash size={15} />
            xoá
          </span>
        </button>
        {/* thay đổi số lượng */}
        <div className="flex gap-2 items-center ">
          <button
            className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => decreaseQuantity(id)}
          >
            <Minus size={15} />
          </button>
          <div className="px-2 text-xs bg-white text-black py-1 rounded-md border border-gray-300">
            {quantity}
          </div>
          <button
            className="bg-white border border-gray-300  rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => increaseQuantity(id)}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItems;
