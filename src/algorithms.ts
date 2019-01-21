import { u, q, r, v } from './constants'

declare global {
  interface Array<T> {
    get (index: number): T

    set (index: number, value: number): void
  }
}

Array.prototype.get = function (index: number) {
  if (index >= 0) {
    return this[index]
  }
  return this[this.length + index]
}

Array.prototype.set = function (index: number, value: number) {
  if (index >= 0) {
    this[index] = value
  } else {
    this[this.length + index] = value
  }
}

function gcd (a: number, b: number) {
  a = Math.abs(a)
  b = Math.abs(b)
  if (b > a) {
    const temp = a
    a = b
    b = temp
  }
  while (true) {
    if (b == 0) {
      return a
    }
    a %= b
    if (a == 0) {
      return b
    }
    b %= a
  }
}

type euclidTable = [number[], number[], number[], number[]]

export function euclideanExtendedAlgorithm (a: number, b: number): euclidTable {
  let table: euclidTable = [[1, 0], [0, 1], [0, 0], [a, b]]

  while (table[r].get(-1) !== 0) {
    /* First get the new quotient */
    const quotient = Math.floor(table[r].get(-2) / table[r].get(-1))

    table[q].push(quotient)
    table[r].push(table[r].get(-2) % table[r].get(-1))
    table[u].push(table[u].get(-2) - quotient * table[u].get(-1))
    table[v].push(table[v].get(-2) - quotient * table[v].get(-1))

    if (table[u].length > 10) {
      break
    }
  }

  return table
}

// Equation is, on ℤ/nℤ, a ⊙ x = b (a & b given), return unknown x (could be multiple solutions or none)
export function resolveEquationProduct (n: number, a: number, b: number) {
  let x: number[] = []

  for (let i = 0; i < n; i++) {
    if ((i * a) % n === b % n) {
      x.push(i)
    }
  }

  return x
}

// Find the inverse of x in (ℤ/nℤ, ⊕, ⊙) - null if x has no inverse
export function inverse (x: number, n: number): number | null {
  if (gcd(x, n) !== 1) {
    return null
  }

  // Inverse of a number x in (ℤ/nℤ, ⊕, ⊙) is u, so that x*u + n*v = 1
  const inv = euclideanExtendedAlgorithm(x, n)[u].get(-2)

  if (inv > 0) {
    return inv
  }
  return inv + n
}

// Find all numbers prime with n in (ℤ/nℤ, ⊕, ⊙)
export function findAllPrimes (n: number) {
  let result: number[] = []
  for (let i = 0; i < n; i++) {
    if (gcd(i, n) === 1) {
      result.push(i)
    }
  }

  return result
}

// Find all prime factors of a number
export function primeFactorization (x: number) {
  function findFactors (x: number, factor: number) {
    let power = 0
    while (x % factor === 0) {
      x /= factor
      power++
    }
    return [x, power]
  }

  let result = [], factor = 3, diff = 2, power

  [x, power] = findFactors(x, 2)
  if (power > 0) {
    result.push([2, power])
  }

  while (x !== 1 && factor < 105) {
    [x, power] = findFactors(x, factor)

    if (power > 0) {
      result.push([factor, power])
    }

    factor += diff
    diff = 6 - diff
  }

  return result
}

/* Returns the binary decomposition of a number : 27 => [16, 8, 2, 1]*/
function getBinaryDecomposition (x: number) {
  let binaryRepresentation = x.toString(2)
  let powerOfTwo = 1, result = []

  for (let i = binaryRepresentation.length - 1; i >= 0; i--) {
    if (binaryRepresentation[i] === '1') {
      result.push(powerOfTwo)
    }

    powerOfTwo *= 2
  }

  return result
}

/* Find the result of a^power in (ℤ/nℤ, ⊕, ⊙)
 * Return an object of 3 arrays.
 * First is the binary decomposition of the number : 27 = [16, 8, 2, 1]
 *
 * Second is actual powers of a.
 * For findPower(15, 27, 55):
 *    [1, 15], meaning 15^1 % 55 = 15
 *    [2, 04], meaning 15^2 % 55 = 4 etc...
 *
 * Third is the calculation:
 * For findPower(15, 27, 55):
 *    [31, 36, 4, 13], meaning their product
 *    [16, 4, 13],
 *    [9, 13],
 *    [7]
 * */
export function findPower (a: number, power: number, n: number) {
  let binaryDecomposition = getBinaryDecomposition(power)

  let actualPowers: [number, number][] = []
  let products: number[][] = [[]]
  let powerOfTwo = 1, intermediateResult = a


  // Calculation of the powers
  while (powerOfTwo <= power) {
    actualPowers.push([powerOfTwo, intermediateResult])

    if (binaryDecomposition.includes(powerOfTwo)) {
      products[0].push(intermediateResult)
    }

    powerOfTwo *= 2
    intermediateResult = intermediateResult * intermediateResult % n
  }

  // Calculation of the products
  while (products.get(-1).length !== 1) {
    let previousProduct = products.get(-1)
    let newProduct = [previousProduct[0] * previousProduct[1] % n]
    newProduct.push(...previousProduct.slice(2))

    products.push(newProduct)
  }

  return { binaryDecomposition, powers: actualPowers, products }
}