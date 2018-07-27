function setStyleProp(elem: any, key: string, style: any) {
  elem[key] = style[key]
}

export default function setStyle(el: Element, style: any) {
  const elem = el as HTMLElement
  if (style) {
    // const styles = []
    for (const key in style) {
      if (key) {
        setStyleProp(elem.style, key, style)
      }
    }
  }
}
