import { EventEmitter } from 'events'
import linkStore from '@/spec/store/link'

export default class Input extends EventEmitter {
  constructor(node, name) {
    super()

    this.node = node
    this.name = name
    this.line = null
    this.createElement()
  }

  createElement () {
    const element = (this.element = document.createElement('div'))
    const bullet = (this.bullet = document.createElement('span'))

    element.classList.add('input')
    element.input = this

    //  	•
    bullet.textContent = '◦'
    bullet.classList.add('bullet')

    this.on('unlink', () => {
      bullet.textContent = '◦'
    })

    this.on('link', () => {
      bullet.textContent = '•'
    })

    element.appendChild(bullet)
    element.appendChild(document.createTextNode(this.name))
    this.node.inputElements.appendChild(element)
  }

  get value () {
    // Cannot link so it is already linked
    if (!linkStore.canLink(this)) {
      return linkStore.getOutput(this).value
    }

    return null
  }

}
