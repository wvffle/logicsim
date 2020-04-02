import Node from './node'

export default class Not extends Node {
  create () {
    this.name = 'NOT'

    this.addInput('value')

    this.addOutput('value', function () {
      let sum = 0

      this.node.inputs.forEach(({ value }) => {
        sum += value
      })

      return (sum + 1) % 2
    })
  }
}
