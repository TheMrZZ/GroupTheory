import { euclideanExtendedAlgorithm, resolveEquationProduct } from './algorithms'
import { r } from './constants'

function getChildrenByTagName (element: HTMLElement, tagName: string) {
  return (
    Array
      .from(element.getElementsByTagName('*'))
      .filter(e => e.tagName === tagName.toUpperCase())
  )
}

export function getEuclideanTable () {
  const resultDiv = document.getElementById('euclidean-result') as HTMLDivElement
  const form = document.getElementById('algorithm-form') as HTMLFormElement
  const number1 = getChildrenByTagName(form, 'input')[0] as HTMLInputElement
  const number2 = getChildrenByTagName(form, 'input')[1] as HTMLInputElement

  form.onsubmit = function () {
    let table = document.createElement('table')
    resultDiv.innerHTML = ''
    table.innerHTML = '<tr><th>u</th><th>v</th><th>q</th><th>r</th></tr>'

    let a = parseInt(number1.value)
    let b = parseInt(number2.value)

    let result = euclideanExtendedAlgorithm(a, b)

    // need to iter on rows first
    for (let row = 0; row < result[0].length; row++) {
      let tableRow = document.createElement('tr')

      for (let col = 0; col < result.length; col++) {
        let tableCell = document.createElement('td')
        let n = result[col][row]
        tableCell.innerText = n.toString()

        // Check if the number is PGCD to display him in another color.
        // PGCD is on the r column, one row before the last
        if (col === r && row === result[0].length - 2) {
          tableCell.id = 'pgcd'
          tableCell.title = 'PGCD'
        }

        tableRow.appendChild(tableCell)
      }

      table.appendChild(tableRow)
    }

    resultDiv.appendChild(table)
  }
}

export function createEquationProduct () {
  const equationProduct = document.getElementById('equation-product') as HTMLDivElement
  const form = getChildrenByTagName(equationProduct, 'form')[0] as HTMLFormElement

  form.onsubmit = function () {
    const n = getChildrenByTagName(form, 'input')[0] as HTMLInputElement
    const a = getChildrenByTagName(form, 'input')[1] as HTMLInputElement
    const b = getChildrenByTagName(form, 'input')[2] as HTMLInputElement

    // Equation is, on ℤ/nℤ, a ⊙ x = b (a & b given), find x
    let x = resolveEquationProduct(parseInt(n.value), parseInt(a.value), parseInt(b.value))
    let result = ''
    if (x.length === 0) {
      result = 'Aucun résultat.'
    } else if (x.length === 1) {
      result = `Un seul résultat: <span class=overline>x</span> = <span class=overline>${x[0]}</span>`
    } else {
      result = 'Plusieurs résultats: <span class=overline>' + x.join('</span>, <span class=overline>') + '</span>'
    }

    const resultDiv = getChildrenByTagName(equationProduct, 'div')[0] as HTMLDivElement
    resultDiv.innerHTML = result
  }
}