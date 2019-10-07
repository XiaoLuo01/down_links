<template>
  <div class="wrapper message">
    <Header></Header>

    <div class="button-wrap">
      <van-button color="#ec7b1e" @click="show = true">填写新留言</van-button>
    </div>

    <p v-if="historymsg.length === 0">您还没有提交过留言</p>

    <div class="msg-wrap" v-if="show">
      <div class="input-wrap">
        <textarea @input="descInput" v-model.trim="content" placeholder="请输入内容" maxlength="120"></textarea>
        <span class="numberV">{{txtVal}}/120</span>
      </div>
      <div class="public">
        <van-button plain type="primary" @click="canelMsg">取消</van-button>
        <van-button plain color="#ec7b1e" class="public-btn" @click="publicMsg">发布</van-button>
      </div>
    </div>

    <p v-if="historymsg.length !== 0">历史留言</p>
    <div class="history-msg">
      <div class="msg-list" v-for="(msg, i) in historymsg" :key="'msg_'+i">
        <img :src="msg.icon" alt="">
        <div class="content">
          <p class="time">{{msg.time}}</p>
          <p class="text">{{msg.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { Button, Toast } from 'vant';
import { addmessage } from '../utils/api';
import avatar from '../assets/img/avatar.jpg';

export default {
  name: 'Message',
  data() {
    return {
      content: '',
      show: false,
      historymsg: [],
      txtVal: 0,
    }
  },
  components: {
    Header,
    [Button.name]: Button
  },
  created() {
    this.getHistorymsg();
  },
  methods: {
    descInput(){
      this.txtVal = this.content.length;
    },
    canelMsg() {
      this.content = '';
      this.show = false;
    },
    publicMsg() {
      if (this.content && this.content !== "") {
        addmessage({Content: this.content}).then(res => {
          Toast.success(res.data.Message);
          // 存入本地
          var storeData = this.historymsg;
          storeData.push({
            time: this.getDateStr(new Date().getTime()),
            content: this.content,
            icon: avatar
          })
          localStorage.setItem('MSG', JSON.stringify(storeData));
          setTimeout(()=>{
            this.canelMsg();
            this.getHistorymsg();
          },1000);
        }).catch(err=>{
          Toast.fail('发布失败');
          setTimeout(()=>{
            this.canelMsg();
          },1000);
          console.log(err);
        });
      } else {
        Toast('请输入内容');
      }
    },
    getHistorymsg() {
      this.historymsg = JSON.parse(localStorage.getItem('MSG')) || [];
    },
    getDateStr(seconds){
      var date = new Date(seconds)
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate(): date.getDate();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
      return currentTime
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  min-height: 100%;
  padding-bottom: 60px!important;
  background: #eee;
  .button-wrap {
    padding: 10px 0;
    text-align: center;
    .van-button--default {
      width: 100%;
      border-radius: 8px;
    }
  }
  p {
    font-size: 14px;
  }
  .msg-list {
    margin-top: 10px;
    height: 70px;
    padding: 8px;
    background: #fff;
    display: flex;
    img {
      width: 60px;
      margin-right: 10px;
    }
    p.time {
      color: #666;
      font-size: 12px;
    }
    p.text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //行数
      -webkit-box-orient: vertical;
    }
  }
  .msg-wrap {
    margin-bottom: 10px;
    .input-wrap {
      padding-top: 10px;
      position: relative;
      textarea {
        font-size: 14px;
        width: 100%;
        height: 160px;
        padding: 10px;
        outline: none;
        resize: none;
      }
      .numberV {
        position: absolute;
        bottom: 6px;
        right: 6px;
        font-size: 12px;
        color: #666;
      }
    }
    .public {
      margin-top: 10px;
      .van-button {
        width: 100px;
        border-radius: 8px;
      }
      .public-btn {
        float: right;
      }
    }
  }
}
</style>
