import { EventEmitter } from 'events'

const COLOR_ON = '#0af'
const COLOR_OFF = '#718096'

window.addEventListener('mousedown', (event) => {
  const { target } = event
  const { parentElement: parent } = target

  if (target.classList.contains('output') || parent.classList.contains('output')) {
    const output = target.output || parent.output
    linkStore.startLinking(output)
  }

})

window.addEventListener('mouseup', (event) => {
  if (linkStore.isLinking()) {
    const { target } = event
    const { parentElement: parent } = target

    if (target.classList.contains('input') || parent.classList.contains('input')) {
      const input = target.input || parent.input
      if (linkStore.canLink(input)) {
        return linkStore.link(input)
      }
    }
  }

  linkStore.abortLinking()
})

window.addEventListener('mousemove', (event) => {
  if (!linkStore.isLinking()) return
  const output = linkStore.linking
  const { offsetBox } = output.node

  output.line.attr({
    x2: event.pageX - offsetBox.left,
    y2: event.pageY - offsetBox.top,
  })
})

class LinkStore extends EventEmitter {
  constructor () {
    super()

    this.linking = null
    this.store = new Map()
    this.usedInputs = new Map()
  }

  startLinking (output) {
    const box = output.element.getBoundingClientRect()
    const offsetBox = output.node.offsetBox

    const x = box.left - offsetBox.left
    const y = box.top - offsetBox.top

    const color = output.value === 1
      ? COLOR_ON
      : COLOR_OFF

    output.line = output.node.canvas
      .line(x, y, x, y)
      .stroke({ width: 1, color })

    this.linking = output
    this.store.set(output, new Set())
  }

  abortLinking () {
    if (this.linking !== null) {
      this.linking.line.remove()
      this.linking.line = null
      this.linking = null
    }
  }

  link (input) {
    if (this.linking === null) return
    if (this.usedInputs.has(input)) return

    this.usedInputs.set(input, this.linking)
    this.store.get(this.linking).add(input)

    this.linking.emit('link', this.linking, input)
    input.emit('link', this.linking, input)

    const output = this.linking
    output.on('update', () => {
      input.emit('update')

      const color = output.value === 1
        ? COLOR_ON
        : COLOR_OFF

      output.lines.forEach((line) => {
        line.attr({
          stroke: color
        })
      })
    })

    input.emit('update')

    input.line = output.line
    output.lines.add(output.line)
    output.line = null

    input.node.updatePosition()
    output.node.updatePosition()

    this.linking = null
  }

  getOutput (input) {
    return this.usedInputs.get(input)
  }

  areLinked (output, input) {
    return this.store.has(output) && this.store.get(output).has(input)
  }

  canLink (input) {
    return !this.usedInputs.has(input)
  }

  isLinking () {
    return !!this.linking
  }

  unlink () {

  }
}

const linkStore = new LinkStore()
export default linkStore
