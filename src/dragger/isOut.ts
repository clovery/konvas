export default function isOut(x: number, y: number, container: any, node: any): { x: number, y: number } {
  let newX = x 
  let newY = y
  if (x <= 0) {
    newX = 0
  }

  if (y <= 0) {
    newY = 0
  }

  if (x + node.width >= container.width) {
    newX = (container.width - node.width) * container.getScale()
  }

  if (y + node.height >= container.height) {
    newY = (container.height - node.height) * container.getScale()
  }

  return {
    x: newX >= 0 ? newX : -1,
    y: newY >= 0 ? newY : -1
  }
}
