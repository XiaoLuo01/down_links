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
    padding: 56px 0 120px 0;
  }
}
</style>
