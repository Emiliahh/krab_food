import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Authapi from "@/services/protectedApi";

interface Revenue {
  totalOrder: number;
  totalRevenue: number;
  day: string;
}

interface FoodSale {
  productId: string;
  productName: string;
  totalSale: number;
  revenue: number;
}

const formatDate = (isoDate: string) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString("vi-VN").split("/").splice(0, 2).join("/");
};

const getRevenue = async () => {
  const res = await Authapi.get<Revenue[]>(
    `Static/revenue`
  );
  return res.data;
};

const getFoodSale = async () => {
  const res = await Authapi.get<FoodSale[]>(
    `Static/product-sale`
  );
  return res.data;
};

const StaticPage = () => {
  const [view, setView] = useState<"revenue" | "food">("revenue");

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
  });

  const { data: foodData, isLoading: foodLoading } = useQuery({
    queryKey: ["foodSale"],
    queryFn: getFoodSale,
    enabled: view === "food", // Only fetch when "food" view is active
  });

  // Fallback to mock data if API call is loading or fails
  const displayedRevenueData = revenueData || [];
  const displayedFoodData = foodData || [];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 gap-4">
      <div className="space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            view === "revenue" ? "bg-closet text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("revenue")}
        >
          Doanh thu
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            view === "food" ? "bg-closet text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("food")}
        >
          Món ăn bán chạy
        </button>
      </div>

      {revenueLoading && view === "revenue" && (
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-closet"></div>
        </div>
      )}

      {view === "revenue" && !revenueLoading && (
        <ResponsiveContainer width="95%" height={500}>
          <BarChart
            data={displayedRevenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                "Ngày: " + new Date(label).toLocaleString("vi-VN")
              }
              formatter={(value: number, name: string) =>
                name === "Số đơn hàng"
                  ? value.toLocaleString()
                  : value.toLocaleString("vi-VN") + " VND"
              }
            />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#8884d8" name="Doanh thu" />
            <Bar dataKey="totalOrder" fill="#82ca9d" name="Số đơn hàng" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {foodLoading && view === "food" && (
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-closet"></div>
        </div>
      )}

      {view === "food" && !foodLoading && (
        <div className="overflow-x-auto w-full p-5">
          <table className="table-auto border-collapse w-full text-center shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-closet text-white">
                <th className="px-4 py-2 border">STT</th>
                <th className="px-4 py-2 border">Tên món ăn</th>
                <th className="px-4 py-2 border">Số lượng bán</th>
                <th className="px-4 py-2 border">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {displayedFoodData.map((item, index) => (
                <tr
                  key={item.productId}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.productName}</td>
                  <td className="border px-4 py-2">{item.totalSale}</td>
                  <td className="border px-4 py-2">
                    {item.revenue.toLocaleString("vi-VN")} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaticPage;
