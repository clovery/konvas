import { isBool } from './utils'

let uid: number = 1

class Node {
  private el: HTMLElement
  private data: any
  public id: string
  public left: number
  public top: number
  private wrapper!: HTMLElement
  public layout: any
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

    this.isDraggable = false // isBool(data.draggable) ? data.draggable : true

    this.islocked = false
    this.data = { ...data }

    this.left = this.data.x || 0
    this.top = this.data.y || 0

    this.layout = {
      w: data.width,
      h: data.height,
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

  /*
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
  */

  public rotate(deg: number) {
    this.layout.rotate = deg
    const el = this.el as HTMLElement
    el.style.transform = `rotate(${deg}deg)`
    return this
  }

  public setScale(val: number) {
    this.layout.scale = val
    this.render()
  }

  public getScale() {
    return this.layout.scale
  }

  public lock() {
    this.islocked = true
    this.isDraggable = false
  }

  public unlock() {
    this.islocked = false
    this.isDraggable = true
  }

  public move(x: number, y: number) {
    this.layout.x = x
    this.layout.y = y

    const el = this.el as HTMLElement
    const scale = this.layout.scale

    el.style.left = `${ x * scale }px`
    el.style.top = `${ y * scale }px`

    return this
  }

  public resize(w: number, h: number) {
    this.layout.w = w
    this.layout.h = h
    this.el.style.width = w * this.scale + 'px'
    this.el.style.height = h * this.scale + 'px'
  }

  public get(type: string) {
    return this.layout[type]
  }

  public render() {
    const el = this.el as HTMLElement
    const scale = this.layout.scale

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

export default Node
