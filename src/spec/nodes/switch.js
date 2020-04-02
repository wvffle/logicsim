import Node from '@/spec/nodes/node'
import CheckboxInput from '@/spec/inputs/switch'

export default class Switch extends Node {
  create () {
    this.name = 'SWITCH'

    this.addInput('value', CheckboxInput)
    this.addOutput('value', function () {
      return this.node.inputs.values().next().value.value
    })
  }
}
