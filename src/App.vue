<template>
  <div class="h-screen" id="app">
    <circ-editor></circ-editor>
  </div>
</template>

<script>
import CircEditor from './components/CircEditor.vue'
// eslint-disable-next-line
import linkStore from '@/spec/store/link'

export default {
  name: 'App',
  components: {
    CircEditor
  }
}
</script>
