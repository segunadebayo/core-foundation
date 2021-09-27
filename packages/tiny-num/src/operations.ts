import { countDecimals, parseIntl } from "./base"
import type { Num } from "./types"

export const clamp = (v: number, o: Num<"min" | "max">) => Math.min(Math.max(v, o.min), o.max)
export const increment = (v: number, s: number) => parseIntl(v + s)
export const decrement = (v: number, s: number) => parseIntl(v - s)
export const multiply = (v: number, s: number) => parseIntl(v * s)

export function round(v: number, t?: number) {
  const p = 10 ** (t ?? 10)
  v = Math.round(v * p) / p
  return t ? v.toFixed(t) : v.toString()
}

export function snapToStep(value: number, step: number) {
  const p = countDecimals(step)
  const v = Math.round(value / step) * step
  return round(v, p)
}
