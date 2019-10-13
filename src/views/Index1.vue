<template>
  <div class="index">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
export default {
  name: 'Index1',
  data() {
    return {

    }
  },
  components: {
    Footer
  }
}
</script>

<style scoped lang="scss">
.index {
  height: 100%;
}
</style>
