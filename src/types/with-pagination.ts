import { IPagination } from "./pagination";
import { IQuery } from "./query";

export interface WithPagination<T> {
  results: T[];
  pagination: IPagination;
  query?: IQuery;
}
