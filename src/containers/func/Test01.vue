<template>
  <div>
    <quillEditor v-model="content" :options="editorOption"></quillEditor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Test01',
  components: {
    quillEditor
  },
  data () {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {}
    }
  },
  computed: {
    path: function () {
      return this.$route.path
    }
  },
}
</script>

<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
</style>