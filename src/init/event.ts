import Konvas from '../konvas'
import getNodeDOM from '../utils/getNodeDOM'
import extend from '../utils/extend'
import event from '../event'

export default function initEvent(konvas: Konvas) {
  extend(konvas, {
    selectNode(id: string) {
      const node = this.getNode(id)

      this.resizer.adjustObject = null
      if (node && node.unlocked) {
        this.liveNode = node

        if (this.resizer) {
          this.resizer.active(this.liveNode)
        }
      }
    }
  })

  const selectNodeHandler = (evt: Event) => {
    const target = evt.target as HTMLElement
    const el = getNodeDOM(target, '[data-type="node"]')
    if (el) {
      konvas.selectNode(el.id)
    } else {
      // @todo
      // konvas.resizer.inactive()
    }
  }

  konvas.el.addEventListener('click', selectNodeHandler, false)
  konvas.el.addEventListener('mouseDown', selectNodeHandler, false)

  extend(konvas, event)
}
