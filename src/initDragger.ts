import Dragger from './dragger/index'
import extend from './utils/extend'
import Konvas from './index'

export default function(konvas: Konvas, options: object) {
  const dragger = new Dragger(konvas, options)
  konvas.dragger = dragger

  dragger.on('start', (id: string) => {
    const node = konvas.getNode(id)
    if (node) {
      konvas.activeNode = node
    }
  })

  dragger.on('move', (data: any) => {
    if (konvas.activeNode) {
      konvas.activeNode.move(data.x, data.y)
    }
  })

  dragger.addSelector('[data-type="resizer-cursor"]')
  dragger.addSelector('[data-type="node"]', {
    onBeforeStart() {
      console.log(0)
    }
  })
  dragger.addSelector('[data-type="resizer"]')

  // align: left, center, right
  // vertical: top, middle, bottom

  // node 需要知道画布的大小
  // node.align('left').vertical('top')
  // Konvas.active('node').align('left').vertical('top')

  extend(konvas, {
    align(dir: string) {
      if (this.activeNode) {
        if (dir === 'left') {
          this.activeNode.move(0, this.activeNode.y)
        }
        if (dir === 'center') {
          this.activeNode.move(this.layout.width / 2 - (this.activeNode.w / 2), this.activeNode.y)
        }
        if (dir === 'right') {
          this.activeNode.move(this.layout.width - this.activeNode.w, this.activeNode.y)
        }
      }
      return this
    },

    vertical(dir: string) {
      if (this.activeNode) {
        const node = this.activeNode
        if (dir === 'top') {
          this.activeNode.move(node.x, 0)
        }
        if (dir === 'middle') {
          this.activeNode.move(node.x, this.layout.height / 2 - (node.h / 2))
        }
        if (dir === 'bottom') {
          this.activeNode.move(node.x, this.layout.height - node.h)
        }
      }
      return this
    }
  })
}
