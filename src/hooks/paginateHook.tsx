import { useMemo } from "react";

interface UsePaginateHookProps {
  page: number;
  totalPage: number;
  range?: number; // optional range parameter. Defaults to 2.
}

const usePaginateHook = ({ page, totalPage, range = 2 }: UsePaginateHookProps) => {
  const pages = useMemo(() => {
    const start = Math.max(1, page - range);
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