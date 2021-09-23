import type { Num } from "./types"

export function valueToPercent(r: Num<"value" | "step" | "min" | "max">) {
  return ((r.value - r.min) * 100) / (r.max - r.min)
}

export function percentToValue(v: number, r: Num<"min" | "max">) {
  return r.min + ((r.max - r.min) * v) / 100
}

export function transform(a: [number, number], b: [number, number]) {
  const i = { min: a[0], max: a[1] }
  const o = { min: b[0], max: b[1] }
  return (v: number) => {
    if (i.min === i.max || o.min === o.max) return o.min
    const ratio = (o.max - o.min) / (i.max - i.min)
    return o.min + ratio * (v - i.min)
  }
}
