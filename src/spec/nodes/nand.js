import Node from './node'
import linkStore from "@/spec/store/link";

export default class And extends Node {
  create () {
    this.name = 'AND'

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
      // There is no input linked
      if (this.node.inputs.size === 1) {
        return 1
      }

      let sum = 0
      this.node.inputs.forEach((input) => {
        // Cannot link so is already linked
        if (!linkStore.canLink(input)) {
          sum += 1
        }

        sum -= input.value
      })

      return +(sum !== 0)
    })
  }
}
