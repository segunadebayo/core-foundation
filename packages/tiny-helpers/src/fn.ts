import { is } from "./is"

export const runIfFn = <T>(
  v: T,
  ...a: T extends (...a: any[]) => void ? Parameters<T> : never
): T extends (...a: any[]) => void ? ReturnType<T> : T => {
  return is.func(v) ? v(...a) : v
}

export const noop = () => {}

export const pipe =
  <T>(...fns: Array<(a: T) => T>) =>
  (v: T) =>
    fns.reduce((a, b) => b(a), v)

export const cast = <T>(v: unknown) => v as T

export const nextTick = (fn: VoidFunction) => {
  const set = new Set<VoidFunction>()
  function raf(fn: VoidFunction) {
    const id = requestAnimationFrame(fn)
    set.add(() => cancelAnimationFrame(id))
  }
  raf(() => raf(fn))
  return function cleanup() {
    set.forEach(function (fn) {
      fn()
    })
  }
}

export const callAll =
  <T extends (...a: any[]) => void>(...fns: (T | undefined)[]) =>
  (...a: Parameters<T>) => {
    fns.forEach(function (fn) {
      fn?.(...a)
    })
  }
