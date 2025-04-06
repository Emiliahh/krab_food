import useCartStore from "@/store/useCart";
import { CartItemWithDetails } from "@/types/cartTypes";
import { formatCurrency } from "@/util/currencyFormater";
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
interface CartItemProps extends CartItemWithDetails {
  setCheckedItems: (id: string, status: boolean) => void;
  changeNote: (id: string, note: string) => void;
}
const CartItems: React.FC<CartItemProps> = ({
  id,
  quantity,
  note,
  checked,
  price,
  name,
  changeNote,
  setCheckedItems,
}) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  // const item = mockMenuItems.find((item) => item.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const handleSaveNote = () => {
    changeNote(id, editedNote ?? "");
    setIsEditing(false);
  };
  const handleCancelNote = () => {
    setEditedNote(note);
    setIsEditing(false);
  };

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
      <span className="italic text-gray-500 text-xs flex flex-col gap-2 py-1 w-full">
        {isEditing ? (
          <div className="flex gap-2 w-full">
            <Pencil size={15} className="mt-2 text-gray-500" />
            <div className="flex flex-col gap-2 w-full not-italic">
              <textarea
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1 text-xs rounded-md text-white bg-closet"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelNote}
                  className="px-3 py-1 text-xs rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <Pencil
              size={15}
              onClick={() => setIsEditing(true)}
              className="cursor-pointer hover:text-blue-500"
            />
            <span className="text-xs">{note || "Không có ghi chú"}</span>
          </div>
        )}
      </span>

      <div className="flex justify-between text-base">
        {/* delete btn */}
        <button
          className="py-1 px-3 rounded-sm bg-closet text-white"
          onClick={() => removeItem(id)}
        >
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
