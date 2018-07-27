import Konvas from './index'
import Resizer from './resizer/index'

export default function(konvas: Konvas) {
  const resizer = new Resizer({
    dragger: konvas.dragger
  })
  konvas.resizer = resizer
  konvas.el.appendChild(resizer.el)
}
