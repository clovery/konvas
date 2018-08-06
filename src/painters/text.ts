import Image from './image'

export default class Text extends Image {
  public render() {
    const scale = this.node.scale

    this.el.textContent = this.data.content
    this.el.style.fontSize = (this.data.fontSize * scale) + 'px'
  }
}
