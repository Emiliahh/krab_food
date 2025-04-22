import { useMemo } from "react";

interface UsePaginateHookProps {
  page: number;
  totalPage: number;
  range?: number; 
}

const usePaginateHook = ({ page, totalPage, range = 2 }: UsePaginateHookProps) => {
  const pages = useMemo(() => {
    // tính điểm bắt đầu 
    const start = Math.max(1, page - range);
    // tính điểm kết thúc
    const end = Math.min(totalPage, page + range);
    
    const pagesArray = [];
    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }, [page, totalPage, range]);

  return pages;
};

export default usePaginateHook;