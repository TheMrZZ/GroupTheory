import euclideanAlgorithm from './algorithms'

function prettyPrint(table: number[][], names: string[]) {
  let representation: {[key: string]: number[]} = {}

  for (let i = 0; i < table.length; i++) {
    const column = table[i]
    const name = names[i]

    representation[name] = column
  }

  console.table(representation)
}
