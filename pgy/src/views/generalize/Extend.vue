<template>
  <div id="extend">
    <div class="form-box">
      <div class="info-box">
        <div class="ipt-area">
          <!-- <span class="icon">
            <Icon type="android-phone-portrait"></Icon>
          </span>-->
          <input class="ipt-box" v-model="SubData.phone" type="text" placeholder="请输入手机号码">
        </div>
      </div>
      <div class="info-box">
        <div class="ipt-area left">
          <!-- <span class="icon">
            <Icon type="image"></Icon>
          </span>-->
          <input class="ipt-box" v-model="AuthPic.Txt" type="text" placeholder="请输入图片验证码">
        </div>
        <div class="ipt-area right" @click="vernum">
          <!-- <p
            v-show="!AuthPic.status"
            @click="GetAuthPic"
            class="button"
            :style="{color: CodeColor,background: SubColor}"
          >点击获取图片</p>-->
          <!-- <img  class="auth-pic" @click="ChangeImg" :src="AuthPic.Data" alt> -->
          <span class="auth-pic">{{num}}</span>
        </div>
      </div>
      <div class="info-box">
        <div class="ipt-area left">
          <!-- <span class="icon">
            <Icon type="locked"></Icon>
          </span>-->
          <input class="ipt-box" v-model="SubData.smscode" type="text" placeholder="请输入短信验证码">
        </div>
        <div class="ipt-area right">
          <p class="button button_back" v-show="!IsSend" @click="SendSms">{{AuthTips}}</p>
          <P class="button button_back" v-show="IsSend">{{CountDown}}s</P>
        </div>
      </div>

      <div class="ipt-area">
        <p class="sub-btn" @click="RegisterBtn">
          <b>立即申请</b>
        </p>
      </div>
    </div>
    <!-- <p class="bot-info">宁波蒲公英信息科技有限公司</p> -->
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Extend",
  data() {
    return {
      baseUrl: "",
      title: "推广页面",
      code: "",
      bgImage: "",
      AuthTips: "点击获取短信",
      CodeColor: "",
      AuthPic: {
        IsShow: false,
        Data: "",
        Txt: ""
      },
      SubColor: "",
      SubData: {
        phone: "",
        smscode: ""
      },
      IsSend: false,
      CountDown: 60,
      num: "" //数字验证码
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.vernum();
  },
  mounted() {
    const title = "信贷管理后台";
    document.body.style.overflow = "hidden";
    document.setTitle = function(t) {
      document.title = t;
      var i = document.createElement("iframe");
      i.style.display = "none";
      i.onload = function() {
        setTimeout(function() {
          i.remove();
        }, 9);
      };
      document.body.appendChild(i);
    };
    document.title = title;
    document.setTitle(title);
  },
  methods: {
    //初始化数据
    // InitData(code){
    //   return new Promise((resolve)=>{
    //     this.$axios.get(this.baseUrl+'/Promote/index?code='+code).then((d)=>{
    //       const res = d.data.data;
    //       this.SubData.src = res.id;
    //       this.CodeColor = res.code_color;
    //       this.SubColor = res.submit_color;
    //       this.bgImage = `url(${res.background_img})`;
    //       resolve();
    //     })
    //   })
    // },

    //验证码
    vernum() {
      this.$fetch("/backend/promote/vernum", {}).then(d => {
        if (d.status == 1) {
          this.num = d.num;
        }
      });
    },
    WrongPhone() {
      if (!/^[1][34578][0-9]{9}$/.test(this.SubData.phone)) {
        return true;
      } else {
        return false;
      }
    },
    GetAuthPic() {
      if (this.WrongPhone()) {
        alert("请输入格式正确的手机号！");
        return;
      }
      this.AuthPic.status = true;
      this.AuthPic.Data =
        this.baseUrl + "/Promote/getImgCode?phone=" + this.SubData.phone;
    },
    SendSms() {
      if (this.WrongPhone()) {
        alert("请输入格式正确的手机号！");
        return;
      } else if (this.AuthPic.Txt === "") {
        alert("请先输入图片验证码！");
        return;
      }
      //短信验证码
      this.$fetch("/backend/promote/send-code", {
        phone: this.SubData.phone,
        type: 1
      }).then(d => {
        if(d.status===1){
          alert('发送成功');
          this.StartCountDown();
           this.IsSend=true;
        }
      });
    },
    StartCountDown() {
      setTimeout(() => {
        if (this.CountDown === 0) {
          this.CountDown = 60;
          this.AuthTips = "重新发送";
          this.IsSend = false;
        } else {
          this.CountDown--;
          this.StartCountDown();
        }
      }, 1000);
    },
    //注册
    RegisterBtn() {
      if (this.WrongPhone()) {
        alert("请输入格式正确的手机号！");
        return;
      } else if (this.AuthPic.Txt === "") {
        alert("请先输入图片验证码！");
        return;
      }
      
      this.$fetch("/backend/promote/reg", {
        phone: this.SubData.phone,
        vernum: this.AuthPic.Txt ,
        code: this.SubData.smscode
      }).then(d => {
        // console.log(d);
      });
    }
  }
};
</script>
<style lang="less" scoped>
#extend {
  width: 100vw;
  height: 100vh;
  // background-color: #333;
  background-image: url(../../assets/images/xinrong.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.bot-info {
  text-align: center;
  color: #fff;
  font-size: 13px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.form-box {
  color: #333333;
  position: fixed;
  left: 0;
  bottom: 15vh;
  width: 100%;
  padding: 0 15vw;
  .info-box {
    border-bottom: 1px solid #333333;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .ipt-area {
    width: 100%;
    height: 35px;
    line-height: 35px;
    background-color: transparent;
    border: 0;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    &.left {
      width: 57%;
    }
    &.right {
      width: 40%;
      .button {
        text-align: center;
        font-size: 14px;
        width: 100%;
      }
    }
    .icon {
      width: 28px;
      text-align: center;
      display: inline-block;
      font-size: 26px;
      margin-left: 10px;
    }
    .ipt-box {
      width: 80%;
      margin-left: 6px;
      margin-top: 5px;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      border: none;
      outline: none;
      background-color: transparent;
    }
    .sub-btn {
      background-image: url(../../assets/images/now_butt.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
}
.auth-pic {
  width: 100%;
  font-size: 18px;
  text-align: center;
  height: 100%;
  display: inline-block;
}
.button_back {
  background-image: url(../../assets/images/butt.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #333333;
  /* placeholder字体大小  */
  font-size: 14px;
  /* placeholder位置  */
  // text-align: right;
}
</style>
