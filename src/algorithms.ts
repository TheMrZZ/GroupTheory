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
  return euclideanExtendedAlgorithm(x, n)[u].get(-2)
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