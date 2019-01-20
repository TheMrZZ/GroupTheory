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
    if (i * a % n === b % n) {
      x.push(i)
    }
  }

  return x
}