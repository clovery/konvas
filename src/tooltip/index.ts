import { createElem } from '../utils/dom'
import setStyle from '../utils/setStyle'

class Tooltip {
  public el: HTMLElement

  constructor() {
    this.el = createElem('div')

    this.initStyle()
  }

  private initStyle() {
    setStyle(this.el, {
      position: 'absolute',
      zIndex: '2222',
      background: '#0fd6d6',
      padding: '2px 4px',
      color: '#231b1b',
      borderRadius: '3px',
      fontSize: '14px',
      display: 'none'
    })
  }

  public setPoint(left: number, top: number, point: any) {
      this.el.style.left = `${left}px`
      this.el.style.top = `${top}px`
      this.el.textContent = `x: ${point.x} y: ${point.y}`
  }

  public active(item ?: any) {
    if (item) {
      this.render(item)
    }
    this.el.style.display = 'inline-block'
  }

  public render(item: any) {
    const { x, y, w, h, scale } = item

    this.el.style.left = `${x * scale}px`
    this.el.style.top = `${(y + h) * scale + 2}px`

    this.el.innerHTML = `
      <div>x: ${x} y: ${y}</div>
      <div>w: ${w} h: ${h}</div>
    `
  }

  public inactive() {
    this.el.style.display = 'none'
  }
}

export default Tooltip
