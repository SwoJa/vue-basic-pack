<template>
  <div>
    <div class="top-panel"><router-view name="top"></router-view></div>
    <div class="body-panel">
      <div class="menu-panel"><router-view name="menu"></router-view></div>
      <div class="function-panel"><router-view name="func"></router-view></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Backend',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top-panel,
.body-panel {
  display: flex;
  flex-direction: row;
  width: 100vw;
  position: absolute;
}

.top-panel {
  align-items: center;
  justify-content: center;

  height: 10vh;
}

.body-panel {
  display: flex;
  flex-direction: row;

  top: 10vh;
  height: 90vh;

  .menu-panel,
  .function-panel {
    display: flex;
    flex-direction: column;

    overflow: scroll;
  }

  .menu-panel {
    display: inline-block;
    text-align: left;
    width: 20vw;

    background-color: #324157;
  }

  .function-panel {
    width: 80vw;
  }
}
</style>
