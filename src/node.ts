/**
 *
 */
class Node {
  private el: Element
  private data: any

  constructor(data: any) {
    this.el = document.createElement('div')

    this.el.classList.add('draggable')
    this.data = { ...data }

    this.initStyle()
    this.draw()
  }

  private initStyle() {
    const el = this.el as HTMLElement
    el.style.position = 'absolute'
  }

  get x(): number {
    return 0
  }

  get y(): number {
    return 0
  }

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

  public draw() {
    const el = this.el as HTMLElement

    el.style.width = `${ this.width * this.scale }px`
    el.style.height = `${ this.height * this.scale }px`
  }
}

export default Node
