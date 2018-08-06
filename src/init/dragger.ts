import Konvas from '../konvas'
import Dragger from '../dragger'
import extend from '../utils/extend'
import { IPoint } from '../interfaces'

export default function(konvas: Konvas, options: object) {
  const dragger = new Dragger(konvas, options)
  konvas.register('dragger', dragger)

  // 拖拽节点
  dragger.addDragger('node', {
    onStart(node: any) {
      konvas.setLiveNode(node)
    },

    onMove(point: IPoint, data: any) {
      konvas.move(data.point.x, data.point.y)
    }
  })

  // align: left, center, right
  // vertical: top, middle, bottom
  extend(konvas, {
    align(dir: string) {
      if (this.liveNode) {
        if (dir === 'left') {
          this.liveNode.move(0, this.liveNode.y)
        }
        if (dir === 'center') {
          this.liveNode.move(this.w / 2 - (this.liveNode.w / 2), this.liveNode.y)
        }
        if (dir === 'right') {
          this.liveNode.move(this.w - this.liveNode.w, this.liveNode.y)
        }
      }
      return this
    },

    vertical(dir: string) {
      if (this.liveNode) {
        const node = this.liveNode
        if (dir === 'top') {
          this.liveNode.move(node.x, 0)
        }
        if (dir === 'middle') {
          this.liveNode.move(node.x, this.h / 2 - (node.h / 2))
        }
        if (dir === 'bottom') {
          this.liveNode.move(node.x, this.h - node.h)
        }
      }
      return this
    }
  })
}
