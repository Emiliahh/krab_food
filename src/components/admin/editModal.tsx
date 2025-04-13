import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ProductType } from "@/types/productType"; // Update path as needed

interface EditProductDialogProps {
    open: boolean;
    onClose: () => void;
    product: ProductType;
}

const EditProductDialog = ({
    open,
    onClose,
    product,
}: EditProductDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3/4">
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle className="text-xl font-bold">
                            CHỈNH SỬA SẢN PHẨM
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-6 pt-4 w-full">
                    {/* Left Side: Image and Upload */}
                    <div className="flex flex-col items-center flex-1">
                        <img
                            src={
                                product.image ||
                                "https://via.placeholder.com/400"
                            }
                            alt={product.name}
                            className="rounded-lg object-cover w-full max-h-[400px]"
                        />
                        <button className="mt-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Chọn hình ảnh
                        </button>
                    </div>

                    {/* Right Side: Form Inputs */}
                    <div className="flex flex-col flex-1 space-y-4">
                        <div>
                            <label className="font-semibold block mb-1">
                                Tên món
                            </label>
                            <input
                                type="text"
                                defaultValue={product.name}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">
                                Chọn món
                            </label>
                            <select
                                className="w-full p-2 border rounded"
                                defaultValue={product.categoryId}
                            >
                                <option value="mon-lau">Món lẩu</option>
                                <option value="mon-man">Món mặn</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">
                                Giá bán
                            </label>
                            <input
                                type="number"
                                defaultValue={product.price}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">
                                Mô tả
                            </label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={4}
                                defaultValue={product.description}
                            ></textarea>
                        </div>

                        <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductDialog;
