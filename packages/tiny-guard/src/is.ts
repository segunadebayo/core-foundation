const t = (v: any) => Object.prototype.toString.call(v).slice(8, -1)

export const is = {
  arr: (v: any): v is Array<any> => Array.isArray(v),
  bool: (v: any): v is boolean => v === true || v === false,
  obj: (v: any): v is Record<string, any> => t(v) === "Object",
  num: (v: any): v is number => t(v) === "Number" && !Number.isNaN(v),
  str: (v: any): v is string => t(v) === "String",
  func: (v: any): v is Function => t(v) === "Function",
  elem: (v: any): v is HTMLElement => /(HTML|SVG)\w+Element/.test(t(v)) && v.nodeType === Node.ELEMENT_NODE,
}
