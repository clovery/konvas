import { isBool } from './utils/index'

let uid: number = 1

/**
 *
 */
class Node {
  private el: Element
  private data: any
  public id: string
  public x: number
  public y: number
  private wrapper!: HTMLElement
  public layout: Map<string, any>
  private opts: any
  private painter: any

  public isDraggable: boolean
  public islocked: boolean

  constructor(data: any, opts: any) {
    this.el = document.createElement('div')
    this.opts = opts

    this.id = String(uid++)
    this.el.id = this.id

    this.el.classList.add('node')
    this.el.setAttribute('data-type', 'node')

    this.isDraggable = isBool(data.draggable) ? data.draggable : true

    this.islocked = false
    this.data = { ...data }

    this.x = this.data.x || 0
    this.y = this.data.y || 0

    this.layout = new Map()
    this.layout.set('x', this.x)
    this.layout.set('y', this.y)
    this.layout.set('rotate', 0)
    this.layout.set('scale', this.opts.scale)
    
    this.initStyle()
    this.render()
  }

  private initStyle() {
    const el = this.el as HTMLElement
    el.style.position = 'absolute'
  }

  /*
  get x(): number {
    return 0
  }

  get y(): number {
    return 0
  }
  */

  get width() {
    return this.data.width || this.data.w
  }

  set width(val) {
    this.data.width = val
  }

  get height() {
    return this.data.height || this.data.h
  }

  set height(val: number) {
    this.data.height = val
  }

  public rotate(deg: number) {
    this.layout.set('rotate', deg)
    const el = this.el as HTMLElement
    el.style.transform = `rotate(${deg}deg)`
    return this
  }

  public scale(val: number) {
    this.layout.set('scale', val)
    this.render()
  }

  public getScale() {
    return this.layout.get('scale')
  }

  /*
  get scale() {
    return this.data.scale || 1
  }

  set scale(val) {
    this.data.scale = val
    this.render()
  }
  */
  /*
  set rotate(deg: number) {
    this.layout.rotate = deg
    const el = this.el as HTMLElement
    el.style.transform = `rotate(${deg}deg)`
  }

  get rotate() {
    return this.layout.rotate
  }
  */

  public lock() {
    this.islocked = true
    this.isDraggable = false
  }

  public unlock() {
    this.islocked = false
    this.isDraggable = true
  }

  public move(x: number, y: number) {
    this.x = x
    this.y = y

    const el = this.el as HTMLElement
    el.style.left = `${x}px`
    el.style.top = `${y}px`

    const scale = this.layout.get('scale')
    this.layout.set('x', this.x / scale)
    this.layout.set('y', this.y / scale)

    return this
  }

  public get(type: string) {
    return this.layout.get(type)
  }

  public render() {
    const el = this.el as HTMLElement
    const scale = this.layout.get('scale')

    const x = this.layout.get('x') * scale
    const y = this.layout.get('y') * scale
    const width = this.width * scale
    const height = this.height * scale

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
    this.x = x
    this.y = y
    console.log(`节点在画布中的位置 x: ${this.x}, y: ${this.y}`)
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
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      scale: this.scale
    }
  }
}

export default Node
