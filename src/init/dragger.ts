import Konvas from '../konvas'
import Dragger from '../dragger'
import extend from '../utils/extend'

export default function(konvas: Konvas, options: object) {
  const dragger = new Dragger(konvas, options)
  konvas.register('dragger', dragger)
  dragger.addDragger('node')

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

  // align: left, center, right
  // vertical: top, middle, bottom
  extend(konvas, {
    align(dir: string) {
      if (this.activeNode) {
        if (dir === 'left') {
          this.activeNode.move(0, this.activeNode.y)
        }
        if (dir === 'center') {
          this.activeNode.move(this.w / 2 - (this.activeNode.w / 2), this.activeNode.y)
        }
        if (dir === 'right') {
          this.activeNode.move(this.w - this.activeNode.w, this.activeNode.y)
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
          this.activeNode.move(node.x, this.h / 2 - (node.h / 2))
        }
        if (dir === 'bottom') {
          this.activeNode.move(node.x, this.h - node.h)
        }
      }
      return this
    }
  })
}
