import FeatureCard from "@/components/home/bannerCard";
import FoodCart from "@/components/home/foodCard";
import { DialogDemo } from "@/components/home/foodModal";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePaginateHook from "@/hooks/paginateHook";
import { getFoodList } from "@/services/productService";
import useSearchStore from "@/store/useSearch";
import { ProductType } from "@/types/productType";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Headphones, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState<ProductType | null>(null);
  const [searchParams] = useSearchParams();
  const { from, to, search, desc, categoryId } = useSearchStore();
  const page = searchParams.get("page") || "1";
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const setFocusFood = (food: ProductType) => {
    setFocus(food);
  };

  const parsedFrom = Number.parseFloat(from);
  const parsedTo = Number.parseFloat(to);
  // truy vấn dữ liệu trên trang chủ
  const { data: products, isLoading } = useQuery({
    queryKey: ["foodList", page, desc, search, categoryId, from, to],
    queryFn: () =>
      getFoodList(
        Number(page),
        8,
        desc,
        search,
        categoryId,
        parsedFrom,
        parsedTo
      ),
  });

  const list = usePaginateHook({
    page: Number(page),
    totalPage: products?.totalPage ?? 0,
    range: 2,
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-5xl py-3">
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}

      {focus && (
        <DialogDemo
          key={focus.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          product={focus}
        />
      )}
      {/* paginate part */}
      <div className="py-10 flex justify-center w-full">
        <Pagination>
          <PaginationContent>
            {/* nút previous */}
            <PaginationItem>
              <PaginationPrevious
                to={`/?page=${Math.max(1, Number(page) - 1)}`}
              />
            </PaginationItem>

            {/* nếu bắt đầu lớn hơn 1 thì hiện một và ... */}
            {list[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink to="/?page=1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* map số trang */}
            {list.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  to={`/?page=${p}`}
                  isActive={Number(page) === p}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* // nếu trang cuối nhỏ hơn tổng số trang thì hiện ... và trang cuối */}
            {list[list.length - 1] < (products?.totalPage ?? 1) && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink to={`/?page=${products?.totalPage}`}>
                    {products?.totalPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* nút next */}
            <PaginationItem>
              <PaginationNext
                to={`/?page=${Math.min(
                  Number(page) + 1,
                  products?.totalPage ?? 1
                )}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Home;
