export const is = {
  arr: (v: any): v is any[] => Array.isArray(v),
  bool: (v: any): v is boolean => v === true || v === false,
  obj: (v: any): v is Record<string, any> => !(v == null || typeof v !== "object" || is.arr(v)),
  num: (v: any): v is number => typeof v === "number" && !Number.isNaN(v),
  str: (v: any): v is string => typeof v === "string",
  func: (v: any): v is Function => typeof v === "function",
  elem: (v: any): v is HTMLElement => is.obj(v) && v.nodeType === Node.ELEMENT_NODE && is.str(v.nodeName),
}
