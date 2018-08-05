import setStyle from '../utils/setStyle'
import { createElem } from '../utils/dom'

import Resizer from '.'

export default function(resizer: Resizer) {
  const rotate = createElem('div')
  rotate.setAttribute('data-type', 'rotate')
  setStyle(rotate, {
    position: 'absolute',
    top: '-1rem',
    left: '-1rem',
    width: '6px',
    height: '6px',
    border: '1px solid #616097',
    borderRadius: '100px'
  })
  resizer.el.appendChild(rotate)
}
