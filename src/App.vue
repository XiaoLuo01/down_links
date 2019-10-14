<template>
  <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive> 
      <!-- <Index></Index> -->
  </div>
</template>

<script>
// import Index from '@/views/Index.vue';
export default {
  components: {
    // Index
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
    padding: 55px 0 110px 0;
    // background-image: url('~@/assets/img/bg.png');
    // background-size: 100% 100%;
  }
}
</style>
