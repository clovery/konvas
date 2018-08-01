import parents from './parents'

export default function(elem: HTMLElement | null, selector: string): HTMLElement | null {
  const el = parents(elem, selector)
  if (el.length) {
    return el[0]
  }
  return null
}
