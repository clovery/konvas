import Konvas from './index'
import Resizer from './resizer/index'
import { IPoint } from './dragger/getVirtualPoint';

export default function(konvas: Konvas, options: object) {
  const resizer = new Resizer({
    dragger: konvas.dragger,
    ...options
  })

  if (konvas.dragger) {
    const { dragger } = konvas

    dragger.on('move', (data: any) => {
      resizer.hide()
    })

    // 拖拽停止
    dragger.on('stop', (point: IPoint) => {
      resizer.move(point.x, point.y).show()
    })
  }

  konvas.resizer = resizer
  konvas.el.appendChild(resizer.el)
}
