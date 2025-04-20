import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function PaymentResult() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<
    "success" | "cancelled" | "error" | "loading"
  >("loading");
  const [orderCode, setOrderCode] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const code = params.get("code");
    const cancel = params.get("cancel") === "true";
    const statusParam = params.get("status");
    const orderCode = params.get("orderCode") || "";
    const transactionId = params.get("id") || "";

    setOrderCode(orderCode);
    setTransactionId(transactionId);

    if (cancel || statusParam === "CANCELLED") {
      setStatus("cancelled");
    } else if (statusParam === "PAID" && code === "00") {
      setStatus("success");
    } else if (statusParam === "PENDING" || statusParam === "PROCESSING") {
      setStatus("loading");
    } else {
      setStatus("error");
    }
  }, [params]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        {status === "loading" && (
          <p className="text-gray-600">Đang xử lý giao dịch...</p>
        )}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              🎉 Thành công
            </h1>
            <p className="mb-4">
              Đơn hàng của bạn đã được thanh toán thành công!
            </p>
            <p>
              <strong>Mã đơn hàng:</strong> {orderCode}
            </p>
            <p>
              <strong>Mã giao dịch:</strong> {transactionId}
            </p>
          </>
        )}
        {status === "cancelled" && (
          <>
            <h1 className="text-2xl font-bold text-yellow-600 mb-2">
              ❌ Đã hủy
            </h1>
            <p>Giao dịch đã bị hủy bởi người dùng.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">⚠️ Lỗi</h1>
            <p>Không thể xác minh trạng thái thanh toán.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentResult;
