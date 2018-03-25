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

  constructor(data: any) {
    this.el = document.createElement('div')

    this.id = String(uid++)
    this.el.id = this.id

    this.el.classList.add('node')
    this.el.classList.add('draggable')

    this.data = { ...data }

    this.x = this.data.x || 0
    this.y = this.data.y || 0

    this.initStyle()
    this.draw()
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
    return this.data.width
  }

  set width(val) {
    this.data.width = val
  }

  get height() {
    return this.data.height
  }

  set height(val) {
    this.data.height = val
  }

  get scale() {
    return this.data.scale || 1
  }

  set scale(val) {
    this.data.scale = val
    this.draw()
  }

  public move(x: number, y: number) {
    this.x = x
    this.y = y
    const el = this.el as HTMLElement
    el.style.left = `${x}px`
    el.style.top = `${y}px`
  }

  public draw() {
    const el = this.el as HTMLElement

    el.style.width = `${ this.width * this.scale }px`
    el.style.height = `${ this.height * this.scale }px`
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
