export interface IPagination {
  total_results: number;
  current_page: number;
  take_per_page: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}
