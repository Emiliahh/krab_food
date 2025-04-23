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

const mock = [
  { totalOrder: 3, totalRevenue: 5959000, day: "0001-01-01T00:00:00" },
  { totalOrder: 1, totalRevenue: 30000, day: "2025-04-15T13:23:37.465023" },
  { totalOrder: 1, totalRevenue: 1579000, day: "2025-04-15T18:27:20.511944" },
  { totalOrder: 1, totalRevenue: 12654000, day: "2025-04-17T10:35:59.40853" },
  { totalOrder: 1, totalRevenue: 3128000, day: "2025-04-17T10:36:10.2063" },
  { totalOrder: 1, totalRevenue: 3128000, day: "2025-04-17T14:48:05.611224" },
  { totalOrder: 1, totalRevenue: 10118000, day: "2025-04-18T05:39:17.170435" },
  { totalOrder: 1, totalRevenue: 964000, day: "2025-04-18T13:33:12.867125" },
  { totalOrder: 1, totalRevenue: 1178000, day: "2025-04-18T13:45:00.29556" },
  { totalOrder: 1, totalRevenue: 1249000, day: "2025-04-18T14:05:10.974394" },
  { totalOrder: 1, totalRevenue: 2000, day: "2025-04-19T18:43:37.702691" },
  { totalOrder: 1, totalRevenue: 2000, day: "2025-04-20T11:22:20.736885" },
  { totalOrder: 1, totalRevenue: 4000, day: "2025-04-20T22:46:57.972329" },
  { totalOrder: 1, totalRevenue: 2000, day: "2025-04-21T04:04:26.43338" },
  { totalOrder: 1, totalRevenue: 2000, day: "2025-04-21T04:44:11.812812" },
  { totalOrder: 1, totalRevenue: 10000, day: "2025-04-21T13:05:00.045456" },
  { totalOrder: 1, totalRevenue: 4000, day: "2025-04-21T14:19:09.174361" },
  { totalOrder: 74, totalRevenue: 11194000, day: "2025-04-23T05:00:40" },
];

const mockFood = [
  {
    productId: "9e4bae99-349f-4ab1-a3ac-99775c8071c5",
    productName: "Lẩu siêu cay tứ xuyên",
    totalSale: 36,
    revenue: 1144000,
  },
  {
    productId: "6fc62cce-0b56-47e1-b21f-e5fcf6cf0ee3",
    productName: "Phở bò Nam Định",
    totalSale: 30,
    revenue: 132000,
  },
  {
    productId: "5b732e1d-bffc-4821-9ee9-85b96feadead",
    productName: "Thịt chó rượu mận",
    totalSale: 19,
    revenue: 3280000,
  },
  {
    productId: "33c42534-24fa-434c-81c4-97baf4fa329b",
    productName: "Lẩu bắp bò",
    totalSale: 14,
    revenue: 14687000,
  },
  {
    productId: "b82214f5-461a-4267-b6c0-8eadd2c5fb87",
    productName: "Thịt heo luộc",
    totalSale: 14,
    revenue: 304000,
  },
  {
    productId: "27bd81d7-d1f5-4ec6-a840-7c529e6feefd",
    productName: "Phở bò bát đá",
    totalSale: 10,
    revenue: 12004000,
  },
  {
    productId: "7ba2e403-a2a5-467d-9c06-e916226e2344",
    productName: "Sushi cá hồi",
    totalSale: 7,
    revenue: 15292000,
  },
  {
    productId: "bd0d2c8d-0317-4841-b726-a668192f33a2",
    productName: "Cơm xà xíu",
    totalSale: 7,
    revenue: 630000,
  },
  {
    productId: "7b94b47c-a155-43d0-a02c-b8c3cc2c11af",
    productName: "Ramen",
    totalSale: 4,
    revenue: 1249000,
  },
  {
    productId: "f4e26251-89ca-4ebc-a030-374fb5675a56",
    productName: "Thịt lợn luộc",
    totalSale: 4,
    revenue: 156000,
  },
  {
    productId: "a2606ed0-63c9-4400-ae94-ec8661fc805e",
    productName: "Cơm rang dưa bò",
    totalSale: 3,
    revenue: 141000,
  },
  {
    productId: "27bfb215-ddd9-4a55-912f-57a0f8226c27",
    productName: "Bún thang",
    totalSale: 1,
    revenue: 50000,
  },
  {
    productId: "dd2fd316-50a7-470c-bc8e-def4109517e5",
    productName: "Marcile",
    totalSale: 1,
    revenue: 1500000,
  },
];

const formatDate = (isoDate: Date) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString("vi-VN").split("/").splice(0, 2).join("/");
};

const StaticPage = () => {
  const [view, setView] = useState<"revenue" | "food">("revenue");

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

      {view === "revenue" ? (
        <ResponsiveContainer width="95%" height={500}>
          <BarChart
            data={mock}
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
      ) : (
        <div className="overflow-x-auto w-full max-w-5xl">
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
              {mockFood.map((item, index) => (
                <tr
                  key={item.productId}
                  // className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  className="bg--white"
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
