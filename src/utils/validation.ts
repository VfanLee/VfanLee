export function isExternalLink(url: string) {
  return /^(https?:\/\/)/.test(url)
}
