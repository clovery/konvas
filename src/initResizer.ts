import Konvas from './index'
import Resizer from './resizer/index'

export default function(konvas: Konvas, options: object) {
  const resizer = new Resizer({
    dragger: konvas.dragger,
    ...options
  })

  konvas.resizer = resizer
  konvas.el.appendChild(resizer.el)
}
