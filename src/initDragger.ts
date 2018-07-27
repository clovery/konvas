import Dragger from './dragger/index'
import Konvas from './index'

export default function(konvas: Konvas) {
  konvas.dragger = new Dragger(konvas, {
    onStart: (id: string) => {
      const node = konvas.getNode(id)
      if (node) {
        konvas.activeNode = node
      }
      // this.resizeable.hide()
    },
    onMove: (data: any) => {
      if (konvas.activeNode) {
        konvas.activeNode.move(data.x, data.y)
      }
    }
  })
}
