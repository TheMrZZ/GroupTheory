import {
  euclideanExtendedAlgorithm,
  resolveEquationProduct,
  inverse,
  findAllPrimes,
  primeFactorization
} from './algorithms'
import { u, v, r } from './constants'

function getChildrenByTagName (element: HTMLElement, tagName: string) {
  return (
    Array
      .from(element.getElementsByTagName('*'))
      .filter(e => e.tagName === tagName.toUpperCase())
  )
}

function inputValue (input: Element) {
  return parseInt((input as HTMLInputElement).value)
}

export function createEuclideanTable () {
  const resultDiv = document.getElementById('euclidean-result') as HTMLDivElement
  const form = document.getElementById('algorithm-form') as HTMLFormElement

  form.onsubmit = function () {
    let table = document.createElement('table')
    resultDiv.innerHTML = ''
    table.innerHTML = '<tr><th>u</th><th>v</th><th>q</th><th>r</th></tr>'

    const a = inputValue(getChildrenByTagName(form, 'input')[0])
    const b = inputValue(getChildrenByTagName(form, 'input')[1])

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

    let equation = document.createElement('div')
    const result_u = result[u].get(-2), result_v = result[v].get(-2), gcd = result[r].get(-2)

    equation.innerHTML = `u=${result_u}, v=${result_v}, pgcd(a,b)=${gcd} <br>
                          a×u + b×v = pgcd(a, b) <br>
                          ${a} × ${result_u} + ${b} × ${result_v} = ${gcd}`

    resultDiv.appendChild(equation)
  }
}

export function createFactorization () {
  const factorizationElement = document.getElementById('factorization') as HTMLDivElement
  const form = getChildrenByTagName(factorizationElement, 'form')[0] as HTMLFormElement
  const resultDiv = getChildrenByTagName(factorizationElement, 'div')[0] as HTMLDivElement

  form.onsubmit = function () {
    const x = inputValue(getChildrenByTagName(form, 'input')[0])
    const result = primeFactorization(x)

    resultDiv.innerHTML = `
    ${x} = ${result.map(l => l[0] + '<sup>' + l[1] + '</sup>').join(' × ')}
    `
  }
}

export function createEquationProduct () {
  const equationProduct = document.getElementById('equation-product') as HTMLDivElement
  const form = getChildrenByTagName(equationProduct, 'form')[0] as HTMLFormElement

  form.onsubmit = function () {
    const n = inputValue(getChildrenByTagName(form, 'input')[0])
    const a = inputValue(getChildrenByTagName(form, 'input')[1])
    const b = inputValue(getChildrenByTagName(form, 'input')[2])

    // Equation is, on (ℤ/nℤ, ⊕, ⊙) , a ⊙ x = b (a & b given), find x
    let x = resolveEquationProduct(n, a, b)
    let result = ''
    if (x.length === 0) {
      result = 'Aucun résultat.'
    } else if (x.length === 1) {
      const inv = inverse(a, n)
      result = `
        ${inv} ⊙ ${a} ⊙ x = ${inv} ⊙ ${b}<br>
        x = ${x[0]}<br>
        Un seul résultat: <span class="overline">x</span> = <span class="overline">${x[0]}</span>
      `
    } else {
      result = 'Plusieurs résultats: <span class="overline">' + x.join('</span>, <span class="overline">') + '</span>'
    }

    const resultDiv = getChildrenByTagName(equationProduct, 'div')[0] as HTMLDivElement
    resultDiv.innerHTML = result
  }
}

// Find inverse of x in (ℤ/nℤ, ⊕, ⊙)
export function createFindInverse () {
  const findInverseDiv = document.getElementById('find-inverse') as HTMLDivElement
  const form = getChildrenByTagName(findInverseDiv, 'form')[0] as HTMLFormElement

  form.onsubmit = function () {
    const n = inputValue(getChildrenByTagName(findInverseDiv, 'input')[0])
    const x = inputValue(getChildrenByTagName(findInverseDiv, 'input')[1])
    const inv = inverse(x, n)

    let result = ''
    if (inv === null) {
      result = `<span class="overline">${x}</span> n'est pas inversible dans (ℤ/${n}ℤ, ⊕, ⊙).`
    } else {
      result = `<span class="overline">x</span><sup>-1</sup> = <span class="overline">${inv}</span>`
    }

    const resultDiv = getChildrenByTagName(findInverseDiv, 'div')[1]
    resultDiv.innerHTML = result
  }
}

// Find all numbers prime with n in (ℤ/nℤ, ⊕, ⊙)
export function createFindPrimes () {
  const primesListElement = document.getElementById('primes-list') as HTMLDivElement
  const form = getChildrenByTagName(primesListElement, 'form')[0] as HTMLFormElement
  const resultDiv = getChildrenByTagName(primesListElement, 'div')[1] as HTMLDivElement

  form.onsubmit = function () {
    const n = inputValue(getChildrenByTagName(form, 'input')[0])
    const primes = findAllPrimes(n)

    let result = `Les nombres premiers (et inversibles) dans (ℤ/${n}ℤ, ⊕, ⊙) sont:<br>`
    result += '[' + primes.map(p => `<span class="overline">${p}</span>`).join(', ') + ']<br>'
    result += `On en déduit que φ = ${primes.length}`
    resultDiv.innerHTML = result
  }
}

// Find φ (phi), the number of whole numbers with an inverse in (ℤ/nℤ, ⊕, ⊙)
export function createPhi () {
  const phiElement = document.getElementById('phi') as HTMLDivElement
  const form = getChildrenByTagName(phiElement, 'form')[0] as HTMLFormElement
  const resultDiv = getChildrenByTagName(phiElement, 'div')[1] as HTMLDivElement

  form.onsubmit = function () {
    const x = inputValue(getChildrenByTagName(form, 'input')[0])
    const factors = primeFactorization(x)
    const phi = factors.reduce((phi, factor) => phi * (1 - 1 / factor[0]), 1) * x

    resultDiv.innerHTML = `
      ${x} = ${factors.map(l => l[0] + '<sup>' + l[1] + '</sup>').join(' × ')}<br>
      φ = ${x} × ${factors.map(factor => `(1 - 1/${factor[0]})`).join(' × ')} <br>
      φ = ${Math.round(phi)}
    `
  }
}