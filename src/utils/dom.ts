export function query(el: string | Element): Element {
  if (typeof el === 'string') {
    const node = document.querySelector(el)
    if (!node) {
      return document.createElement('div')
    }
    return node 
  } else {
    return el
  }
}

export function createElement(tag: string) {
  return document.createElement(tag)
}

export const createElem = createElement
