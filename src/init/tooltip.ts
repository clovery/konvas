import Tooltip from '../tooltip'
import Konvas from '../konvas'

export default function(konvas: Konvas) {
  const tooltip = new Tooltip()
  konvas.register('tooltip', tooltip)

  if (konvas.dragger) {
    const { dragger } = konvas
    dragger.on('start', () => tooltip.active())
    dragger.on('stop', () => tooltip.inactive())

    dragger.on('move', (point: any, item: any) => {
      const x = point.x
      const y = point.y

      tooltip.active({ x, y, w: item.w, h: item.h, scale: item.scale })
    })
  }

  if (konvas.resizer) {
    konvas.resizer.on('resize', (item: any) => tooltip.active(item))
  }
}
