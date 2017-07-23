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
  name: 'Admin',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$menu-color: #324157;

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

  height: 8vh;

  background-color: #1D8CE0;
}

.body-panel {
  display: flex;
  flex-direction: row;

  top: 8vh;
  height: 92vh;

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

    background-color: $menu-color;
  }

  .function-panel {
    width: 80vw;

    margin: 1vh 1vw;
  }
}
</style>
