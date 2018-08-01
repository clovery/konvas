import Konvas from './index'
import Grid from './grid/index'

export default function initGrid(konvas: Konvas) {
  const grid = new Grid({
    wrapper: konvas.el
  })
  konvas.grid = grid
  // konvas.addListener(grid)
}
