import Konvas from './index'
import getNodeDOM from './utils/getNodeDOM'
import extend from './utils/extend'

export default function initEvent(konvas: Konvas) {
  extend(konvas, {
    selectNode(id: string) {
      const node = this.getNode(id)
      if (node) {
        this.activeNode = node
        this.node = node
      }

      if (this.resizer) {
        this.resizer.active(this.activeNode)
      }
    }
  })

  konvas.el.addEventListener('click', (evt: Event) => {
    const target = evt.target as HTMLElement
    const el = getNodeDOM(target)
    if (el) {
      konvas.selectNode(el.id)
    }
  }, false)
}
