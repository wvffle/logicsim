import Node from './node'

export default class Or extends Node {
  create () {
    this.name = 'OR'

    this.addInput('value')
    this.on('link', (input) => {
      if (this.inputs.has(input)) {
        this.addInput('value')
      }
    })

    this.on('unlink', (input) => {
      this.removeInput(input)
    })

    this.addOutput('value', function () {
      let res = 0

      this.node.inputs.forEach((input) => {
        if (res === 1) return
        if (input.value === 1) {
          res = 1
        }
      })

      return res
    })
  }
}
