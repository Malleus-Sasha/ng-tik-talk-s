export interface Pageable<T> {
  items: T[],
  total: number,
  page: number,
  size: number,
  pages: number,
}

export interface PageByPage<T, K> {
  items: T[],
  total: K,
  page: number,
  size: number,
  pages: number,
}
