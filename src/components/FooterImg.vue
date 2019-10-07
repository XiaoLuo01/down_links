<template>
  <div class="footer-img">
    <a :href="img.open_url" target="_blank">
      <img :src="img.image_url" alt="">
    </a>
  </div>
</template>

<script>
import { footerImg } from '../utils/api';

export default {
  name: '', 
  data() {
    return {
      img: {}
    }
  },
  created() {
    // footerImg().then(response => {
    //     this.img = response.data.respond.banner[0];
    //   }).catch(err=>{
    //     console.log(err)
    //   });
  }
}
</script>

<style scoped lang="scss">
.footer-img {
  position: fixed;
  left: 0;
  bottom: 50px;
  img {
    height: 100px;
  }
}
</style>
