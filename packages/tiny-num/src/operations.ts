import { countDecimals, parseIntl } from "./base"
import type { Num } from "./types"

export const clamp = (v: number, o: Num<"min" | "max">) => Math.min(Math.max(v, o.min), o.max)
export const inc = (v: number, s: number) => parseIntl(v + s)
export const dec = (v: number, s: number) => parseIntl(v - s)
export const div = (v: number, s: number) => parseIntl(v / s)

export function round(v: number, t?: number) {
  const p = 10 ** (t ?? 10)
  v = Math.round(v * p) / p
  return t ? v.toFixed(t) : v.toString()
}

export function snapToStep(r: Num<"step" | "value">) {
  const p = countDecimals(r.step)
  const v = Math.round(r.value / r.step) * r.step
  return round(v, p)
}
