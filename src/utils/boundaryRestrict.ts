import { IPosition, ISize } from '../interfaces'

export default function(point: IPosition, konvas: any, item: ISize = { w: 0, h: 0 }): { x: number, y: number } {
  const { x, y } = point
  const { width, height } = konvas

  let newX = x 
  let newY = y
  if (x <= 0) {
    newX = 0
  }

  if (y <= 0) {
    newY = 0
  }

  if (x + item.w >= width) {
    newX = (width - item.w)
  }

  if (y + item.h >= height) {
    newY = (height - item.h)
  }

  return {
    x: newX,
    y: newY
  }
  /*
  return {
    x: newX >= 0 ? newX : -1,
    y: newY >= 0 ? newY : -1
  }
  */
}
