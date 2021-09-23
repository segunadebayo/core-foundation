function getCompactNotations(locale: string, opts: Intl.NumberFormatOptions = {}) {
  const vals = Array.from({ length: 24 }).map((_, i) => Math.pow(10, i + 1))
  const nf = new Intl.NumberFormat(locale, { ...opts, notation: "compact" })

  return vals.reduce<Record<string, number>>((acc, val) => {
    const v = nf.formatToParts(val).find((p) => p.type === "compact")?.value
    if (v) acc[v] = val
    return acc
  }, {})
}

function getPart(
  parts: Intl.NumberFormatPart[],
  type: Intl.NumberFormatPartTypes | "exponentSeparator" | "exponentMinusSign" | "exponentInteger",
  def?: string,
): string {
  //@ts-expect-error
  return parts.find((p) => p.type === type)?.value ?? def
}

export function getLocaleSymbols(locale: string, opts: Intl.NumberFormatOptions = {}) {
  const formatter = new Intl.NumberFormat(locale, opts)
  const o = formatter.resolvedOptions()
  const parts = formatter.formatToParts(-123456.1)
  const eParts = formatter.formatToParts(1e-4)

  const str = new Intl.NumberFormat(locale, { useGrouping: false }).format(9876543210)
  const numerals = str.split("").reverse()
  const numeral = numerals.join("")

  const indexes = new Map(numerals.map((d, i) => [d, i]))
  const index = (str: string) => String(indexes.get(str))

  const literals = parts
    .filter((p) => p.type === "literal")
    .map((p) => p.value)
    .join("")

  const compactNotations = getCompactNotations(locale, o)
  const compactKeys = Object.keys(compactNotations).sort((a, b) => b.length - a.length)
  const compactRegex = new RegExp(`(?<notation>(${compactKeys.join("|")}))`)

  return {
    formatter,
    literals,
    minusSign: getPart(parts, "minusSign", "-"),
    plusSign: getPart(parts, "plusSign", "+"),
    decimal: getPart(parts, "decimal"),
    currency: getPart(parts, "currency"),
    group: getPart(parts, "group"),
    unit: getPart(parts, "unit"),
    percentSign: getPart(parts, "percentSign"),
    exponentialSign: getPart(eParts, "exponentSeparator"),
    compactNotations,
    compactRegex,
    numeral,
    index,
  }
}
