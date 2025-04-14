import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUp, Plus } from "lucide-react";
import { useRef, useState } from "react";
import Category from "@/types/categoryType";
import { addProduct } from "@/services/productService";
import { UploadProductType } from "@/types/productType";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  refetch: () => void;
}

const AddModal = ({
  open,
  onClose,
  categories,
  refetch,
}: EditProductDialogProps) => {
  const [formData, setFormData] = useState<UploadProductType>({
    name: "",
    price: 0,
    image: null,
    description: "",
    categoryId: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name === "") {
      alert("Tên món không được để trống");
      return;
    }
    if (formData.categoryId === "") {
      alert("Danh mục không được để trống");
      return;
    }
    const res = await addProduct(formData);
    if (res) {
      alert("Thêm sản phẩm thành công");
      refetch();
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] p-4 rounded-md">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-sm font-bold">Thêm sản phẩm</DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Thêm chi tiết sản phẩm mới vào danh mục.
        </DialogDescription>

        <div className="flex flex-col md:flex-row gap-8 pt-4">
          {/* Left Side: Image and Upload */}
          <div className="flex flex-col items-center flex-1 gap-6">
            <img
              src={
                typeof formData.image === "string"
                  ? formData.image
                  : formData.image
                  ? URL.createObjectURL(formData.image)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png"
              }
              alt="preview"
              className="rounded-lg object-cover w-full max-w-sm h-auto"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FileUp className="w-4 h-4" />
              Chọn hình ảnh
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Right Side: Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full flex-1"
          >
            <div>
              <label className="block font-semibold mb-1">Tên món</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên món"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Chọn danh mục</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
              >
                <option value="">Chọn danh mục</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Giá bán</label>
              <input
                type="number"
                name="price"
                placeholder="Nhập giá bán"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Mô tả</label>
              <textarea
                name="description"
                placeholder="Nhập mô tả món ăn..."
                value={formData.description}
                onChange={handleChange}
                className="w-96 p-2 border rounded min-h-24 resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-closet hover:bg-red-800 text-white px-6 py-2 rounded flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              THÊM MÓN
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
