export default function(elem: HTMLElement | null, selector: string) {
  const elements = []
  const ishaveselector = selector !== undefined

  if (elem && elem.matches(selector)) {
    return [elem]
  }

  // tslint:disable
  while ((elem = (elem && elem.parentElement)) !== null) {
    if (elem.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    if (!ishaveselector || elem.matches(selector)) {
      elements.push(elem)
    }
  }
  return elements
}
