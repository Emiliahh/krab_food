import AddModal from "@/components/admin/addModal";
import ProductCard from "@/components/admin/productCard";
import { getCategoryList, getFoodList } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Plus, RefreshCw, Search } from "lucide-react";
import { useState } from "react";

const ProductPage = () => {
    const [selected, setSelected] = useState("all");
    const [openDialog, setOpenDialog] = useState(false);

    const { data: product } = useQuery({
        queryKey: ["foodList"],
        queryFn: () => getFoodList(1, 8, true),
    });
      const { data: categories } = useQuery({
          queryKey: ["categories"],
          queryFn: () => getCategoryList(),
      });

    return (
        <div className="flex flex-col items-center py-6 px-4 w-full">
            <div className="w-full max-w-6xl space-y-6">
                {/* Filter/Search/Header */}
                <div className="flex w-full items-center gap-6 flex-wrap">
                    {/* Dropdown */}
                    <select
                        className="bg-gray-100 text-black rounded px-4 py-2"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        <option value="a">Tất cả</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                        {/* Add more options if needed */}
                    </select>

                    {/* Search input */}
                    <div className="flex items-center bg-gray-100 rounded px-4 py-2 flex-1 min-w-[250px]">
                        <Search className="w-4 h-4 text-black mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên món..."
                            className="bg-transparent outline-none w-full text-black"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer">
                            <RefreshCw className="w-4 h-4" />
                            Làm mới
                        </button>

                        <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" onClick={() => setOpenDialog(true)}>
                            <Plus className="w-4 h-4" />
                            Thêm món mới
                        </button>
                    </div>
                </div>

                {/* Product list */}
                <div className="flex flex-col gap-4 w-full">
                    {product?.data.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            categoryName="Món mặn" // Replace if needed
                            onEdit={() => console.log("Edit", item.id)}
                            onDelete={() => console.log("Delete", item.id)}
                        />
                    ))}
                </div>
            </div>
            <AddModal open={openDialog} onClose={() => setOpenDialog(false)} categories={categories??[]} />
        </div>
    );
};

export default ProductPage;
