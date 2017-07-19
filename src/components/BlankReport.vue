<template>
  <iframe :src="reportPath" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'BlankReport',
  computed: {
    reportPath: function () {
      return REPORT_SERVICE_HOST + '%2f' + this.$route.query.reportName + '&rs:Command=Render'
    }
  },
}
</script>

<style lang="scss" scoped>
iframe {
  height: 90vh;

  background-color: white;
}
</style>
