import { useState } from "react";
import { ProductType } from "@/types/productType";
import { NotebookPen, Trash } from "lucide-react";// update path as needed
import EditProductDialog from "@/components/admin/editModal";

interface ProductCardProps {
    product: ProductType;
    categoryName?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function ProductCard({
    product,
    categoryName,
    onDelete,
}: ProductCardProps) {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <div className="flex items-start gap-4 p-4 bg-white border rounded-xl shadow-sm w-full">
                {/* Image */}
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-28 h-28 object-cover rounded-md"
                    />
                )}

                {/* Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                    </p>
                    {categoryName && (
                        <span className="px-3 py-1 text-sm border rounded-full text-gray-700">
                            {categoryName}
                        </span>
                    )}
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col items-end gap-2">
                    <span className="text-red-700 font-semibold">
                        {product.price.toLocaleString()} ₫
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenDialog(true)}
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                        >
                            <NotebookPen className="w-4 h-4 text-black" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-700 hover:bg-red-800 p-2 rounded-full"
                        >
                            <Trash className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <EditProductDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                product={product}
            />
        </>
    );
}
