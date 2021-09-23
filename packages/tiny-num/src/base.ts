export const formatter = new Intl.NumberFormat("en-US", { style: "decimal" })
export const parseIntl = (n: number) => parseFloat(formatter.format(n))
export function countDecimals(v: number | undefined) {
  return formatter.formatToParts(v).find((p) => p.type === "fraction")?.value.length ?? 0
}
