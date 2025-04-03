import { motion } from "framer-motion";
import {
  Filter,
  X,
  ArrowDownNarrowWide,
  RotateCcw,
} from "lucide-react";

const FilterBar = () => {
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

  return (
    <motion.div
      variants={filterBarVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-20 p-2 rounded-lg border-t border-gray-200 z-0"
    >
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <span>Phân loại</span>
        <select className="bg-light-gray px-3 w-32 py-1 rounded-xs">
          <option>Tất cả</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex items-center gap-2">
        <span>Giá từ</span>
        <input
          type="text"
          placeholder="tối thiểu"
          className="bg-light-gray px-3 py-1 rounded-xs w-36 text-silver-gray"
        />
        <span>đến</span>
        <input
          type="text"
          placeholder="tối đa"
          className="bg-light-gray px-3 py-1 rounded-xs w-36 text-silver-gray"
        />
        {/* <button className="bg-closet p-2 rounded-md text-white">
          <Search size={18} />
        </button> */}
      </div>

      {/* Icons */}
      <div className="flex gap-2">
        <button className="bg-gray-200 p-2 rounded-md">
          <Filter size={18} />
        </button>
        <button className="bg-gray-200 p-2 rounded-md">
          <ArrowDownNarrowWide size={18} />
        </button>
        <button className="bg-gray-200 p-2 rounded-md">
          <RotateCcw size={18} />
        </button>
        <button className="bg-gray-200 p-2 rounded-md">
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default FilterBar;
