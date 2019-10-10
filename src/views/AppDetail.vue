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
          <h4>{{appitem.app_name}}</h4>
          <span>{{appitem.category}}</span>
          <p>下载数: {{appitem.app_download_count}}</p>
        </div>
      </div>
      <div class="describe">
        <p>简介</p>
        <div class="des-text" v-html="appitem.des || '无'"></div>
      </div>
      <a class="down-btn" :href="appitem.open_url" target="_blank">
        <van-button type="info" @click="download">立即下载</van-button>
      </a>
    </div>

    <FooterImg></FooterImg>
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
  methods: {
    goBack() {
      this.$router.go(-1);
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
    }
  }
}
</script>

<style scoped lang="scss">
.app-detail {
  .van-nav-bar__title {
    font-weight: 700;
  }
  .top-title {
    display: flex;
    height: 120px;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      margin: 5px 15px 5px 5px;
      border-radius: 12px;
    }
    .left {
      flex: 1;
      // height: 100%;
      // padding-top: 10px;
      h4 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        padding-top: 5px;
      }
      span {
        font-size: 14px;
      }
      p {
        margin-top: 15px;
        color: red;
        font-size: 14px;
      }
    }
  }
  .describe {
    padding: 10px;
    margin-bottom: 30px;
    p {
      margin-bottom: 10px;
      font-weight: bold;
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
}
</style>
