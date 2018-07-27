import parents from './parents'

export default function(elem: HTMLElement | null): HTMLElement | null {
  const el = parents(elem, '[data-type="node"]')
  if (el.length) {
    return el[0]
  }
  return null
}
