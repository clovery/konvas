// tslint:disable
import Cursor from './cursor'
import setStyle from '../utils/setStyle'
import CursorStyles from './cursor-styles'
import initEvent from './initEvent'

/**
 * nw ------ n ------ ne
 * w       center     e
 * sw ------ s ------ se
 */
const Cursors = [
  'nw', 'n', 'ne',
  'w', 'e',
  'sw', 's', 'se'
]

class Resizeable {
  public el: any
  private cursors: any
  private layout: any
  private options: any
  private controls: any
  public direction: any
  public start: any
  public startPoint: any
  public dragger: any
  public dragging: any
  public onMove: any
  public _scale: any
  [key: string]: any

  constructor(el?: any, options?: any) {
    this.layout = {}

    if (!el) {
      el = document.createElement('div')
    }
    if (typeof el === 'object') {
      options = el
      el = document.createElement('div')
    }

    this.el = el
    this.el.classList.add('resizer')
    this.options = options
    this.controls = {}
    if (options.dragger) {
      this.dragger = options.dragger
    }

    Cursors.forEach(this.createCursor.bind(this))
    setStyle(this.el, {
      position: 'absolute',
      cursor: 'move',
      zIndex: 100
    }) 

    const border = document.createElement('div')
    setStyle(border, {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.3)'
    })
    this.el.appendChild(border)

    this.hide()

    initEvent(this)
  }

  createCursor(type: string) {
    let elem = document.createElement('div')
    this.controls[type] = elem

    this.controls[type] = this[type] = new Cursor(elem, { style: CursorStyles[type], type })

    this.el.appendChild(elem)
  }

  hide() {
    this.el.style.display = 'none'
  }

  show() {
    this.el.style.display = 'block'
  }

  setCursor(type, x, y) {
    let result = {}
    /**
     * north west
     * x 变 y 变 width 变 height 变
     */
    if (type === 'nw') {
      let width = this.start.x - x + this.start.width
      let height = this.start.y - y + this.start.height

      Object.assign(result, { x, y, width, height })
    }

    /**
     * north
     * x 不变 y 变 width 不变 height 变
     */
    if (type === 'n') {
      let height = this.start.y - y + this.start.height

      result.y = y
      result.height = height
    }

    /**
     * north east
     * x 不变 y 变 width 变 height 变
     */
    if (type === 'ne') {
      let width = x - this.start.x
      let height = this.start.y - y + this.start.height

      if (this.start.y - y <= -120) {
        y = this.start.y - (-120)
        height = this.start.y - y + this.start.height
      }

      Object.assign(result, { width, height, y })
    }

    /**
     * west
     * x 变
     * y 不变
     * w 变
     * h 不变
     */
    if (type === 'w') {
      let width = this.start.x - x + this.start.width

      result.x = x
      result.width = width
    }

    /**
     * e 东
     * x 不变
     * y 不变
     * w 变
     * h 不变
     */
    if (type === 'e') {
      let width = x - this.x

      result.width = width
    }

    /**
     * south west
     * x 变 y 不变 width 变 height 变
     */
     if (type === 'sw') {
       let width = this.start.x - x + this.start.width
       let height = y - this.start.y

       result.x = x
       result.width = width
       result.height = height
     }

    /**
     * south
     */
    if (type === 's') {
      let height = y - this.y

      if (height < 50) {
        height = 50
      }

      result.height = height
    }

    /**
     * south east
     * x 变 y 变 width 变 height 变
     */
    if (type === 'se') {
      let width = x - this.start.x
      let height = y - this.start.y

      Object.assign(result, { width, height })
    }


    this.update(result)
    this.onResize(result)
  }

  set width(val) {
    this.layout.width = val
  }

  get width() {
    return this.layout.width
  }

  set height(val) {
    this.layout.height = val
  }

  get height() {
    return this.layout.height
  }

  set y(val) {
    this.layout.y = val
  }

  get y() {
    return this.layout.y
  }

  set x(val) {
    this.layout.x = val
  }

  get x() {
    return this.layout.x
  }
  onStop() {
    this._x = this.x
    this._y = this.y
    this._w = this.w
    this._h = this.h
  }

  active(coords: any) {
    const { x, y, width = 100, height = 100 } = coords
    this._x = x
    this._y = y
    this._w = width
    this._h = height

    this.update({ x, y, width, height })
    this.show()
  }

  /**
   * 更新位置信息
   */
  update(coords?: any) {
    this.x = typeof coords.x !== 'undefined' ? coords.x : this.x
    this.y = typeof coords.y !== 'undefined' ? coords.y : this.y
    this.w = typeof coords.width !== 'undefined' ? coords.width : this.w
    this.h = typeof coords.height !== 'undefined' ? coords.height : this.h

    if (typeof coords.width === 'number') {
      this.width = coords.width
    }
    if (typeof coords.height === 'number') {
      this.height = coords.height
    }
    if (typeof coords.x === 'number') {
      this.x = coords.x
    }
    if (typeof coords.y === 'number') {
      this.y = coords.y
    }
    /*
    const x = this.x * this._scale
    const y = this.y * this._scale
    const w = this.w * this._scale
    const h = this.h * this._scale
    */
   const x = this.x
   const y = this.y
   const w = this.w
   const h = this.h

    this.controls.nw.set(0, 0) // coords.x, coords.y)
    this.controls.n.set(w / 2, 0)
    this.controls.ne.set(w, 0)

    this.controls.w.set(0, h / 2)
    this.controls.e.set(w, h / 2)

    this.controls.sw.set(0, h)
    this.controls.s.set(w / 2, h)
    this.controls.se.set(w, h)

    this.el.style.width = w + 'px'
    this.el.style.height = h + 'px'
    this.el.style.left = x + 'px'
    this.el.style.top = y + 'px'

    // this.options.onResize({ x: this.x, y: this.y, w: this.w, h: this.h })
  }

  draw() {
    this.update()
  }

  /**
   *
   */
  move(x: any, y: any) {
    this.update({ x, y})
  }

  set scale(val: any) {
    this._scale = val
    this.draw()
  }
}

export default Resizeable
