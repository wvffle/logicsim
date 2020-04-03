<template>
  <div class="grid bg-gray-700 h-full select-none">
    <div class="w-64 border-r border-gray-900 overflow-y-auto overflow-x-hidden">
      <div v-for="(items, category) in panel" :key="category">
        <div class="border-b border-gray-900 bg-gray-800 text-gray-400 px-2 py-3 text-xs uppercase font-mono">
          {{ category }}
        </div>
        <div @mousedown="createDragElement" v-for="item in items" :key="item" class="border-b border-gray-900 text-gray-400 uppercase p-2 text-xs hover:bg-orange-500 hover:text-black cursor-grab font-mono w-64">
          {{ item }}
        </div>
      </div>
    </div>
    <div ref="ep" class="edit-plane overflow-scroll relative">
    </div>
    <div ref="dnc" class="dynamic-node-container fixed t-0 l-0 w-full h-full pointer-events-none z-30">
    </div>
  </div>
</template>

<script>
  import { SVG } from '@svgdotjs/svg.js'
  export default {
    name: 'CircEditor',
    data () {
      return {
        canvas: null,
        epbox: null,
        dynamicNode: null,
        dynamicNodeBox: null,
        panel: {
          inputs: [
            'switch'
          ],
          gates: [
            'and',
            'or',
            'xor'
          ],
          notgates: [
            'not',
            'nand',
            'nor',
            'nxor'
          ],
          outputs: [
            'probe'
          ],
          generators: [
            'binary'
          ]
        }
      }
    },
    methods: {
      setDynamicNode (node) {
        if (this.dynamicNode !== null) {
          return
        }

        node.classList.add('absolute')
        this.dynamicNode = node

        const { dnc } = this.$refs
        dnc.appendChild(node)
        document.body.classList.add('cursor-grabbing')

        this.dynamicNodeBox = node.getBoundingClientRect()

        return node
      },
      createNode (type) {
        const node = document.createElement('div')
        node.classList.add('pointer-events-none', 'border', 'border-gray-800', 'rounded', 'bg-gray-700', 'shadow', 'node')

        const title = document.createElement('div')
        title.textContent = type.toUpperCase()
        title.classList.add('text-xs', 'bg-gray-800', 'text-gray-500', 'text-center', 'font-mono', 'py-1')
        title.addEventListener('mousedown', event => {
          this.setDynamicNode(node)
          this.updateDynamicNodePosition(event)
          node.instance.updatePosition(event)
        })

        node.appendChild(title)

        const { default: Node } = require(`../spec/nodes/${type.toLowerCase()}`)
        node.instance = new Node(node, this.canvas, this.epbox)
        node.appendChild(node.instance.element)

        // render inputs and outputs

        this.setDynamicNode(node)

        return node
      },
      updateDynamicNodePosition (event) {
        if (this.dynamicNode === null) return
        const x = event.clientX - this.dynamicNodeBox.width / 2
        const y = event.clientY - 16

        this.dynamicNode.style.left = `${x}px`
        this.dynamicNode.style.top = `${y}px`

        return { x, y }
      },
      createDragElement (event) {
        this.createNode(event.target.textContent.trim())
        this.updateDynamicNodePosition(event)
      },

      placeDynamicNode(event) {
        if (this.dynamicNode === null) return

        const node = this.dynamicNode

        const { epbox } = this
        const x = event.pageX - epbox.left - this.dynamicNodeBox.width / 2
        const y = event.pageY - epbox.top - 16

        if (x * y < 0) {
          node.parentElement.removeChild(node)
          document.body.classList.remove('cursor-grabbing')
          this.dynamicNode = null
          this.dynamicNodeBox = null
          return
        }

        node.style.left = `${x}px`
        node.style.top = `${y}px`
        node.classList.remove('pointer-events-none')

        this.$refs.ep.appendChild(node)

        document.body.classList.remove('cursor-grabbing')
        this.dynamicNode = null
        this.dynamicNodeBox = null
      },
      updateEPBox() {
        this.epbox = this.$refs.ep.getBoundingClientRect()
      }
    },
    mounted () {
      document.addEventListener('mouseup', this.placeDynamicNode)
      document.addEventListener('resize', this.updateEPBox)
      window.addEventListener('mousemove', (event) => {
        this.updateDynamicNodePosition(event)
        if (this.dynamicNode) {
          this.dynamicNode.instance.updatePosition(event)
        }
      })

      this.canvas = SVG().addTo('.edit-plane').size('100%', '100%')

      this.updateEPBox()
    }
  }
</script>

<style scoped lang="stylus">
.grid
  grid-template-columns auto 1fr

.edit-plane
  background url(/pattern.png)
</style>
<style lang="stylus">
.node
  .node-body
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 1rem

    > div > div
      display flex
      align-items center

    .bullet
      font-size 2.1rem
      line-height 1rem
      margin-top -2px
      padding 0 2px

</style>
