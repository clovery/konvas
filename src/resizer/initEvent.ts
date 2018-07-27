import extend from '../utils/extend'
import Resizer from './index'

export default function(resizer: Resizer) {
  extend(resizer, {
    initEvent() {
      this.el.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }, false)

      this.el.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const elem = e.target as HTMLElement

        if (elem.classList.contains('cursor')) {
          this.direction = elem.dataset.type
          this.start = {
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y
          }

        }

        const mouse = this.dragger.mouse

        this.startPoint = {
          x: mouse.x - this.x,
          y: mouse.y - this.y
        }
        this.dragging = true

      }, false)

      document.documentElement.addEventListener('mousemove', this.handleMove.bind(this), false)

      document.documentElement.addEventListener('mouseup', (e) => {
        if (this.dragging) {
          this.dragging = false
          this.direction = false

          if (this.onEnd) {
            this.onEnd({
              x: this.x,
              y: this.y,
              width: this.width,
              height: this.height
            })
          }
        }
        e.preventDefault()
        e.stopPropagation()
      }, false)
    },

    handleMove(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()
      const mouse = this.dragger.mouse
      let {x, y} = mouse

      if (this.dragging && this.startPoint) {

        if (this.direction) {
          this.setCursor(this.direction, x, y)
        } else {
          x = parseInt(String(Math.round(x - this.startPoint.x)), 10)
          y = parseInt(String(Math.round(y - this.startPoint.y)), 10)
          this.move(x, y)
          if (this.onMove) {
            this.onMove(x, y)
          }
        }
      }
    }
  })
}
