<template>
  <div>Test01({{ path }})</div>
</template>

<script>
export default {
  name: 'Test01',
  computed: {
    path: function () {
      return this.$route.path
    }
  },
}
</script>
