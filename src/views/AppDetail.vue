<template>
  <div class="wrapper app-detail">
    <div class="header">
      <van-nav-bar left-text="返回" left-arrow :title="appitem.app_name || '下载通'" fixed border @click-left="goBack" @click-right="reportClick">
        <van-icon name="warning-o" slot="right" size="18px"/>
      </van-nav-bar>
    </div>

    <div class="detail-wrap">
      <div class="top-title">
        <img :src="appitem.app_icon" alt="">
        <div class="left">
          <h4>{{appitem.app_name | getAppName}}</h4>
          <span>{{appitem.category}}</span>
          <p>下载数: {{appitem.app_download_count}}</p>
        </div>
      </div>
      <div class="describe">
        <p>简介</p>
        <div class="des-text" v-html="appitem.des || '无'"></div>
      </div>
      <a class="down-btn" :href="appitem.open_url" target="_blank">
        <van-button icon="down" type="info" @click="download">立即下载</van-button>
      </a>
    </div>

    <FooterImg ref="footerimg"></FooterImg>
  </div>
</template>

<script>
import FooterImg from '@/components/FooterImg.vue';
import { NavBar, Icon, Toast, Button } from 'vant';
import { report, downloadapp } from '../utils/api';

export default {
  name: 'AppDetail',
  data() {
    return {
      appitem: {}
    }
  },
  components: {
    FooterImg,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  created() {
    this.appitem = this.$route.query;
  },
  filters: {
    getAppName(name) {
      return name && name.substring(0,6) + '...';
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    reportClick() {
      var data = {
        Content: '',
        AppID: this.appitem.app_id
      }
      report(data).then(response => {
        Toast('举报成功+1');
      }).catch(err=>{
        console.log(err)
      });
    },
    download() {
      downloadapp({AppID: this.appitem.app_id}).then(res => {
        console.log(res)
      }).catch(err=>{
        console.log(err)
      });
    }
  },
  watch: {
    '$route'(to, form) {
      this.appitem = this.$route.query;
      this.$refs.footerimg.getFooterImg();
    }
  }
}
</script>

<style scoped lang="scss">
.app-detail {
  height: 100%;
  padding-bottom: 60px!important;
  .van-nav-bar__title {
    font-weight: 700;
  }
  .detail-wrap {
    padding: 0 18px;
    .top-title {
      display: flex;
      height: 120px;
      align-items: center;
      margin-top: 10px;
      img {
        width: 120px;
        height: 120px;
        margin: 5px 15px 5px 5px;
        border-radius: 12px;
      }
      .left {
        flex: 1;
        height: 100%;
        position: relative;
        h4 {
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          top: 0;
        }
        span {
          font-size: 14px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        p {
          color: red;
          font-size: 14px;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
  
  .describe {
    padding: 10px 5px;
    margin-bottom: 30px;
    p {
      margin-bottom: 15px;
      margin-top: 10px;
      font-weight: bold;
    }
    .des-text {
      font-size: 14px;
      height: 145px;
      overflow: hidden;
    }
  }
  .down-btn {
    display: block;
    text-align: center;
    .van-button {
      width: 60%;
      border-radius: 12px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
  }
  .footer-img {
    bottom: 0;
  }
}

.van-nav-bar__text, .van-nav-bar .van-icon {
  font-size: 16px;
  font-weight: bold;
}
</style>
