export function getPlatform() {
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios'
  } else if (/android/.test(ua)) {
    return 'android'
  } else if (/windows/.test(ua)) {
    return 'windows'
  } else if (/macintosh/.test(ua)) {
    return 'mac'
  } else {
    return ''
  }
}
