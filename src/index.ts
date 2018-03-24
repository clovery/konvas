import { query } from './utils/dom'
import Node from './node'

/*
interface IOptions {
  width?: number;
  height?: number;
}
*/

class Konvas {
  public elem: Element
  private options: any
  private nodes: Node[]

  constructor(el: Element | string, options = { width: 300, height: 150 } ) {
    this.elem = query(el)
    this.options = options
    this.nodes = []
    this.initStyle()
  }

  private initStyle() {
    this.elem.classList.add('konvas')
    const elem = (this.elem as HTMLElement)
    elem.style.position = 'relative'
    elem.style.transformOrigin = '0 0'
    elem.style.width = `${this.options.width}px`
    elem.style.height = `${this.options.height}px`
  }

  public addNode(node: Node | any) {
    if (node instanceof Node) {
      this.nodes.push(node)
    } else {
      node = new Node(node)
      this.elem.appendChild(node.el)
      this.nodes.push(node)
    }
  }
}

export default Konvas
