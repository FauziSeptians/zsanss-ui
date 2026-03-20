// --- Object Assign Export ---

import { Next, Pages, PaginationRoot, Prev } from "./pagination"

export const Pagination = Object.assign(PaginationRoot, {
  Prev,
  Next,
  Pages,
})

export default Pagination