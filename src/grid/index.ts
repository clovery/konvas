class Grid {
  private opts: any

  constructor(opts: any) {
    this.opts = opts

    const yCenterEl = document.createElement('div')

    yCenterEl.style.position = 'absolute'
    yCenterEl.style.height = '100%'
    yCenterEl.style.width = '1px'
    yCenterEl.style.left = '50%'
    yCenterEl.style.marginLeft = '-0.5px'
    yCenterEl.style.background = '#000'

    this.opts.wrapper.appendChild(yCenterEl)
  }
}

export default Grid
