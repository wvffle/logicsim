import Node from './node'

export default class Probe extends Node {
  create () {
    this.name = 'PROBE'

    const input = this.addInput('value')
    console.log(input)
    input.on('update', () => {
      console.log(`PROBE: ${input.value}`)
    })
  }
}
