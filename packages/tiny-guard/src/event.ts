import { isObject } from "./is"
import { isMac } from "./env"

export const isMouseEvent = (v: any): v is MouseEvent => isObject(v) && "button" in v
export const isTouchEvent = (v: any): v is TouchEvent => isObject(v) && "touches" in v
export const isLeftClick = (v: MouseEvent | PointerEvent) => v.button === 0
export const isRightClick = (v: MouseEvent | PointerEvent) => v.button === 2
export const isModifiedEvent = (v: MouseEvent | PointerEvent) => v.ctrlKey || v.altKey || v.metaKey
export const isCtrlKey = (v: KeyboardEvent) => (isMac() ? v.metaKey && !v.ctrlKey : v.ctrlKey && !v.metaKey)
