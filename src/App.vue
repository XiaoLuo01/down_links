<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss">
body {
  font-size: 16px!important;
  background: #fff;
}
#app{
  height: 100%;
  .wrapper {
    padding: 56px 12px 150px 12px;
  }
}
</style>
