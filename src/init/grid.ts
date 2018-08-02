import Konvas from '../konvas'
import Grid from '../grid'

export default function initGrid(konvas: Konvas) {
  const grid = new Grid({
    wrapper: konvas.el
  })
  konvas.grid = grid
  // konvas.addListener(grid)
}
