<template>
  <div>User({{ userInfo.userName }})</div>
</template>

<script>
import { getUserInfo } from 'store'

export default {
  name: 'Top',
  data () {
    return {
      userInfo: getUserInfo()
    }
  }
}
</script>
