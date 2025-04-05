 interface PaginatedResponse<T> {
    currentPage: number;
    totalPage: number;
    pageSize: number;
    data: T[];
  }
export default PaginatedResponse ;