import { isDom } from "./env"

export const supportsPointerEvent = () => isDom() && window.onpointerdown === null
export const supportsTouchEvent = () => isDom() && window.ontouchstart === null
export const supportsMouseEvent = () => isDom() && window.onmousedown === null

export const supportsLocalStorage = () => {
  try {
    return typeof window.localStorage !== "undefined"
  } catch (e) {
    return false
  }
}

export const supportsPassive = () => {
  let s = false
  try {
    addEventListener(
      "test",
      () => {},
      Object.defineProperty({}, "passive", {
        get() {
          s = true
          return true
        },
      }),
    )
  } catch (e) {}
  return s
}
