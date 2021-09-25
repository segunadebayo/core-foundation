export function toArray<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export function fromLength<T>(length: number, cb?: (index: number) => T) {
  const arr = Array.from(Array(length).keys())
  return cb ? arr.map(cb) : arr
}

export function first<T>(v: T[]): T | undefined {
  return v[0]
}

export function last<T>(v: T[]): T | undefined {
  return v[v.length - 1]
}

export function isEmpty<T>(v: T[]): boolean {
  return v.length === 0
}

export function has<T>(v: T[], t: any): boolean {
  return v.indexOf(t) !== -1
}

export function chunk<T>(v: T[], size: number): T[][] {
  const res: T[][] = []
  return v.reduce((rows, value, index) => {
    if (index % size === 0) rows.push([value])
    else last(rows)?.push(value)
    return rows
  }, res)
}

export function add<T>(v: T[], ...items: T[]): T[] {
  return v.concat(items)
}

export function addAt<T>(v: T[], idx: number, ...items: T[]): T[] {
  v.splice(idx, 0, ...items)
  return v
}

export function removeAt<T>(v: T[], i: number): T[] {
  if (i > -1) v.splice(i, 1)
  return v
}

export function remove<T>(v: T[], item: T): T[] {
  return removeAt(v, v.indexOf(item))
}

export function each<T, K>(v: T[], fn: (value: T, index: number, arr: T[]) => K): void {
  const len = v.length
  for (let i = 0; i < len; i++) {
    fn(v[i], i, v)
  }
}

export function find<T>(v: T[], fn: (value: T, key: number, arr: T[]) => boolean): T | undefined {
  const len = v.length
  for (let i = 0; i < len; i++) {
    if (fn(v[i], i, v)) return v[i]
  }
}

export function filter<T>(v: T[], fn: (value: T, key: number, arr: T[]) => boolean): T[] {
  const arr: T[] = []
  each(v, (...a) => {
    if (fn(...a)) arr.push(a[0])
  })
  return arr
}

export function clear<T>(v: T[]): T[] {
  while (v.length > 0) v.pop()
  return v
}

export function replace<T>(v: T[], idx: number, ...items: T[]): T[] {
  if (idx > -1) v.splice(idx, 1, ...items)
  return v
}

export function move<T>(v: T[], from: number, to: number): T[] {
  const len = v.length
  from = from < 0 ? len + from : from
  to = to < 0 ? len + to : to
  if (from >= 0 && from < len) {
    const x = v.splice(from, 1)
    v.splice(to, 0, x[0])
  }
  return v
}

export type IndexOptions = {
  step?: number
  loop?: boolean
}

export function nextIndex<T>(v: T[], idx: number, opts: IndexOptions = {}): number {
  const { step = 1, loop = true } = opts
  const next = idx + step
  const len = v.length
  const last = len - 1
  if (idx === -1) return step > 0 ? 0 : last
  if (next < 0) return loop ? last : 0
  if (next >= len) return loop ? 0 : idx > len ? len : idx
  return next
}

export function next<T>(v: T[], idx: number, opts: IndexOptions = {}): T | undefined {
  return v[nextIndex(v, idx, opts)]
}

export function prevIndex<T>(v: T[], idx: number, opts: IndexOptions = {}): number {
  const { step = 1, loop = true } = opts
  return nextIndex(v, idx, { step: -step, loop })
}

export function prev<T>(v: T[], index: number, opts: IndexOptions = {}): T | undefined {
  return v[prevIndex(v, index, opts)]
}

export type SearchOptions<T> = {
  toString: (item: T) => string
  current: T | undefined
}

export function search<T>(v: T[], query: string | null | undefined, opts: SearchOptions<T>): T | undefined {
  const { toString, current } = opts
  if (query == null) return current
  const match = (item: T) => toString(item).toLowerCase().startsWith(query.toLowerCase())
  const filtered = filter(v, match)
  if (!current) return first(filtered)
  if (isEmpty(filtered)) return current
  if (filtered.length === 1) return first(filtered)
  return next(filtered, filtered.indexOf(current))
}
