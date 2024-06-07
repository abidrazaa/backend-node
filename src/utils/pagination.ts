import { BaseQuery } from 'types/common';

class Pagination {
  limit: number | null;
  skip: number | null;
  sort: Record<string, number> | null;

  /**
   * _page  - page number
   * _limit - limit of records
   * _sort  - sort by value
   * _order - order of sort "asc" | "desc"
   * @param query request query object
   */
  constructor(query: BaseQuery) {
    this.limit = query._limit ? parseInt(query._limit) : null;
    this.skip = query._page && this.limit ? (parseInt(query._page) - 1) * this.limit : null;
    this.sort = {};

    if (query._sort) {
      const order = query._order;
      this.sort[query._sort] = order === 'desc' ? -1 : 1;
    }
  }
}

export default Pagination;
