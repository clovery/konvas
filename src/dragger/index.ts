import Canvas from '../index'
import isOut from './isOut'

/**
 * Dragger
 */
class Dragger {
  private canvas: Canvas
  private opts: { onStart: any, onStop: any, onMove: any }
  private active: any
  private dragging: any
  private mouse: any
  private startPoint: any
  private x: number | null
  private y: number | null

  constructor(canvas: Canvas, opts: any) {
    this.canvas = canvas
    this.opts = opts
    this.x = 0
    this.y = 0
    this.initEvent()
  }

  private initEvent() {
    this.canvas.el.addEventListener('mousedown', this.onMouseDown, false)
    this.canvas.el.addEventListener('mouseup', this.onMouseUp, false)
    // this.canvas.elem.addEventListener('mouseleave', this.onMouseUp, false)

    document.documentElement.addEventListener('mousemove', this.onMouseMove, false)
    document.documentElement.addEventListener('mouseup', this.onMouseUp, false)
  }

  private onMouseDown = (e: Event) => {
    const { target } = e
    const targetElem = target as HTMLElement

    if (targetElem.classList.contains('draggable')) {
      this.active = this.canvas.getNode(targetElem.id)

      this.dragging = true

      if (this.mouse && this.active) {
        this.startPoint = {
          x: this.mouse.x - this.active.x,
          y: this.mouse.y - this.active.y
        }
      }
      this.opts.onStart(targetElem.id)
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    let x = e.pageX - this.canvas.left
    let y = e.pageY - this.canvas.top

    x = x / this.canvas.scale
    y = y / this.canvas.scale

    this.mouse = { x, y }

    if (this.dragging && this.active) {
      x = x - this.startPoint.x
      const xStr = String(Math.round(x))
      const yStr = String(Math.round(y - this.startPoint.y))
      x = parseInt(xStr, 10)
      y = parseInt(yStr, 10)

      const isout = isOut(x, y, this.canvas, this.active)
      if (isout.x >= 0 || isout.y >= 0) {
        x = isout.x
        y = isout.y
      }
      this.opts.onMove(this.active.id, { x, y })
      this.x = x
      this.y = y
    }
  }

  private onMouseUp = () => {
    if (this.dragging && this.active) {

      this.dragging = false

      const { id } = this.active

      if (id) {
        if (typeof this.x !== 'undefined'
          && typeof this.y !== 'undefined') {
          this.opts.onStop(id, { x: this.x, y: this.y })
        }

        this.x = null
        this.y = null
        this.active = null
      }
    }
  }
}

export default Dragger
