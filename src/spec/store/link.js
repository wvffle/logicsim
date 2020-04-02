import { EventEmitter } from 'events'

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

class LinkStore extends EventEmitter {
  constructor () {
    super()

    this.linking = null
    this.store = new Map()
    this.usedInputs = new Map()
  }

  startLinking (output) {
    this.linking = output
    this.store.set(output, new Set())
  }

  abortLinking () {
    this.linking = null
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
      console.log('[l]', output.value, input)
      input.emit('update')
    })

    input.emit('update')
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
