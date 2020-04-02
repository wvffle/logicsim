import Node from './node'

export default class Xor extends Node {
  create () {
    this.name = 'NXOR'

    this.addInput('value')
    this.addInput('value')

    this.addOutput('value', function () {
      let sum = 0

      this.node.inputs.forEach(({ value }) => {
        sum += value
      })

      return ((sum % 2) + 1) % 2
    })
  }
}
