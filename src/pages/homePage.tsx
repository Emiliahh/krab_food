import FeatureCard from "@/components/home/bannerCard";
import FoodCart from "@/components/home/foodCard";
import { DialogDemo } from "@/components/home/foodModal";
import { getFoodList } from "@/services/productService";
import { ProductType } from "@/types/productType";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Headphones, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState<ProductType | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };
  const setFocusFood = (food: ProductType) => {
    setFocus(food);
  };
  const { data: products } = useQuery({
    queryKey: ["foodList", page],
    queryFn: () => getFoodList(Number(page), 8),
  });
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-52 py-3">
      {/* Đây là phần banner */}
      <img
        className="w-full h-96 rounded-md object-cover"
        src="https://plus.unsplash.com/premium_photo-1694715585704-81111d19074d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlldG5hbWVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
      />

      <div className="flex justify-center gap-2 py-6 w-full ">
        <FeatureCard
          icon={Package}
          title="GIAO HÀNG NHANH"
          description="Cho tất cả đơn hàng"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="SẢN PHẨM AN TOÀN"
          description="Cam kết chất lượng"
        />
        <FeatureCard
          icon={Headphones}
          title="HỖ TRỢ 24/7"
          description="Tất cả ngày trong tuần"
        />
        <FeatureCard
          icon={DollarSign}
          title="HOÀN LẠI TIỀN"
          description="Nếu không hài lòng"
        />
      </div>

      <h1 className="my-10  font-semibold text-xl relative after:content-[''] after:absolute after:h-[2px] after:w-1/2  after:left-1/2 after:bottom-[-5px] after:-translate-x-1/2 after:bg-closet">
        Khám phá thực đơn của chúng tôi
      </h1>
      {/* phần content */}
      <div className="w-full grid grid-cols-4 gap-5">
        {(products?.data || []).map((item) => (
          <FoodCart
            key={item.id}
            food={item}
            onClick={onClick}
            setFocus={setFocusFood}
          />
        ))}
      </div>
      {focus && (
        <DialogDemo
          key={focus.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          product={focus}
        />
      )}
    </div>
  );
}

export default Home;
