<template>
  <div class="footer">
    <van-tabbar v-model="active" route safe-area-inset-bottom>
      <van-tabbar-item name="home" icon="home-o" to="/">
        <img class="icon" slot="icon" src="../assets/img/home.png" >
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="good-job-o" to="/recommend">
        <img class="icon" slot="icon" src="../assets/img/recommend.png" >
        <span class="text">推荐</span>
      </van-tabbar-item>
      <van-tabbar-item icon="records" to="/message">
        <img class="icon" slot="icon" src="../assets/img/message.png" >
        <span class="text">留言</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'Footer',
  data() {
    return {
      active: 'home',
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  }
}
</script>

<style lang="scss">
.van-tabbar-item {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  // position: relative;
  .van-tabbar-item__icon {
    margin-bottom: 2px;
    img {
      width: 27px;
      height: auto;
    }
  }
}
.van-tabbar-item--active {
  color: red;
}
.van-tabbar {
  height: 50px;
}
</style>
