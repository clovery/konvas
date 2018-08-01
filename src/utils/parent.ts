import parents from './parents'

export default function(elem: HTMLElement, selector: string): HTMLElement | null {
  const elems = parents(elem, selector)
  if (elems) {
    return elems[0]
  }
  return null
}
