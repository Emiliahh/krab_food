import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import useCartStore from "@/store/useCart";
import { getCardDetails } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { formatCurrency } from "@/util/currencyFormater";
import useUserStore from "@/store/useUser";
import { CreateOrderType } from "@/types/orderTypes";
import { createOrder } from "@/services/orderService";
import { toast } from "react-toastify";
import axios from "axios";

const CheckOut = () => {
  const [selectedMethod, setSelectedMethod] = useState<1 | 2>(1);
  const navigate = useNavigate();
  const [note, setNote] = useState<string>("");
  const [selectedShipment, setSelectedShipment] = useState<
    "standard" | "express"
  >("standard");
  const { getSelected, clearSelected } = useCartStore();
  const { user } = useUserStore();
  const { data: product } = useQuery({
    queryKey: ["foodCart", getSelected],
    queryFn: () => getCardDetails(getSelected().map((item) => item.id)),
    enabled: getSelected().length > 0,
  });
  useEffect(() => {
    if (getSelected().length === 0) {
      navigate("/");
    }
  }, [getSelected, navigate]);
  const handleSubmit = async () => {
    const req: CreateOrderType = {
      address: `${user?.fullname} - ${user?.phone} - ${user?.address}`,
      note,
      deliveryFee: selectedShipment === "standard" ? 1000 : 2000,
      paymentMethod: selectedMethod,
      createOrderDetailDtos: getSelected().map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        note: item.note || "",
      })),
    };

    console.log(req);

    try {
      const res = await createOrder(req);
      if (res) {
        toast.success("Đặt hàng thành công");
        clearSelected();
        if (selectedMethod === 2 && res?.orderId && res?.totalPrice) {
          try {
            const response = await axios.post(
              "http://localhost:5114/api/order",
              {
                orderId: res.orderId,
                amount: res.totalPrice,
              }
            );

            if (response.status >= 200 && response.status < 300) {
              const data = response.data;
              window.location.href = data.paymentUrl;
            } else {
              toast.error("Không thể tạo liên kết thanh toán");
            }
          } catch (paymentError) {
            toast.error("Có lỗi xảy ra khi tạo liên kết thanh toán");
            console.error(paymentError);
          }
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng");
      console.error(error);
    }
  };

  const display = useMemo(() => {
    if (product) {
      const a = getSelected().map((item) => {
        const productDetails = product.find((p) => p.id === item.id);
        return {
          ...item,
          ...productDetails,
          name: productDetails?.name || "",
          price: productDetails?.price || 0,
        };
      });
      console.log(a);
      return a;
    }
    return [];
  }, [product, getSelected]);
  const totalPrice = useMemo(() => {
    return display.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [display]);
  return (
    <div className="flex flex-col items-center bg-gray-100 h-fit">
      {/* label part */}
      <div className="w-full py-5 bg-white flex items-center">
        <div>
          <ArrowLeft
            size={24}
            className="ml-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex-1 text-center text-lg font-semibold">
          Thanh toán
        </div>
      </div>

      {/* content part */}
      <div className="flex-1 w-full flex p-5 space-x-3 justify-center shadow-xs">
        {/* first part */}
        <div className="w-full max-w-2xl h-fit bg-white rounded-sm border border-gray-300 flex flex-col">
          <div className="w-full border-b border-gray-300 px-4 py-3">
            <h1 className="text-base font-semibold">Thông tin giao hàng</h1>
          </div>
          {/* payment option part */}
          <div className="flex-1 flex flex-col gap-3 p-4">
            <h1 className="text-neutral-800 text-sm font-semibold">
              Phương thức thanh toán
            </h1>
            {/* payment part */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSelectedMethod(1)}
                className={`px-4 py-3 flex-1 rounded border text-sm ${
                  selectedMethod === 1
                    ? "bg-closet text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                Thanh toán khi nhận hàng
              </button>

              <button
                onClick={() => setSelectedMethod(2)}
                className={`px-4 py-3 flex-1 text-sm rounded border ${
                  selectedMethod === 2
                    ? "bg-closet text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                Chuyển khoản qua QR
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-neutral-800 text-sm font-semibold">
                Địa chỉ nhận hàng
              </h1>
              <div className="border border-gray-300 rounded p-4 flex flex-col gap-1 cursor-pointer hover:border-closet transition">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">{user?.fullname}</h2>
                  <button className="text-blue-600 text-sm hover:underline">
                    Thay đổi
                  </button>
                </div>
                <p className="text-sm text-gray-700">{user?.phone}</p>
                <p className="text-sm text-gray-700">
                  {user?.address || "thó lại"}
                </p>
              </div>
            </div>

            {/* Shipment option section */}
            <h1 className="text-neutral-800 text-sm font-semibold mt-5">
              Phương thức vận chuyển
            </h1>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSelectedShipment("standard")}
                className={`px-4 py-3 flex-1 text-sm rounded border  ${
                  selectedShipment === "standard"
                    ? "border-sky-600"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                Vận chuyển tiêu chuẩn (30.000đ)
                <div className="text-xs text-gray-600">
                  Đảm bảo giao hàng trong 30p-1h
                </div>
              </button>

              <button
                onClick={() => setSelectedShipment("express")}
                className={`px-4 py-3 flex-1 text-sm rounded border ${
                  selectedShipment === "express"
                    ? "border-sky-600"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                Vận chuyển nhanh (50.000đ)
                <div className="text-xs text-gray-600">
                  Đảm bảo giao hàng trong 15p-30p
                </div>
              </button>
            </div>
            {/* vouncher */}
            <h1 className="text-neutral-800 text-sm font-semibold">
              Mã giảm giá
            </h1>
            <div className="flex items-center gap-5">
              <input
                type="text"
                className="flex-1 h-10 border border-gray-300 rounded p-2 text-sm "
                placeholder="Nhập mã giảm giá"
              />
              <button className="bg-closet text-white rounded px-6 h-10 text-sm">
                Áp dụng
              </button>
            </div>
            {/* note */}
            <h1 className="text-neutral-800 text-sm font-semibold">Ghi chú</h1>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-24 border border-gray-300 rounded p-2 resize-none text-sm "
              placeholder="Nhập ghi chú cho đơn hàng của bạn ＞﹏＜"
            ></textarea>
          </div>
        </div>

        {/* second part */}
        <div className="w-72 h-96 bg-white p-4 rounded-sm border border-closet shadow-xs flex flex-col justify-between">
          <h2 className="w-full font-medium text-base">Đơn hàng </h2>
          <ul className="flex flex-1 flex-col overflow-auto w-full border-b border-gray-300 py-4">
            {display.map((item) => (
              <li
                key={item.name}
                className="flex gap-10 w-full font-medium text-sm"
              >
                <span>{item.quantity}x</span>
                <span className="text-right">{item.name}</span>
              </li>
            ))}
          </ul>

          {/* Grouped pricing */}
          <div className="pt-2 space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-sm">Tiền hàng</h2>
              <h2 className="text-sm font-semibold text-closet">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h2>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-sm ">Phí vận chuyển</h2>
              <h2 className="text-sm font-semibold text-closet">
                {selectedShipment === "standard"
                  ? formatCurrency(30000)
                  : selectedShipment === "express"
                  ? formatCurrency(50000)
                  : "0đ"}
              </h2>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <h2 className="text-sm">Tổng tiền</h2>
              <h2 className="text-sm  font-bold text-closet">
                <h2 className="text-sm font-bold text-closet">
                  {formatCurrency(
                    totalPrice +
                      (selectedShipment === "standard"
                        ? 30000
                        : selectedShipment === "express"
                        ? 50000
                        : 0)
                  )}
                </h2>
              </h2>
            </div>

            {/* Order Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-closet text-white py-2 rounded text-sm font-medium hover:opacity-90 transition"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
