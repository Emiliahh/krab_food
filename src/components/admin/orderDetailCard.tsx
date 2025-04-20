import { OrderDetail } from "@/types/orderTypes";

interface CartItemProps {
  item: OrderDetail;
}

const OrderDetailCard: React.FC<CartItemProps> = ({ item }) => {
  const { productId, productName, price, quantity, note } = item;

  return (
    <div className="flex items-center p-2 border rounded-md shadow-sm max-w-md">
      <img
        src={`http://localhost:5114/uploads/${productId}.jpg`}
        alt={productName}
        className="w-14 h-14 rounded object-cover"
      />
      <div className="flex-1 ml-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-medium">{productName}</span>
          <span className="text-closet font-semibold">
            {price.toLocaleString()} đ
          </span>
        </div>
        <p className="text-gray-500 text-xs mt-1">
          🖊 {note?.trim() ? note : "Không có ghi chú"}
        </p>
        <p className="mt-1 text-xs">
          SL: <strong>{quantity}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderDetailCard;
