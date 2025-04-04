import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useCartStore from "@/store/useCart";
import { ProductType } from "@/types/productType";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

export function DialogDemo({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: ProductType;
}) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const {addItem} = useCartStore();
  const handleAddCart = ()=>{
    addItem({
      id:product.id,
      quantity:quantity,
      note:note
    })
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[562px] sm:max-h-[650px] [&>button]:hidden p-0 rounded-md">
        <DialogTitle className="sr-only">Food Details</DialogTitle>
        <DialogDescription className="sr-only">
          This is a description of the food item. It contains all the details
        </DialogDescription>
        <div className="flex flex-col gap-2 h-auto">
          {/* image */}
          <img
            className="object-cover aspect-2/1 rounded-md"
            src={
              product.image ||
              "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
            }
          />
          {/* first container */}
          <div className="flex-1 overflow-auto flex flex-col gap-1 py-2 border-b border-gray-200">
            {/* name section */}
            <div className="px-4">
              <h1 className="text-base text-neutral-800 font-bold">
                {product.name || "Bánh mì"}
              </h1>
            </div>
            {/* price section */}
            <div className="flex justify-between px-4 items-center">
              <h1 className="text-md text-closet font-semibold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h1>
              {/* quantity change */}
              <div className="flex items-center gap-2">
                <button
                  className="bg-white border border-gray-300  rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <Minus size={20} />
                </button>
                <div className="px-3 bg-white text-black py-1 rounded-md border border-gray-300">
                  {quantity}
                </div>
                <button
                  className="bg-white border border-gray-300  rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            {/* description section */}
            <div className="px-4">
              <h2 className=" text-gray-500 font-normal text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </h2>
            </div>
          </div>
          {/* note part */}
          <div className=" overflow-auto flex flex-col gap-1 py-1 border-b border-gray-200">
            <div className="px-4 text-[#808080] text-sm">
              <h1>Ghi chú</h1>
            </div>
            <div className="px-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}                
                className="w-full rounded-md bg-[#f7f7f7] min-h-24 max-h-36 p-3 text-xs focus:outline-none"
                placeholder="Nhập thông tin cần lưu ý ヾ(≧▽≦*)o"
              />
            </div>
            {/* button part */}
            <div className="px-4 py-2 flex justify-between items-center">
              <div>
                <h1 className="text-[#808080]">Tổng cộng</h1>
                <h1 className="text-closet font-semibold">180.000đ</h1>
              </div>
              <div className="flex gap-3">
                <button className=" cursor-pointer rounded-sm text-sm text-white bg-closet px-5 py-2 font-semibold">
                  Đặt hàng ngay
                </button>
                <button className="cursor-pointer rounded-sm text-sm text-white bg-closet px-5 py-2 font-semibold" onClick={handleAddCart}>
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
