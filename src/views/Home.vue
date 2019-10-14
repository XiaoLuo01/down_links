<template>
  <div class="wrapper home">
    <Header></Header>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Banner ref="banner"></Banner>

      <div class="notice">
        <a :href="trumpet && trumpet.open_url" target="_blank" class="trumpet">
          <van-notice-bar v-if="trumpet && trumpet.des" :text="trumpet && trumpet.des" left-icon="volume" color="red" background="transparent"/>
        </a>
        <div class="hot">
          <span>全网最方便的下载专区</span>
          <span class="hot-text" v-if="trumpet && trumpet.des">
            <a :href="trumpet && trumpet.open_url" target="_blank">
              <van-notice-bar :text="trumpet && trumpet.des" color="red" background="transparent"/>
            </a>
          </span>
        </div>
      </div>

      <div class="app-down superrecom" v-if="recommendApp.length !== 0">
        <h4>超级推荐</h4>
        <van-grid :column-num="3" square>
          <van-grid-item v-for="(app, index) in recommendApp" :key="'app_'+index" >
            <a href="javascript:;" class="hot-tag" @click="goToDetail(app)">
              <img class="icon" v-if="app.tips === '热门'" src="../assets/img/hot-tag.png" alt="">
              <img class="icon" v-else-if="app.tips === '推荐'" src="../assets/img/reco-tag.png" alt="">
              <img class="app-img type-0" v-lazy="app.app_icon" alt="">
              <span class="appname">{{app.app_name | getAppName}}</span>
            </a>
          </van-grid-item>
        </van-grid>
      </div>
      
      <div class="bigimg-list">
        <div class="img-item" v-for="(img, index) in bigImgs" :key="'big_'+index">
          <a :href="img.open_url" target="_blank">
            <img v-lazy="img.image_url" alt="" @error="imgError(img, 'ad')">
          </a>
        </div>
      </div>

      <div class="app-down" v-if="applists.length !== 0">
        <h4>热门下载</h4>
        <van-grid :column-num="3" square >
          <van-grid-item v-for="(app, index) in applists" :key="'app_'+index" >
            <a href="javascript:;" class="hot-tag" @click="goToDetail(app)">
              <img class="icon" v-if="app.tips === '热门'" src="../assets/img/hot-tag.png" alt="">
              <img class="icon" v-else-if="app.tips === '推荐'" src="../assets/img/reco-tag.png" alt="">
              <img class="app-img type-0" v-lazy="app.app_icon" alt="">
              <span class="appname">{{app.app_name | getAppName}}</span>
            </a>
          </van-grid-item>
        </van-grid>
      </div>

    </van-pull-refresh>
    <FooterImg ref="footerimg"></FooterImg>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Banner from '@/components/Banner.vue';
import FooterImg from '@/components/FooterImg.vue';
import { NoticeBar, Grid, GridItem, PullRefresh, Toast } from 'vant';
import { adlist, applist } from '../utils/api';

export default {
  name: 'Home',
  data() {
    return {
      trumpet: '',
      bigImgs: [],
      recommendApp: [],
      applists: [],
      isLoading: false
    }
  },
  components: {
    Header,
    Banner,
    FooterImg,
    [NoticeBar.name]: NoticeBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [PullRefresh.name]: PullRefresh
  },
  created() {
    Toast.loading({
      message: '加载中...'
    });
    this.getTrumpetAndBigimg();
    this.getApplist();
  },
  filters: {
    getAppName(name) {
      return name && name.substring(0,6);
    }
  },
  methods: {
    getTrumpetAndBigimg() {
      adlist().then(response => {
        if (response.data.Data) {
          this.trumpet = response.data.Data.trumpet[0];
          this.bigImgs = response.data.Data.big_banner;
        }
        this.isLoading = false;
        Toast.clear();
      }).catch(err=>{
        console.log(err);
        this.isLoading = false;
        Toast.clear();
      });
    },
    getApplist() {
      applist({ appcount: 0 }).then(response => {
        if (response.data.Data) {
          var lists = response.data.Data
          this.recommendApp = lists.slice(0, 6);
          this.applists = lists.slice(6);
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    goToDetail(appitem) {
      this.$router.push({
        path: 'appdetail',
        query: appitem
      });
    },
    onRefresh() {
      this.$refs.banner.getBannerImg();
      this.getTrumpetAndBigimg();
      this.getApplist();
    },
    imgError(item, type) {
      if (type === 'ad') {
        item.image_url = require('../assets/img/ad-img.png');
      } else {
        item.app_icon = require('../assets/img/default-icon.png');
      }
    },
    
  },
  watch: {
    '$route'(to, form) {
      Toast.loading({
        message: '加载中...'
      });
      this.getTrumpetAndBigimg();
      this.getApplist();
      // this.$refs.footerimg.getFooterImg();
    }
  }
}
</script>

<style lang="scss">
.home {
  .notice {
    padding: 0 18px;
    .van-notice-bar {
      padding: 0;
      height: 20px;
    }
    .trumpet {
      display: inline-block;
      width: 100%;
      height: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  .hot {
    padding-left: 25px;
    margin-bottom: 8px;
    background-image: url('~@/assets/img/hot.gif');
    background-repeat: no-repeat;
    background-size: 22px 15px;
    background-position: left center;
    span {
      font-size: 14px;
      vertical-align: middle;
    }
    .hot-text {
      display: inline-block;
      width: 55%;
    }
  }
  .bigimg-list {
    padding: 0 18px;
    .img-item img{
      height: 120px;
      margin-bottom: 10px;
      border-radius: 16px;
      box-shadow: 5px 5px 5px #aaa;
    }
  }
  .app-down {
    &.superrecom {
      margin-bottom: 8px;
    }
    h4 {
      padding-left: 18px;
      margin: 12px 0 6px;
      font-weight: bold;
    }
    .van-grid-item {
      a {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #333;
        font-size: 14px;
        position: relative; 
      }
      img.icon {
        width: 32px;
        position: absolute;
        left: 5px;
        top: -10px;
      }
      img.app-img {
        width: 70px;
        height: 70px;
        border-radius: 16px;
      }
      span.appname {
        font-size: 12px;
        width: 100px;
        margin-top: 10px;
        color: #919191;
        text-align: center;
      }
    }
  }
  .van-grid-item__content--center {
    background: transparent;
  }
}
</style>
