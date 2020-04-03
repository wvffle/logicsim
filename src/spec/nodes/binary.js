import Node from './node'
import CounterInput from "@/spec/inputs/counter";

export default class And extends Node {
  create () {
    this.name = 'Binary Generator'
    this.$value = 0

    const value = function () {
      return +!!(this.node.$value & this.id)
    }

    this.addInput('value', CounterInput, {
      next: () => this.next(),
      prev: () => this.prev(),
    })

    const output = this.addOutput('value', value)
    output.id = (this.$id = 1)

    this.on('link', () => {
      const output = this.addOutput('value', value)
      output.id = (this.$id <<= 1)
    })


  }

  prev () {
    if (--this.$value < 0) {
      this.$value = (1 << (this.outputs.size - 1)) - 1
    }
  }

  next () {
    if (++this.$value >= 1 << (this.outputs.size - 1)) {
      this.$value = 0
    }
  }
}
