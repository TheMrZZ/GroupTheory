// Don't remove: it allows webpack to understand it should compile the CSS file
import './style.css'

import {getEuclideanTable, createEquationProduct} from './actions'

function resizeInputs() {
  for (const input of document.getElementsByTagName('input')) {
    let resize = function () {
      input.style.width = Math.max(1, input.value.length) + 'em'
    }
    input.oninput = resize
    resize()
  }
}

// When the document is ready
document.addEventListener('DOMContentLoaded', function () {
  getEuclideanTable()
  createEquationProduct()
  resizeInputs()
})