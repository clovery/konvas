import { query } from './utils/dom'
import Dragger from './dragger'
import Node from './node'

/*
interface IOptions {
  width?: number;
  height?: number;
}
*/

class Konvas {
  public el: Element
  private options: any
  private dragger: Dragger
  public nodes: Node[]
  public activeNode: Node
  public layout: {
    width: number,
    height: number,
    scale: number
  } 

  constructor(el: Element | string, options = { width: 600, height: 300, scale: 1 } ) {
    this.el = query(el)
    this.options = options
    this.nodes = []

    this.layout = {
      width: options.width,
      height: options.height,
      scale: options.scale || 1
    }

    /*
    Object.defineProperty(this, 'scale', {
      set(val: number) {
        this.layout.scale = val
      },
      get(): any {
        return this.layout.scale
      }
    }) */

    this.dragger = new Dragger(this, {
      onStart: (id: string) => {
        const node = this.getNode(id)
        if (node) {
          this.activeNode = node
        }
        // this.resizeable.hide()
      },
      onMove: (id: string, { x, y }) => {
        this.activeNode.move(x, y)
      },
      onStop: (id: string) => {
        // console.log(id)
        // this.emit('drag.end', id, { x, y })
        // this.resizeable.move(x, y)
      }
    })
    this.initStyle()
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
    const width = this.width * this.scale
    const height = this.height * this.scale

    elem.setAttribute('data-scale', String(this.scale))
    elem.style.width = `${width}px`
    elem.style.height = `${height}px`
  }

  public addNode(node: Node | any) {
    if (node instanceof Node) {
      this.nodes.push(node)
    } else {
      node = new Node(node)
      this.el.appendChild(node.el)
      this.nodes.push(node)
    }
    return node
  }

  public getNode(node: Node | string): Node | null {
    if (typeof node === 'string') {
      const filters = this.nodes.filter((item: any) => item.id === node)
      return filters[0]
    }
    return node
  }

  get left() {
    return this.el.getBoundingClientRect().left
  }

  get top() {
    return this.el.getBoundingClientRect().top
  }

  get scale() {
    return this.layout.scale
  }

  set scale(val: number) {
    this.layout.scale = val
    this.nodes.forEach(node => node.scale = val)

    this.render()
  }

  get width(): number {
    return this.layout.width
  }

  get height(): number {
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
}

function setStyle(el: Element, style: any) {
  const elem = el as HTMLElement
  if (style) {
    const styles = []
    for (const key in style) {
      if (key) {
        styles.push(`${key}: ${style[key]};`)
      }
    }
    elem.setAttribute('style', styles.join(';'))
  }
}

export default Konvas
