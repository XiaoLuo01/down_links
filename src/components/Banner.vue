<template>
  <div class="banner">
    <van-swipe :autoplay="3000" indicator-color="#1ABC9C">
      <van-swipe-item v-for="(image, index) in images" :key="'img_'+index">
        <a :href="image.open_url" target="_blank">
          <img :src="image.image_url" :title="image.des" @error="imgError(image)"/>
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { banner } from '../utils/api'; //在页面上引入需要的请求函数

export default {
  name: 'Banner',
  data() {
    return {
      images: []
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  created() {
    this.getBannerImg();
  },
  methods: {
    // 请求 banner的数据
    getBannerImg() {
      banner().then(response => {
        if (response.data.Data) {
          this.images = response.data.Data;
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    imgError(item) {
      item.image_url = require('../assets/img/banner-img.png');
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  padding: 0 18px;
}
.van-swipe {
  border-radius: 16px;
  box-shadow: 5px 5px 5px #aaa;
  margin: 18px 0;
  a {
    display: inline-block;
  }
  .van-swipe-item {
    line-height: 0;
    a {
      width: 100%;
    }
    img {
      height: 150px;
    }
  }
}
</style>
