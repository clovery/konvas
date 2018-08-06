import { createElem } from '../utils/dom'
import setStyle from '../utils/setStyle'

class Grid {
  private opts: any
  public el: HTMLElement

  constructor(opts: any) {
    this.opts = opts
    this.el = createElem('div')
    this.el.classList.add('grid')

    const yCenterEl = document.createElement('div')

    yCenterEl.style.position = 'absolute'
    yCenterEl.style.height = '100%'
    yCenterEl.style.width = '1px'
    yCenterEl.style.left = '50%'
    yCenterEl.style.marginLeft = '-0.5px'
    yCenterEl.style.background = '#00dcff'

    this.el.appendChild(yCenterEl)

    setStyle(this.el, {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })

    this.opts.wrapper.appendChild(this.el)

    this.inactive()
  }

  public inactive() {
    this.el.style.display = 'none'
  }

  public active() {
    this.el.style.display = 'block'
  }
}

export default Grid
