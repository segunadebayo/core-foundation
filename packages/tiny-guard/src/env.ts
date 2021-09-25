const platform = (v: RegExp) => isDom() && v.test(navigator.platform)
const ua = (v: RegExp) => isDom() && v.test(navigator.userAgent)
const vendor = (v: RegExp) => isDom() && v.test(navigator.vendor)

export const isDev = () => process.env.NODE_ENV !== "production"
export const isDom = () => !!(typeof window !== "undefined")
export const isMac = () => platform(/^Mac/)
export const isIPhone = () => platform(/^iPhone/)
export const isIPad = () => platform(/^iPad/) || (isMac() && navigator.maxTouchPoints > 1)
export const isIos = () => isIPhone() || isIPad()
export const isSafari = () => ua(/^Safari/) && vendor(/Apple Computer/)
export const isFirefox = () => ua(/^Firefox/)
export const isWebkit = () => ua(/^WebKit/) && !ua(/Chrome/)
export const isApple = () => isMac() || isIos()
