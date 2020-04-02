import { EventEmitter } from 'events'

export default class Output extends EventEmitter {
  constructor(node, name, value) {
    super()

    this.node = node
    this.name = name

    Object.defineProperty(this, 'value', {
      get () {
        return value.call(this)
      }
    })

    this.createElement()
  }

  createElement () {
    const element = (this.element = document.createElement('div'))
    const bullet = (this.bullet = document.createElement('span'))

    element.classList.add('output')
    element.output = this

    bullet.textContent = '◦'
    bullet.classList.add('bullet')

    this.on('unlink', () => {
      bullet.textContent = '◦'
    })

    this.on('link', () => {
      bullet.textContent = '•'
    })

    element.appendChild(document.createTextNode(this.name))
    element.appendChild(bullet)
    this.node.outputElements.appendChild(element)
  }

}
