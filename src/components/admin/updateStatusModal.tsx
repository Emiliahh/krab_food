import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { OrderStatus, statusLabel } from "@/types/orderTypes";
import { useState } from "react";

// Define valid status transitions for each status
const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.Pending]: [
    OrderStatus.Delivered,
    OrderStatus.Cancel,
    OrderStatus.Delivering,
  ],
  [OrderStatus.Delivered]: [],
  [OrderStatus.Delivering]: [OrderStatus.Cancel,OrderStatus.Delivered], 
  [OrderStatus.Cancel]: [], 
};

export default function OrderStatusModal({
  defaultStatus,
  handleSave,
}: {
  defaultStatus: OrderStatus;
  handleSave: (newStatus: OrderStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OrderStatus>(defaultStatus);
  const onSave = () => {
    if (selected === defaultStatus) {
      alert("Trạng thái không thay đổi");
      return;
    }
    handleSave(selected);
    setOpen(false);
  };

  // Get valid transitions for current status
  const availableStatuses = validTransitions[defaultStatus];

  // Disable save button if no valid transitions or same status selected
  const disableSave =
    availableStatuses.length === 0 || selected === defaultStatus;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Đổi trạng thái</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Đổi trạng thái đơn hàng</DialogTitle>
        </DialogHeader>

        {availableStatuses.length > 0 ? (
          <>
            <Select
              value={selected.toString()}
              onValueChange={(value) => {
                const newStatus = Number(value) as OrderStatus;
                setSelected(newStatus);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái..." />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((statusValue) => (
                  <SelectItem key={statusValue} value={statusValue.toString()}>
                    {statusLabel[statusValue]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Save button */}
            <div className="flex justify-end mt-4">
              <Button onClick={onSave} variant="default" disabled={disableSave}>
                Lưu
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center py-4 text-gray-500">
            Đơn hàng này không thể thay đổi trạng thái.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
