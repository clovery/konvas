import setStyle from '../utils/setStyle'

class Cursor {
  private el: any
  private type: any
  private opts: any
  public x: any
  public y: any

  constructor(el: any, opts: any) {
    this.el = el
    this.type = opts.type
    this.opts = opts

    this.x = 0
    this.y = 0

    this.el.dataset.type = this.type
    this.initStyle()
  }

  private initStyle() {
    const { style } = this.opts
    setStyle(this.el, {
      width: '8px',
      height: '8px',
      position: 'absolute',
      marginTop: '-4px',
      marginLeft: '-4px',
    }) 

    for (const name in style) {
      if (style[name]) {
        this.el.style[name] = style[name]
      }
    }

    this.el.classList.add('cursor')
    this.el.classList.add(`cursor-${this.type}`)
    this.el.style.cursor = `${this.type}-resize`
    this.el.style.zIndex = 1024

    const border = document.createElement('div')
    setStyle(border, {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: '#fff',
      border: '1px solid #616097'
    })
    this.el.appendChild(border)
  }

  public set(x: number, y: number) {
    this.x = x
    this.y = y

    this.el.style.left = this.x + 'px'
    this.el.style.top = this.y + 'px'
  }
}

export default Cursor
