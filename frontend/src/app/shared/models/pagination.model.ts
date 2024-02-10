export interface PageableRequest {
  size: number;
  page: number;
}

export interface PageableDTO {
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
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
