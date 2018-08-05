import Konvas from '../konvas'
import Resizer from '../resizer'
import { IPosition } from '../interfaces'
import rotate from '../utils/rotate'
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
    dragger.on('stop', () => {
      resizer.active(konvas.liveNode)
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

    dragger.addDragger('rotate', {
      onMove(data: any) {
        const degree =  rotate(data.position, resizer.adjustObject)
        resizer.adjustObject.setRotate(degree)
        resizer.setRotate(degree)
      }
    })
  }

  konvas.register('resizer', resizer)
}
