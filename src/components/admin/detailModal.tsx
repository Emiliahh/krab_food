import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { OrderTypes, statusLabel } from "@/types/orderTypes";
import OrderDetailCard from "./orderDetailCard";

import {
  User,
  Phone,
  MapPin,
  StickyNote,
  Clock,
  CircleCheckIcon,
  Truck,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function OrderDetailModal({ data }: { data: OrderTypes }) {
  const [open, setOpen] = useState(false);
  const { orderDetails, address, deliveryTime, note, totalPrice, orderTime } =
    data;

  const detail = useMemo(() => address.split(" - "), [address]);
  const [name, phone, addr] = detail;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Chi tiết</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 w-full">
          {/* Danh sách sản phẩm - Now scrollable */}
          <div className="flex-1 max-h-[300px] overflow-y-auto pr-2">
            <div className="space-y-2">
              {orderDetails.map((item) => (
                <OrderDetailCard key={item.productId} item={item} />
              ))}
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="flex-1 text-sm space-y-3 p-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Tên:</span> {name}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-medium">SĐT:</span> {phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Địa chỉ:</span> {addr}
            </div>
            {note && (
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Ghi chú:</span> {note}
              </div>
            )}
            <div className="flex items-center gap-2">
              <CircleCheckIcon className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Trạng thái:</span>{" "}
              {statusLabel[data.status]}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Thời gian đặt:</span>{" "}
              {format(orderTime, "Pp", {
                locale: vi,
              })}
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Giao lúc:</span>{" "}
              {deliveryTime ? format(deliveryTime, "Pp", { locale: vi }) : ""}
            </div>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="flex items-center gap-2 mt-2 text-closet font-bold">
          <span className="font-medium text-neutral-600">Tổng tiền:</span>{" "}
          {totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
