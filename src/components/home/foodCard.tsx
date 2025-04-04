import {  ProductType } from "@/types/productType";

interface FoodCartProps {
  food: ProductType;
  onClick: () => void;
  setFocus:(food:ProductType) => void
}
export default function FoodCart({ food, onClick,setFocus }: FoodCartProps) {
  const handleClick = () => {
    onClick();
    setFocus(food);
  };
  return (
    <div
      className="border border-[#e5e5e5] rounded-md flex flex-col items-center justify-center p-1"
      key={food.id}
    >
      {/* đây là phần product banner */}
      <div className="relative overflow-hidden rounded-t-md">
        <img
          onClick={handleClick}
          src={food.image}
          className="object-cover aspect-3/2 hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/*  đây là phần information */}
      <div className="p-4 text-center w-full">
        <h1
          onClick={handleClick}
          className="text-base font-semibold text-gray-800 mb-2 cursor-pointer"
        >
          {food.name}
        </h1>
        <h2 className="text-md font-medium text-closet">
          {food.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <button
            onClick={handleClick}
            className="mt-4 px-6 py-1 font-medium text-sm w-full bg-closet text-white  rounded-full hover:bg-closet-light transition duration-300 cursor-pointer"
          >
            ĐẶT MÓN
          </button>
        </h2>
      </div>
    </div>
  );
}
