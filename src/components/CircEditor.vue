<template>
  <div class="grid bg-gray-700 h-screen">
    <div class="w-64 border-r border-gray-600 overflow-y-auto">
      <div class="border-b border-gray-900 bg-gray-800 text-gray-400 px-2 py-3 text-xs uppercase font-mono">
        inputs
      </div>
      <div v-for="item in inputs" :key="item" class="border-b border-gray-900 text-gray-400 uppercase p-2 text-xs hover:bg-orange-500 hover:text-black cursor-grab">
        {{ item }}
      </div>
      <div class="border-b border-gray-900 bg-gray-800 text-gray-400 px-2 py-3 text-xs uppercase font-mono">
        gates
      </div>
      <div v-for="item in gates" :key="item" class="border-b border-gray-900 text-gray-400 uppercase p-2 text-xs hover:bg-orange-500 hover:text-black cursor-grab">
        {{ item }}
      </div>
      <div class="border-b border-gray-900 bg-gray-800 text-gray-400 px-2 py-3 text-xs uppercase font-mono">
        not gates
      </div>
      <div v-for="item in notgates" :key="item" class="border-b border-gray-900 text-gray-400 uppercase p-2 text-xs hover:bg-orange-500 hover:text-black cursor-grab">
        {{ item }}
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'CircEditor',
    data () {
      return {
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
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">
.grid
  grid-template-columns auto 1fr
</style>
