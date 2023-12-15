export interface Pagination {
  size: number;
  page: number;
}

export interface PaginationDTO {
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}

export interface Paginated<T> {
  content: T;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
}

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Sorting {
  id: number;
  label: string;
  property: string;
  order: SortingOrder;
}
