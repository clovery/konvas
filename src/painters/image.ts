export default class Image {
  public el: HTMLElement
  public data: any;
  public node: any;
  public type: string;

  constructor(node: any, data: any) {
    this.el = document.createElement('div')

    this.node = node
    this.data = data

    this.type = this.data.type
    this.render()
    return this
  }

  public render(opts: any = {}) {
    this.el.style.backgroundImage = 'url(' + this.data.content + ')'
    this.el.style.backgroundSize = 'cover'
    this.el.style.backgroundRepeat = 'no-repeat'
    this.el.style.width = (opts.w || this.node.width) + 'px'
    this.el.style.height = (opts.h || this.node.height) + 'px'
  }

  public paint(opts: any) {
    this.render(opts)
  }
}
