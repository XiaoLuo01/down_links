<template>
  <div class="wrapper home">
    <Header></Header>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Banner ref="banner"></Banner>

      <div class="notice">
        <a :href="trumpet && trumpet.open_url" target="_blank">
          <van-notice-bar v-if="trumpet && trumpet.des" :text="trumpet && trumpet.des" left-icon="volume" color="red" background="#fff"/>
        </a>
        <div class="hot">
          <span>全网最方便的下载专区</span>
          <span class="hot-text" v-if="trumpet && trumpet.des">
            <a :href="trumpet && trumpet.open_url" target="_blank">
              <van-notice-bar :text="trumpet && trumpet.des" color="red" background="#fff"/>
            </a>
          </span>
        </div>
      </div>
      
      <div class="bigimg-list">
        <div class="img-item" v-for="(img, index) in bigImgs" :key="'big_'+index">
          <a :href="img.open_url" target="_blank">
            <img :src="img.image_url" alt="">
          </a>
        </div>
      </div>

      <div class="app-down">
        <h4>推荐下载</h4>
        <van-grid :column-num="3" square >
          <van-grid-item v-for="(app, index) in applists" :key="'app_'+index" >
            <a href="javascript:;" class="hot-tag" @click="goToDetail(app)">
              <img class="icon" v-if="app.tips === '热门'" src="../assets/img/hot-tag.png" alt="">
              <img class="icon" v-else-if="app.tips === '推荐'" src="../assets/img/reco-tag.png" alt="">
              <img class="app-img" :src="app.app_icon ? app.app_icon : '../assets/img/default.jpg'" alt="">
              <span class="appname">{{app.app_name}}</span>
            </a>
          </van-grid-item>
        </van-grid>
      </div>

    </van-pull-refresh>
    <FooterImg></FooterImg>
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
          this.applists = response.data.Data;
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
    }
  },
  watch: {
    '$route'(to, form) {
      Toast.loading({
        message: '加载中...'
      });
      this.getTrumpetAndBigimg();
      this.getApplist();
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  .van-notice-bar {
    padding: 0 0.15rem;
  }
  .hot {
    padding-left: 25px;
    background: url('~@/assets/img/hot.gif') left center no-repeat;
    span {
      font-size: 14px;
      vertical-align: middle;
    }
    .hot-text {
      display: inline-block;
      width: 50%;
    }
  }
  .bigimg-list {
    .img-item img{
      margin-bottom: 10px;
      border-radius: 16px;
      box-shadow: 5px 5px 5px #aaa;
    }
  }
  .app-down {
    h4 {
      margin-bottom: 8px;
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
        width: 25px;
        position: absolute;
        left: 0;
        top: -10px;
      }
      img.app-img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }
      span.appname {
        width: 100px;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
    }
  }
}
</style>
