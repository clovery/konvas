import { query } from './utils/dom'
import setStyle from './utils/setStyle'
import Painter from './painters'
import Node from './node'

import Dragger from './dragger'
import Resizer from './resizer'

import initGrid from './init/grid'
import initEvent from './init/event'
import initResizer from './init/resizer'
import initDragger from './init/dragger'
import initTooltip from './init/tooltip'

function toString(t: any) {
  return '' + t
}

const defaultOptions = {
  width: 600, height: 300,
  scale: 1,
  resizer: {
    enable: true
  },
  dragger: {
    enable: true,
    boundaryRestrict: true // 限制边界
  }
}

class Konvas {
  public el: Element
  public opts: any
  public nodes: Node[]
  public activeNode: Node | null
  private nodesMap: Map<string, Node>
  public layout: {
    width: number,
    height: number,
    scale: number
  } 
  private renders: any
  public resizer!: Resizer
  public dragger!: Dragger
  [key: string]: any

  constructor(el: Element | string, options = defaultOptions, renders: any) {
    this.el = query(el)
    this.opts = Object.assign({}, defaultOptions, options)
    this.nodes = []

    this.renders = renders
    this.nodesMap = new Map()

    this.activeNode = null

    this.layout = {
      width: this.opts.width,
      height: this.opts.height,
      scale: this.opts.scale
    }

    initDragger(this, this.opts.dragger)

    initResizer(this, { ...this.opts.resizer, scale: this.layout.scale })

    initGrid(this)
    initEvent(this)
    initTooltip(this)
    this.initStyle()
    if (this.opts.nodes) {
      this.opts.nodes.forEach((node: any) => this.addNode(node))
    }

    console.log(`放大系数: ${this.layout.scale}`)
  }

  private initStyle() {
    this.el.classList.add('konvas')
    const elem = (this.el as HTMLElement)
    elem.style.position = 'relative'
    elem.style.transformOrigin = '0 0'

    this.render()
  }

  public render() {
    const elem = (this.el as HTMLElement)
    const width = this.width * this.getScale()
    const height = this.height * this.getScale()

    elem.setAttribute('data-scale', String(this.getScale()))
    elem.style.width = `${width}px`
    elem.style.height = `${height}px`
  }

  public addNode(node: Node | any) {
    if (node instanceof Node) {
      this.nodes.push(node)
    } else {
      node = new Node(node, {
        render: (this.renders && this.renders[node.type]) || Painter.get(node.type),
        scale: this.layout.scale
      })
      this.el.appendChild(node.el)
      this.nodes.push(node)
    }

    this.nodesMap.set(node.id, node)

    return node
  }

  public select(id: string): Node | null {
    id = toString(id)
    return this.nodesMap.get(id) || null
  }

  public getNode(node: Node | string): Node | null {
    if (typeof node === 'string') {
      const filters = this.nodes.filter((item: any) => item.id === node)
      return filters[0]
    }
    return node
  }

  get left() {
    return this.el.getBoundingClientRect().left + document.documentElement.scrollLeft
  }

  get top() {
    return this.el.getBoundingClientRect().top - document.documentElement.scrollTop
  }

  /*
  public scale(num: number) {
    return num ? this.setScale(num) : this.getScale()
  }
  */
  get scale() {
    return this.layout.scale
  }

  public getScale() {
    return this.layout.scale
  }

  public setScale(num: number) {
    this.layout.scale = num
    this.nodes.forEach(node => node.setScale(num))
    this.render()
  }

  get width(): number {
    return this.layout.width
  }

  get w(): number {
    return this.layout.width
  }

  get height(): number {
    return this.layout.height
  }

  get h(): number {
    return this.layout.height
  }

  public toJSON() {
    const nodes = this.nodes.map(node => {
      return node.toJSON()
    })

    return {
      width: this.width,
      height: this.height,
      scale: this.scale,
      nodes
    }
  }

  public setStyle(styles: { string: string }) {
    setStyle(this.el, styles)
  }

  public zoom(num: number) {
    console.log(num)
  }

  public enable(flag: string) {
    console.log(flag)
  }

  public active(node: string) {
    const activeNode  = this.select(node)
    if (activeNode) {
      this.activeNode = activeNode
    }
    return this
  }

  public register(name: string, c: any) {
    this[name] = c
    if (c.el) {
      this.el.appendChild(c.el)
    }
  }

  public lock(node: Node) {
    node.lock()
    this.resizer.inactive()
  }
}

export default Konvas
