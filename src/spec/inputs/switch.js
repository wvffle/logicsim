import Input from '../inputs/input'

export default class CheckboxInput extends Input {
  createElement() {
    const element = (this.element = document.createElement('input'))
    element.type = 'checkbox'
    element.checked = false

    element.addEventListener('change', () => {
      this.emit('update')
    })

    this.node.inputElements.appendChild(element)
  }

  get value () {
    return +this.element.checked
  }
}
