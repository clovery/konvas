// tslint:disable
import Cursor from './cursor'
import setStyle from '../utils/setStyle'
import CursorStyles from './cursor-styles'
import EventEmitter from '../utils/eventeimtter'
import initRotate from './initRotate'

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

class Resizer extends (EventEmitter as { new(): any; }) {
  public el: any
  public cursors: any
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
  private activated: boolean
  public adjustObject: any
  [key: string]: any

  constructor(el?: any, options?: any) {
    super()
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
    this.el.setAttribute('data-type', 'resizer')
    this.options = options
    this.opts = options
    this.controls = {}

    if (options.dragger) {
      this.dragger = options.dragger
    }

    if (this.opts.scale) {
      this.layout.scale = this.options.scale
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
      border: '1px solid #616097'
    })
    this.el.appendChild(border)

    this.activated = true

    initRotate(this)

    this.hide()
    this.ee = new EventEmitter
  }

  get isActive() {
    return this.activated
  }

  createCursor(type: string) {
    let elem = document.createElement('div')
    this.controls[type] = elem
    this.controls[type] = this['cursor_' + type] = new Cursor(elem, { style: CursorStyles[type], type })
    this.el.appendChild(elem)
  }

  hide() {
    if (this.isActive) {
      this.el.style.display = 'none'
      this.activated = false
    }
  }

  show() {
    if (!this.isActive) {
      this.el.style.display = 'block'
      this.activated = true
    }
  }


  // 移动某点
  public moveCursor(type: string, point: any) {
    this.setCursor(type, point.x, point.y)
  }

  private setCursor(type: string, x: number, y: number) {
    let result: any = { ...this.start }

    /**
     * north west
     * x 变 y 变 width 变 height 变
     */
    if (type === 'nw') {
      let w = this.start.x - x + this.start.w
      let h = this.start.y - y + this.start.h

      Object.assign(result, { x, y, w, h })
    }

    /**
     * north
     * x 不变 y 变 width 不变 height 变
     */
    if (type === 'n') {
      let h = this.start.y - y + this.start.h

      result.y = y
      result.h = h
    }

    /**
     * north east
     * x 不变 y 变 width 变 height 变
     */
    if (type === 'ne') {
      let w = x - this.start.x
      let h = this.start.y - y + this.start.h

      if (this.start.y - y <= -120) {
        y = this.start.y - (-120)
        h = this.start.y - y + this.start.h
      }

      Object.assign(result, { w, h, y })
    }

    /**
     * west
     * x 变 y 不变 w 变 h 不变
     */
    if (type === 'w') {
      let w = this.start.x - x + this.start.w

      result.x = x
      result.w = w
    }

    /**
     * east 东
     * x 不变 y 不变 w 变 h 不变
     */
    if (type === 'e') {
      let w = x - this.x

      result.w = w
    }

    /**
     * south west
     * x 变 y 不变 width 变 height 变
     */
     if (type === 'sw') {
       let w = this.start.x - x + this.start.w
       let h = y - this.start.y

       result.x = x
       result.w = w
       result.h = h
     }

    /**
     * south
     */
    if (type === 's') {
      let h = y - this.y

      if (h < 50) {
        h = 50
      }

      result.h = h
    }

    /**
     * south east
     * x 变 y 变 width 变 height 变
     */
    if (type === 'se') {
      let w = x - this.start.x
      let h = y - this.start.y

      Object.assign(result, { w, h })
    }

    this.render(result)
  }

  render(opts: any) {
    this.move(opts.x, opts.y)
    this.resize(opts.w, opts.h)

    this.adjustObject.move(opts.x, opts.y)
    this.adjustObject.resize(opts.w, opts.h)

    this.emit('resize', this.adjustObject, opts)
  }

  get w() {
    return this.layout.w
  }

  get h() {
    return this.layout.h
  }

  get y() {
    return this.layout.y
  }

  get x() {
    return this.layout.x
  }

  // 设置调整对象
  public setAdjustObject(o: any) {
    this.adjustObject = o

    const { x, y, scale, w = 100, h = 100 } = o
    this.update({ x, y, w, h, scale })

    return this
  }

  active(liveNode ?: any) {
    if (liveNode) {
      this.setAdjustObject(liveNode)
      const { rotate = 0 } = liveNode
      this.setRotate(rotate)
    }
    if (!this.adjustObject) {
      return
    }
    this.show()
    this.activated = true
  }

  inactive() {
    this.hide()
    this.activated = false
  }

  // 更新位置信息
  update(coords?: any) {
    let x = typeof coords.x !== 'undefined' ? coords.x : this.x
    let y = typeof coords.y !== 'undefined' ? coords.y : this.y
    let w = typeof coords.w !== 'undefined' ? coords.w : this.w
    let h = typeof coords.h !== 'undefined' ? coords.h : this.h
    const { scale } = coords

    if (typeof coords.w === 'number') {
      w = coords.w
    }
    if (typeof coords.h === 'number') {
      h = coords.h
    }
    if (typeof coords.x === 'number') {
      x = coords.x
    }
    if (typeof coords.y === 'number') {
      y = coords.y
    }

    this.layout.x = x
    this.layout.y = y
    this.layout.w = w
    this.layout.h = h

    x = x * scale
    y = y * scale
    w = w * scale
    h = h * scale

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
  }

  draw() {
    this.update()
  }

  // 移动
  move(x: number, y: number) {
    const left = x * this.scale
    const top = y * this.scale

    this.layout.x = x
    this.layout.y = y

    this.el.style.left = `${left}px`
    this.el.style.top = `${top}px`

    return this
  }

  resize(w: number, h: number) {
    this.layout.w = w
    this.layout.h = h

    this.el.style.width = w * this.scale + 'px'
    this.el.style.height = h * this.scale + 'px'
  }

  setRotate(degree: number) {
    this.layout.degree = degree
    this.el.style.transform = `rotate(${degree}deg)`
  }

  get scale() {
    return this.layout.scale
  }

  set scale(val: number) {
    this.layout.scale = val

    this.resize(this.w, this.h)
    this.move(this.x, this.y)
  }
}

export default Resizer
