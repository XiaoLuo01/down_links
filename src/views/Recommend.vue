<template>
  <div class="wrapper recommend">
    <Header></Header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Banner ref="banner"></Banner>

      <div class="app-down">
        <!-- <h4>推荐下载</h4> -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(app, index) in applists" :key="'app_'+index" >
            <a href="javascript:;" class="hot-tag" @click="goToDetail(app)">
              <img class="icon" v-if="app.tips === '热门'" src="../assets/img/hot-tag.png" alt="">
              <img class="icon" v-else-if="app.tips === '推荐'" src="../assets/img/reco-tag.png" alt="">
              <img class="app-img type-0" v-lazy="app.app_icon" alt="">
              <span>{{app.app_name | getAppName}}</span>
              <p>下载数: {{app.app_download_count}}</p>
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
import { applist } from '../utils/api';

export default {
  name: 'Home',
  data() {
    return {
      trumpet: '',
      hotText: '',
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
    this.getApplist();
  },
  filters: {
    getAppName(name) {
      return name.substring(0,6);
    }
  },
  methods: {
    getApplist() {
      applist({ appcount: 0 }).then(response => {
        if (response.data.Data) {
          this.applists = response.data.Data;
        }
        this.isLoading = false;
        Toast.clear();
      }).catch(err=>{
        console.log(err);
        this.isLoading = false;
        Toast.clear();
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
      this.getApplist();
    }
  },
  watch: {
    '$route'(to, form) {
      Toast.loading({
        message: '加载中...'
      });
      this.getApplist();
      // this.$refs.footerimg.getFooterImg();
    }
  }
}
</script>

<style scoped lang="scss">
.recommend {
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
        display: inline-flex;
        align-items: center;
        flex-direction: column;
        color: #333;
        font-size: 14px;
        position: relative;
      }
      img.icon {
        width: 32px;
        position: absolute;
        left: 0;
        top: -10px;
      }
      img.app-img {
        width: 70px;
        height: 70px;
        border-radius: 8px;
      }
      span {
        width: 100px;
        margin-top: 10px;
        color: #919191;
        text-align: center;
      }
      p {
        color: red;
        font-size: 10px;
        margin-top: 4px;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 25px;
      }
    }
  }
}
</style>

