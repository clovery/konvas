import Konvas from '../index'
import getNodeDOM from '../utils/getNodeDOM'
import EventEmitter from '../utils/eventeimtter'
import getVirtualPoint, { IPoint } from './getVirtualPoint'

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
  private lastVirtualPoint!: IPoint
  public konvasPoint!: IPoint 
  public activePoint!: IPoint 
  private selectors: any

  constructor(canvas: Konvas, opts: any) {
    this.canvas = canvas
    this.opts = opts
    this.x = 0
    this.y = 0
    this.initEvent()
    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    canvas.el.appendChild(this.el)
    this.selectors = {}

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

  public addSelector(selector: string, opts?: any) {
    this.selectors[selector] = opts 
  }

  private getMatchSelector(elem: HTMLElement) {
    for (const selector in this.selectors) {
      if (selector) {
        const match = getNodeDOM(elem, selector)
        if (match) {
          return match
        }
      }
    }
  }

  private onMouseDown = (e: Event) => {
    const evt = e as MouseEvent
    const target = evt.target as HTMLElement
    const elem = getNodeDOM(target, '[data-type="node"]')
    const resizerNode = getNodeDOM(target, '[data-type="resizer"]')

    const match = this.getMatchSelector(target)

    if (elem) {
      this.active = this.canvas.getNode(elem.id)
    }
    if (resizerNode) {
      this.active = this.canvas.resizer
    }

    if (this.active) {
      this.dragging = true

      const evtPoint = {
        x: evt.pageX,
        y: evt.pageY
      }
      const konvasOffset = getKonvasOffset(this.canvas)
      const scale = this.canvas.getScale()
      const offsetPoint = getVirtualPoint(evtPoint, konvasOffset, scale, this.active)

      this.offsetPoint = offsetPoint

      if (this.active) {
        this.ee.emit('start', this.active.id)
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
    const scale = this.canvas.getScale()
    const evtPoint = { x: evt.pageX, y: evt.pageY }
    const konvasOffset = getKonvasOffset(this.canvas)
    const konvasPoint = getVirtualPoint(evtPoint, konvasOffset, scale)
    const virtual = getVirtualPoint(evtPoint, konvasOffset, scale, this.offsetPoint)
    this.konvasPoint = konvasPoint
    this.activePoint = konvasPoint

    if (this.dragging && this.active) {
      this.el.style.left = `${virtual.x * scale}px`
      this.el.style.top = `${(virtual.y + this.active.h) * scale}px`
      this.el.textContent = `x: ${virtual.x} y: ${virtual.y}`
      this.lastVirtualPoint = virtual
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
      if (this.lastVirtualPoint) {
        this.ee.emit('stop', this.lastVirtualPoint)
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
