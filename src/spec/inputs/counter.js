import Input from '../inputs/input'

export default class CounterInput extends Input {
  createElement() {
    const element = (this.element = document.createElement('div'))

    const disp = (this.disp = document.createElement('span'))
    const next = (this.next = document.createElement('span'))
    const prev = (this.prev = document.createElement('span'))

    next.textContent = '++'
    prev.textContent = '--'

    next.addEventListener('click', () => {
      this.data.next()
      this.emit('update')
    })

    prev.addEventListener('click', () => {
      this.data.prev()
      this.emit('update')
    })

    element.appendChild(prev)
    element.appendChild(disp)
    element.appendChild(next)

    disp.textContent = this.node.$value
    this.on('update', () => {
      disp.textContent = this.node.$value
    })

    this.node.inputElements.appendChild(element)
  }

  get value () {
    return +this.element.checked
  }
}
