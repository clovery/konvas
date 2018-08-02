import Konvas from '../konvas'
import Resizer from '../resizer'
import { IPosition } from '../interfaces'
import boundaryRestrict from '../utils/boundaryRestrict'

export default function(konvas: Konvas, options: object) {
  const resizer = new Resizer({
    dragger: konvas.dragger,
    ...options
  })

  if (konvas.dragger) {
    const { dragger } = konvas

    dragger.on('move', (data: any) => {
      resizer.inactive()
    })

    // 拖拽停止
    dragger.on('stop', (p: IPosition) => {
      resizer.move(p.x, p.y).active()
    })

    dragger.addSelector('resizer')
    dragger.addSelector('resizer-cursor', {
      onStart() {
        resizer.start = {
          x: resizer.adjustObject.x,
          y: resizer.adjustObject.y,
          w: resizer.adjustObject.w,
          h: resizer.adjustObject.h
        }
      },

      onMove(data: any, type: string) {
        const position = boundaryRestrict(data.position, konvas)
        resizer.moveCursor(type, position)
      }
    })
  }

  konvas.register('resizer', resizer)
}
