import { getCategoryList } from "@/services/productService";
import useSearchStore from "@/store/useSearch";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  X,
  RotateCcw,
  ArrowDown10,
  ArrowUp10,
} from "lucide-react";
import React from "react";
interface FilterBarProps {
  toggle: () => void;
}
const FilterBar: React.FC<FilterBarProps> = ({ toggle }) => {
  const filterBarVariants = {
    hidden: {
      y: "-20px",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const {
    from,
    to,
    desc,
    categoryId,
    clearSearch,
    setFrom,
    setTo,
    setDesc,
    setCategoryId,
  } = useSearchStore();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoryList(),
  });

  return (
    <motion.div
      variants={filterBarVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-20 p-2  w-full border-t border-gray-200 text-sm "
    >
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <span>Phân loại</span>
        <select
          className="bg-light-gray px-3 w-32 py-1 rounded-xs"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
        >
          <option value={""}>Tất cả</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="flex items-center gap-2">
        <span>Giá từ</span>
        <input
          type="number"
          value={from}
          onChange={(e) =>
            setFrom(Math.max(0, parseFloat(e.target.value)).toString())
          }
          placeholder="tối thiểu"
          className="bg-light-gray px-3 py-1 rounded-xs w-36 text-silver-gray"
        />
        <span>đến</span>
        <input
          type="number"
          value={to}
          onChange={(e) =>
            setTo(Math.max(0, parseFloat(e.target.value)).toString())
          }
          placeholder="tối đa"
          className="bg-light-gray px-3 py-1 rounded-xs w-36 text-silver-gray"
        />
      </div>

      {/* Icons */}
      <div className="flex gap-2">
        {/* <button className="bg-gray-200 p-2 rounded-md">
          <Filter size={18} />
        </button> */}
        <button
          className="bg-gray-200 p-2 rounded-md"
          onClick={() => {
            setDesc();
          }}
        >
          {desc ? (
            <ArrowDown10 size={18} />
          ) : (
            <ArrowUp10 size={18} />
          )}
        </button>
        <button
          className="bg-gray-200 p-2 rounded-md"
          onClick={() => clearSearch()}
        >
          <RotateCcw size={18} />
        </button>
        <button className="bg-gray-200 p-2 rounded-md" onClick={toggle}>
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default FilterBar;
