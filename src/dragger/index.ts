import Canvas from '../index'
// import isOut from './isOut'
import getNodeDOM from '../utils/getNodeDOM'

/**
 * Dragger
 */
class Dragger {
  private canvas: Canvas
  private opts: { onStart: any, onStop: any, onMove: any }
  private active: any
  private dragging: any
  public mouse: any
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
    const evt = e as MouseEvent
    const { target } = e
    const targetElem = target as (HTMLElement | null)
    let elem = targetElem

    if (targetElem && !targetElem.id) {
      elem = getNodeDOM(targetElem)
    }

    if (elem) {
      this.active = this.canvas.getNode(elem.id)
    }

    if (this.active && this.active.isDraggable) {
      this.dragging = true

      // 获取节点拖拽开始时，鼠标位置与节点边界的偏移值
      const { pageX, pageY } = evt
      const canvasX = this.canvas.left
      const canvasY = this.canvas.top
      const nodeX = this.active.x
      const nodeY = this.active.y

      const offsetX = pageX - canvasX - nodeX
      const offsetY = pageY - canvasY - nodeY

      this.startPoint = { x: offsetX, y: offsetY }

      if (this.opts.onStart && targetElem) {
        this.opts.onStart(targetElem.id)
      }
    }

    return e
  }

  private onMouseMove = (e: MouseEvent) => {
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    if (e.preventDefault) {
      e.preventDefault()
    }

    let x = e.pageX - this.canvas.left
    let y = e.pageY - this.canvas.top
    // const scale = this.canvas.getScale()

    const { pageX, pageY } = e
    const canvasX = this.canvas.left
    const canvasY = this.canvas.top
    // 鼠标在画布中的位置
    // pageX - canvasX
    // pageY - canvasY
    // 画布中鼠标位置
    const mouseX = pageX - canvasX
    const mouseY = pageY - canvasY

    this.mouse = { x: mouseX, y: mouseY }

    if (this.dragging && this.active) {
      x = x - this.startPoint.x
      y = y - this.startPoint.y
      x = parseInt(String(Math.round(x)), 10)
      y = parseInt(String(Math.round(y)), 10)

      /*
      const isout = isOut(x, y, this.canvas, this.active)
      if (isout.x >= 0 || isout.y >= 0) {
        x = isout.x
        y = isout.y
      }
      */

      this.opts.onMove({ x, y }, this.active.id)
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
          if (this.opts.onStop) {
            this.opts.onStop(id, { x: this.x, y: this.y })
          }
        }

        this.x = null
        this.y = null
        this.active = null
      }
    }
  }
}

export default Dragger
