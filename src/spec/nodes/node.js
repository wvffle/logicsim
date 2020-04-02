import { EventEmitter } from 'events'
import Input from '../inputs/input'
import Output from '../output'

export default class Node extends EventEmitter {
  constructor () {
    super()

    this.inputs = new Set()
    this.outputs = new Set()

    const element = (this.element = document.createElement('div'))
    const inputElements = (this.inputElements = document.createElement('div'))
    const outputElements = (this.outputElements = document.createElement('div'))

    element.classList.add('p-1', 'node-body', 'text-xs', 'text-gray-500')

    element.appendChild(inputElements)
    element.appendChild(outputElements)

    this.create()
  }

  create () {

  }

  addInput (name, Type = Input) {
    const input = new Type(this, name)
    this.inputs.add(input)

    input.on('link', (output) => {
      this.emit('link', input, output)
    })

    // Force an update chain
    input.on('update', () => {
      for (const output of this.outputs) {
        console.log('[n]', input.value, output)
        output.emit('update')
      }
    })

    return input
  }

  addOutput (name, value) {
    const output = new Output(this, name, value)
    this.outputs.add(output)

    output.on('link', (input) => {
      this.emit('link', input, output)
    })

    return output
  }

  removeInput (input) {
    this.inputs.delete(input)
    input.element.remove()
  }

  get value () {
    return 0
  }
}
