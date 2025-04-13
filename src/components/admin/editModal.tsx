import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, ProductType, UploadProductType } from "@/types/productType"; // Update path as needed
import { Check, FileUp } from "lucide-react";
import { upateProduct } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductType;
  categories: Category[];
}

const EditProductDialog = ({
  open,
  onClose,
  product,
  categories,
}: EditProductDialogProps) => {
  const [editedProduct, setEditedProduct] = useState<ProductType>(product);
  const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);
  const queryClient = useQueryClient();
  const handleChange = <K extends keyof ProductType>(
    field: K,
    value: ProductType[K]
  ) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSave = async () => {
    console.log("Updated product:", editedProduct);
    const data: UploadProductType = {
      image: image,
      name: editedProduct.name,
      price: editedProduct.price,
      description: editedProduct.description ?? "",
      categoryId: editedProduct.categoryId,
    };
    const res = await upateProduct(data, product.id);
    if (res) {
      alert("Cập nhập sản phẩm thành công");
      queryClient.invalidateQueries({queryKey:["foodList"]});
      onClose();
    } else {
      alert("Failed to update product:");
    }
  };
  useEffect(() => {
    if (!open) {
      setEditedProduct(product);
      setImage(null);
    }
  }, [open, product]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] p-4 rounded-md">
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
                image
                  ? URL.createObjectURL(image)
                  : typeof product.image === "string"
                  ? product.image
                  : ""
              }
              alt={editedProduct.name}
              className="rounded-lg object-cover w-full max-h-[400px]"
            />
            <button
              className="mt-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp />
              Chọn hình ảnh
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          {/* Right Side: Form Inputs */}
          <div className="flex flex-col flex-1 space-y-4">
            <div>
              <label className="font-semibold block mb-1">Tên món</label>
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Chọn món</label>
              <select
                className="w-full p-2 border rounded"
                value={editedProduct.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Giá bán</label>
              <input
                type="number"
                value={editedProduct.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Mô tả</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                value={editedProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={handleSave}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <Check />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
