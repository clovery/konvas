/**
 * guide lines
 * 
 * |----|----|
 * |    |    |
 * |----|----|
 * |    |    |
 * |----|----|
 */

class GuideLine {
  private container: any
  private vertical: any
  private horizontal: any
  private left: any
  private center: any
  private right: any
  private top: any
  private middle: any
  private bottom: any
  [index: string]: any

  constructor(container: any) {
    this.container = container

    this.vertical = ['top', 'middle', 'bottom']
    this.horizontal = ['left', 'center', 'right']

    this.vertical.forEach((dir: string) => {
      const elem = this.node(dir)
      elem.style.height = '1px'
      elem.style.width = '100%'
    })

    this.horizontal.forEach((dir: string) => {
      const elem = this.node(dir)
      elem.style.height = '100%'
      elem.style.width = '1px'
    })
  }

  public node(dir: string) {
    const elem = document.createElement('div')
    elem.classList.add('guide-line')
    elem.classList.add(`guide-${dir}`)
    elem.style.position = 'absolute'
    elem.style.backgroundColor = 'green'
    elem.style.zIndex = '8888'
    this.container.appendChild(elem)

    this[dir] = elem
    return elem
  }

  public update(coords: any) {
    this.left.style.left = coords.x + 'px'
    this.center.style.left = coords.x + coords.w / 2 + 'px'
    this.right.style.left = coords.x + coords.w + 'px'

    this.top.style.top = coords.y + 'px'
    this.middle.style.top = coords.y + coords.h / 2 + 'px'
    this.bottom.style.top = coords.y + coords.h + 'px'
  }
}

export default GuideLine
