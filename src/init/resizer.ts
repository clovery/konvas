import Konvas from '../konvas'
import Resizer from '../resizer'
import { IPoint } from '../interfaces'
import rotate from '../utils/rotate'
import boundaryRestrict from '../utils/boundaryRestrict'

export default function(konvas: Konvas, options: object) {
  const resizer = new Resizer({
    dragger: konvas.dragger,
    ...options
  })
  konvas.register('resizer', resizer)

  if (konvas.dragger) {
    const { dragger } = konvas

    // 移动
    dragger.addDragger('resizer', {
      onMove(point: IPoint, data: any) {
        if (data.point) {
          const p = data.point
          resizer.move(p.x, p.y)
          konvas.move(p.x, p.y)
        }
      }
    })

    // 调整尺寸
    dragger.addDragger('resizer-cursor', {
      onStart() {
        resizer.start = {
          x: resizer.adjustObject.x,
          y: resizer.adjustObject.y,
          w: resizer.adjustObject.w,
          h: resizer.adjustObject.h
        }
      },

      onMove(point: IPoint, data: any) {
        const position = boundaryRestrict(point, konvas)
        resizer.moveCursor(data.type, position)

        konvas.resize(resizer.w, resizer.h)
        konvas.move(resizer.x, resizer.y)
      }
    })

    // 旋转
    dragger.addDragger('rotate', {
      onMove(point: IPoint) {
        const degree =  rotate(point, resizer.adjustObject)
        resizer.adjustObject.setRotate(degree)
        resizer.setRotate(degree)
      }
    })
  }

}
