import { IPosition, IPoint } from '../interfaces'
import round from './round'

// https://stackoverflow.com/questions/15653801/rotating-object-to-face-mouse-pointer-on-mousemove
// Math.atan2(e.pageX - center.x, - (e.pageY - center.y)) * ( 180 / Math.PI)
export default function(p: IPosition, item: any) {
  const centerX = item.x + item.w / 2
  const centerY  = item.y + item.h / 2
  const radians = Math.atan2(p.x - centerX, p.y - centerY)
  const degree = (radians * (180 / Math.PI) * -1)

  const angle = (radians * (180 / Math.PI))
  getPoints(item, angle)
  return degree
}

function getPoints(item: any, angle: number) {
  const center = getCenterPosition(item)

  const lt = rotatePoint(item, {
    x: item.x + item.w / 2,
    y: item.y + item.h / 2
  }, angle)

  const rt = rotatePoint({
    x: item.x + item.w,
    y: item.y
  }, center, angle)

  const rb = rotatePoint({
    x: item.x + item.w,
    y: item.y + item.h
  }, center, angle)

  const lb = rotatePoint({
    x: item.x,
    y: item.y + item.h
  }, center, angle)

  console.log(lt, rt, rb, lb)
}

function getCenterPosition(item: any) {
  const centerX = item.x + item.w / 2
  const centerY  = item.y + item.h / 2
  return {
    x: centerX,
    y: centerY
  }
}

// 根据原始点，中心点，旋转角度，获取新的点
// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
function rotatePoint(point: IPoint, center: IPoint, angle: number) {
  const { x, y } = point
  const { x : cx, y: cy } = center

  const radians = (Math.PI / 180) * angle
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  let nx = (cos * (x - cx)) + (sin * (y - cy)) + cx
  let ny = (cos * (y - cy)) - (sin * (x - cx)) + cy

  nx = round(nx)
  ny = round(ny)

  return { x: nx, y: ny }
}

// 点，旋转，获取原始点
function getOriginalPoint(point: IPoint, angle: number) {
  console.log(point, angle)
}
