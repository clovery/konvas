import { getKonvasPoint } from './point'

export interface IPoint {
  x: number
  y: number
}

export default function(evtPoint: IPoint, konvasOffset: IPoint, scale = 1, offsetPoint = { x: 0, y: 0 }) {
  // 坐标点在画布中的实际位置
  const x = evtPoint.x -  konvasOffset.x
  const y = evtPoint.y - konvasOffset.y

  // 坐标点在画布中的虚拟位置
  const point = getKonvasPoint({ x, y }, scale)

  const virtual = {
    x: point.x - offsetPoint.x,
    y: point.y - offsetPoint.y
  }

  return virtual
}
