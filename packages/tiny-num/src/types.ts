export type Num<T extends string> = Record<T, number>

export type RangeOptions<T = string | number> = Num<"min" | "max"> & {
  step: number
  precision: number
  value: T
}

export type Computed = Record<"isInRange" | "isAtMax" | "isAtMin", boolean>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
