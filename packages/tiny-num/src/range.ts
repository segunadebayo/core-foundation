import { countDecimals } from "./base"
import type { Num, PartialBy, RangeOptions } from "./types"
import { increment } from "./operations"

export function toNumber(v: string | number) {
  return parseFloat(v.toString().replace(/[^\w.-]+/g, ""))
}

export function range(v: PartialBy<RangeOptions, "precision" | "step">) {
  const { min, max, step = 1, precision = countDecimals(step), value } = v
  const val = value === "" ? 0 : toNumber(value)
  return {
    min,
    max,
    step,
    precision,
    maxPrecision: Math.max(countDecimals(val), countDecimals(step), precision),
    value: val,
    isInRange: val >= min && val <= max,
    isAtMin: val === min,
    isAtMax: val === max,
  }
}

export function toRangeArray(o: Num<"min" | "max" | "step">): number[] {
  let i = o.min
  const range: number[] = []
  while (i <= o.max) {
    range.push(i)
    i = increment(i, o.step)
  }
  return range
}

export function toRanges(o: Num<"min" | "max"> & { value: number[] }) {
  return o.value.map((v, i) => ({ min: v[i - 1] ?? o.min, max: v[i + 1] ?? o.max, value: v }))
}
