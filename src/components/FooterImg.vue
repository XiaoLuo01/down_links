<template>
  <div class="footer-img">
    <a :href="img.open_url" target="_blank">
      <img class="type-1" v-lazy="img.image_url" alt="">
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
    this.getFooterImg();
  },
  methods: {
    getFooterImg() {
      footerImg().then(response => {
      if (response.data.Data.length !== 0 || response.data.Data) {
        var max = response.data.Data.length;
        var random = Math.floor(Math.random()*max+0) || 0;
        this.img = response.data.Data[random];
      }
      }).catch(err=>{
        console.log(err)
      });
    }
  }
}
</script>

<style scoped lang="scss">
.footer-img {
  position: fixed;
  left: 0;
  bottom: 60px;
  width: 100%;
  z-index: 1;
  img {
    height: 60px;
  }
}
</style>
