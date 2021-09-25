function t(v: any) {
  return Object.prototype.toString.call(v).slice(8, -1)
}

export const is = {
  arr: (v: any): v is Array<any> => Array.isArray(v),
  bool: (v: any): v is boolean => t(v) === "Boolean",
  obj: (v: any): v is Record<string, any> => t(v) === "Object",
  num: (v: any): v is number => t(v) === "Number" && !Number.isNaN(v),
  str: (v: any): v is string => t(v) === "String",
  func: (v: any): v is Function => t(v) === "Function",
  elem: (v: any): v is HTMLElement => is.obj(v) && v.nodeType === Node.ELEMENT_NODE && is.str(v.nodeName),
}
