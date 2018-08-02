import Konvas from '../konvas'
import getNodeDOM from '../utils/getNodeDOM'
import extend from '../utils/extend'

export default function initEvent(konvas: Konvas) {
  extend(konvas, {
    selectNode(id: string) {
      const node = this.getNode(id)

      if (node) {
        this.activeNode = node
        this.node = node
      }

      if (this.resizer) {
        this.resizer.setAdjustObject(this.activeNode).active()
      }
    }
  })

  const selectNodeHandler = (evt: Event) => {
    const target = evt.target as HTMLElement
    const el = getNodeDOM(target, '[data-type="node"]')
    if (el) {
      konvas.selectNode(el.id)
    }
  }

  konvas.el.addEventListener('click', selectNodeHandler, false)
  konvas.el.addEventListener('mouseDown', selectNodeHandler, false)
}
