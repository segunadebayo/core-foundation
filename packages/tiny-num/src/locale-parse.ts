import { getLocaleSymbols } from "./locale-symbol"

export type ParseOptions = Intl.NumberFormatOptions & {
  locale?: string
}

export function parse(v: string, opts: ParseOptions) {
  opts.locale = opts.locale ?? "en-US"
  const sym = getLocaleSymbols(opts.locale, opts)
  const o = sym.formatter.resolvedOptions() as Intl.NumberFormatOptions & Intl.ResolvedNumberFormatOptions

  let value = v
    .replace(new RegExp(sym.group, "g"), "")
    .replace(sym.decimal, ".")
    .replace(sym.currency, "")
    .replace(sym.percentSign, "")
    .replace(sym.exponentialSign, "e")
    .replace(sym.minusSign, "-")
    .replace(new RegExp(`[${sym.literals}]`), "")
    .replace(sym.numeral, sym.index)

  let num = +value

  if (isNaN(num)) return NaN

  if (o.currencySign === "accounting" && new RegExp("^.*\\(.*\\).*$").test(v)) {
    num = -1 * num
  }

  if (opts.notation === "compact") {
    const res = sym.compactRegex.exec(v)
    const n = res?.groups?.notation
    let t = n ? sym.compactNotations[n] : 1
    if (o.locale === "ar") t /= 100
    if (o.locale === "zh-CN") t /= 1000
    num = num * t
  }

  if (o.style === "percent") {
    num /= 100
    num = +num.toFixed((o.maximumFractionDigits ?? 0) + 2)
  }

  return num
}

console.log(parse("987,654E6", { locale: "de", notation: "engineering" }))
