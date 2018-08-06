import event from './event'
import extend from './utils/extend'
import layoutSetGet, { ISetGetter } from './utils/layoutSetGet'
import { _call } from './utils/call'

let uid: number = 1

class Node implements ISetGetter {
  private el: HTMLElement
  private data: any
  public id: string
  public left: number
  public top: number
  private wrapper!: HTMLElement
  public layout: any
  private opts: any
  private painter: any
  private lockType: string

  public isDraggable: boolean
  public islocked: boolean
  public get: any
  public set: any
  public klass: string

  constructor(data: any, opts: any) {
    this.el = document.createElement('div')
    this.opts = opts

    this.klass = 'node'
    this.id = String(uid++)
    this.el.id = this.id

    this.el.classList.add('node')
    this.el.setAttribute('data-type', 'node')

    this.isDraggable = false // isBool(data.draggable) ? data.draggable : true
    this.lockType = ''

    this.islocked = false
    this.data = { ...data }

    this.left = this.data.x || 0
    this.top = this.data.y || 0

    this.layout = {
      w: data.width || data.w,
      h: data.height || data.h,
      x: this.left,
      y: this.top,
      rotate: 0,
      scale: this.opts.scale
    }
    
    this.initStyle()
    this.render()
  }

  private initStyle() {
    const el = this.el as HTMLElement
    el.style.position = 'absolute'
  }

  get x(): number {
    return this.layout.x
  }

  get y(): number {
    return this.layout.y
  }

  get w(): number {
    return this.layout.w
  }

  get h(): number {
    return this.layout.h
  }

  get scale() {
    return this.layout.scale
  }

  get rotate() {
    return this.layout.rotate
  }

  public setRotate(deg: number) {
    this.set('rotate', deg)
    this.el.style.transform = `rotate(${deg}deg)`
    return this
  }

  public setScale(val: number) {
    this.set('scale', val)
    this.render()
  }

  public lock(type = 'xy') {
    this.islocked = true
    this.isDraggable = false
    this.lockType = type
  }

  public unlock() {
    this.islocked = false
    this.isDraggable = true
    this.lockType = ''
  }

  get unlocked(): boolean {
    return !this.islocked
  }

  public move(x: number, y: number) {
    this.set({ x, y })

    const scale = this.get('scale')

    this.el.style.left = `${ x * scale }px`
    this.el.style.top = `${ y * scale }px`

    return this
  }

  public resize(w: number, h: number) {
    this.set({ w, h })
    const width = w * this.scale
    const height = h * this.scale

    this.el.style.width = `${width}px`
    this.el.style.height = `${height}px`

    _call(this.painter, 'resize', { width, height })
  }

  public render() {
    const el = this.el
    const scale = this.scale

    const x = this.x * scale
    const y = this.y * scale
    const width = this.w * scale
    const height = this.h * scale

    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.width = `${width}px`
    el.style.height = `${height}px`

    if (this.painter) {
      this.painter.paint({ x, y, w: width, h: height })
    } else {
      if (this.opts.render) {
        const painter = new this.opts.render(this, this.data)
        this.painter = painter
        this.painter.paint({ x, y, w: width, h: height })
        this.wrap(this.painter.el)
      }
    }
    this.left = x
    this.top = y
    console.log(`节点在画布中的位置 x: ${this.left}, y: ${this.top}`)
  }

  public wrap(el: HTMLElement) {
    if (this.wrapper) {
      // noop
    } else {
      this.el.appendChild(el)
      this.wrapper = el
    }
  }

  public toJSON() {
    return this.layout
  }
}

extend(Node.prototype, layoutSetGet)

export default Node
