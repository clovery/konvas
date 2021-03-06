import { IPoint } from '../interfaces'
import call, { _call } from '../utils/call'
import Konvas from '../konvas'
import getNodeDOM from '../utils/getNodeDOM'
import EventEmitter from '../utils/eventeimtter'
import getVirtualPoint from './getVirtualPoint'
import boundaryRestrict from '../utils/boundaryRestrict'

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
class Dragger extends (EventEmitter as { new(): any; }) {
  private konvas: Konvas;
  private opts: { onStart: any, onStop: any, onMove: any }
  private active: any
  private dragging: any
  private offsetPoint: any
  private lastVirtualPoint!: IPoint
  private selectors: any
  private selectorHandler: any

  constructor(konvas: Konvas, opts: any) {
    super()
    this.konvas = konvas
    this.opts = opts
    this.initEvent()

    this.selectors = {}
    this.selectorHandler = {}
  }

  private initEvent() {
    this.konvas.el.addEventListener('mousedown', this.onMouseDown, false)
    this.konvas.el.addEventListener('mouseup', this.onMouseUp, false)
    document.documentElement.addEventListener('mousemove', this.onMouseMove, false)
    document.documentElement.addEventListener('mouseup', this.onMouseUp, false)
  }

  public addDragger(selector: string, opts?: any) {
    this.selectors[selector] = opts || {}
  }

  // 获取匹配的拖拽节点
  private getMatchSelector(elem: HTMLElement) {
    const el = getNodeDOM(elem, '[data-type]')
    if (el) {
      const type = el.getAttribute('data-type')
      if (type && this.selectors.hasOwnProperty(type)) {
        this.selectorHandler = this.selectors[type]
        this.selectorHandler.type = el.getAttribute(`data-${type}`)
        this.selectorHandler.el = el
        return el
      }
    }
  }

  private getActive(elem: HTMLElement) {
    const type = elem.getAttribute('data-type')
    let hit = null
    if (type === 'node') {
      hit = this.konvas.getNode(elem.id)
    }
    if (type === 'resizer') {
      hit = this.konvas.resizer
    }
    return hit
  }

  get scale() {
    return this.konvas.getScale()
  }

  private onMouseDown = (e: Event) => {
    // e.preventDefault()
    // e.stopPropagation()

    const evt = e as MouseEvent
    const target = evt.target as HTMLElement

    const el = this.getMatchSelector(target)

    if (el) {
      this.active = this.getActive(el)
      if (isDisableDrag(this.active, 'xy')) {
        return
      }

      const evtPoint = { x: evt.pageX, y: evt.pageY }
      const konvasOffset = getKonvasOffset(this.konvas)
      this.dragging = true

      if (this.active) {
        const offsetPoint = getVirtualPoint(evtPoint, konvasOffset, this.scale, this.active)
        this.offsetPoint = offsetPoint
        this.emit('start', this.active)
        _call(this.selectorHandler, 'onStart', this.active)
      } else {
        const virtualPoint = getVirtualPoint(evtPoint, konvasOffset, this.scale)
        call(this.selectorHandler, 'onStart', { virtualPoint })
      }
    }

    return e
  }

  // 鼠标移动
  private onMouseMove = (evt: MouseEvent) => {
    evt.stopPropagation()
    evt.preventDefault()

    const scale = this.scale
    const evtPoint = { x: evt.pageX, y: evt.pageY }
    const konvasOffset = getKonvasOffset(this.konvas)

    if (this.dragging) {
      if (this.active) {
        let position = getVirtualPoint(evtPoint, konvasOffset, scale, this.offsetPoint)
        position = filterPosition(position, this.active, this.konvas)

        this.lastVirtualPoint = position
        this.emit('move', { ... position }, this.active)
      }

      const konvasPoint = getVirtualPoint(evtPoint, konvasOffset, scale)
      // call(this.selectorHandler, 'onMove', { position: konvasPoint })
      _call(this.selectorHandler, 'onMove', konvasPoint, {
        point: this.lastVirtualPoint,
        item: this.active,
        type: this.selectorHandler.type
      })
    }
  }

  private onMouseUp = () => {
    if (this.dragging && this.active) {
      this.active = null
      this.dragging = false
      if (this.lastVirtualPoint) {
        this.emit('stop', this.lastVirtualPoint)
      }
    }

    if (this.dragging) {
      call(this.selectorHandler, 'onStop')
      this.dragging = false
    }
  }
}

export default Dragger

function getKonvasOffset(konvas: Konvas) {
  return {
    x: konvas.left,
    y: konvas.top
  }
}

function isDisableDrag(item: any, type: string): boolean {
  if (item && 'lockType' in item) {
    return item.lockType === type
  }

  return false
}

function filterPosition(point: IPoint, item: any, konvas: Konvas) {
  const retPosition = boundaryRestrict(point, konvas, item)
  if (isDisableDrag(item, 'x')) { // 锁定 x 轴
    retPosition.x = item.x
  }
  if (isDisableDrag(item, 'y')) { // 锁定 y 轴
    retPosition.y = item.y
  }

  return retPosition
}
