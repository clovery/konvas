import round from './round'

// point 点在画布中的实际位置
// x = e.pageX - konvas.left
// y = e.pageY - konvas.top
export function getKonvasPoint(point: { x: number, y: number }, scale: number) {
  return {
    x: round(point.x / scale),
    y: round(point.y / scale)
  }
}
