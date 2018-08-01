import extend from '../utils/extend'
import Resizer from './index'
import parent from '../utils/parent'

export default function(resizer: Resizer) {
  extend(resizer, {
    initEvent() {
      this.el.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }, false)

      this.el.addEventListener('mousedown', this.handleMouseDown.bind(this), false)
      document.documentElement.addEventListener('mousemove', this.handleMove.bind(this), false)
      document.documentElement.addEventListener('mouseup', this.handleDocMouseDown.bind(this), false)
    },

    handleMove(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      const mouse = this.dragger.mouse
      if (mouse && this.dragging && this.startPoint) {
        let { x, y } = mouse

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
    },

    handleMouseDown(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      const elem = parent(e.target as HTMLElement, '.cursor')

      if (elem) {
        this.direction = elem.dataset.type
        this.start = {
          w: this.w,
          h: this.h,
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
    },

    handleDocMouseDown(e: MouseEvent) {
      if (this.dragging) {
        this.dragging = false
        this.direction = false

        if (this.onEnd) {
          this.onEnd({
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
          })
        }
      }
      e.preventDefault()
      e.stopPropagation()
    }
  })

  resizer.initEvent()
}
