import Konvas from '../index'
import getNodeDOM from '../utils/getNodeDOM'
import EventEmitter from '../utils/eventeimtter'
import getVirtualPoint from './getVirtualPoint'

/**
 * 坐标点以画布中的虚拟坐标点为准
 * 画布中坐标点计算方式
 * x: (e.pageX - konvas.left) / scale
 * y: (e.pageY - konvas.top) / scale
 * 
 * 点击拖拽节点，获取点击位置相对节点边界的距离
 * offsetX: x - node.x
 * offsetY: y - node.y
 */

/**
 * Dragger
 */
class Dragger  {
  private canvas: Konvas
  private opts: { onStart: any, onStop: any, onMove: any }
  private active: any
  private dragging: any
  public mouse: any
  private offsetPoint: any
  private x: number | null
  private y: number | null
  public el: HTMLElement
  private ee: any

  constructor(canvas: Konvas, opts: any) {
    this.canvas = canvas
    this.opts = opts
    this.x = 0
    this.y = 0
    this.initEvent()
    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    canvas.el.appendChild(this.el)

    this.el.style.zIndex = '2222'
    this.el.style.background = '#687d6e'
    this.el.style.minWidth = '120px'
    this.ee = new EventEmitter()
  }

  private initEvent() {
    this.canvas.el.addEventListener('mousedown', this.onMouseDown, false)
    this.canvas.el.addEventListener('mouseup', this.onMouseUp, false)
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

      const evtPoint = {
        x: evt.pageX,
        y: evt.pageY
      }
      const konvasOffset = getKonvasOffset(this.canvas)
      const scale = this.canvas.getScale()
      const offsetPoint = getVirtualPoint(evtPoint, konvasOffset, scale, this.active)

      this.offsetPoint = offsetPoint

      if (targetElem) {
        this.ee.emit('start', targetElem.id)
      }
    }

    return e
  }

  private onMouseMove = (evt: MouseEvent) => {
    if (evt.stopPropagation) {
      evt.stopPropagation()
    }
    if (evt.preventDefault) {
      evt.preventDefault()
    }

    if (this.dragging && this.active) {
      const scale = this.canvas.getScale()
      const evtPoint = { x: evt.pageX, y: evt.pageY }
      const konvasOffset = getKonvasOffset(this.canvas)
      const virtual = getVirtualPoint(evtPoint, konvasOffset, scale, this.offsetPoint)

      this.el.style.left = `${virtual.x * scale}px`
      this.el.style.top = `${(virtual.y + this.active.h) * scale}px`
      this.el.textContent = `x: ${virtual.x} y: ${virtual.y}`

      this.ee.emit('move', { ...virtual })
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

  public on(name: string, fn: any) {
    this.ee.on(name, fn)
  }
}

export default Dragger

function getKonvasOffset(konvas: Konvas) {
  return {
    x: konvas.left,
    y: konvas.top
  }
}
