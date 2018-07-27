export default function(dst: any, src: any) {
  for (const key in src) {
    if (src[key]) {
      dst[key] = src[key]
    }
  }
}
