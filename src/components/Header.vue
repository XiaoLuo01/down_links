<template>
  <div class="header">
    <van-nav-bar title="泡泡鱼" fixed border></van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'Header',
  data() {
    return {

    }
  },
  components: {
    [NavBar.name]: NavBar,
  }
}
</script>

<style scoped lang="scss">
.van-nav-bar__title {
  font-weight: 700;
  font-size: 20px;
}
</style>
