<template>
  <div>Test03({{ path }})</div>
</template>

<script>
export default {
  name: 'Test03',
  computed: {
    path: function () {
      return this.$route.path
    }
  },
}
</script>
