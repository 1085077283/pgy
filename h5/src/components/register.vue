<template>
  <div class="body">
    <div id="extend" :style="{backgroundImage:img}"></div>
    <div class="form-box">
      <div class="info-box">
        <div class="ipt-area">
          <input
            type="tel"
            size="large"
            class="ipt-box"
            v-model="SubData.phone"
            placeholder="请输入手机号码"
          >
        </div>
      </div>
      <!-- <div class="info-box">
        <div class="ipt-area left">
          <input class="ipt-box" v-model="AuthPic.Txt" type="number" placeholder="请输入图片验证码">
        </div>
        <div class="ipt-area right" @click="vernum">
          <span class="auth-pic">{{num}}</span>
        </div>
      </div>-->
      <div class="info-box">
        <div class="ipt-area left">
          <input type="tel" maxlength="4" class="ipt-box" v-model="SubData.smscode" placeholder="请输入短信验证码">
        </div>
        <div class="ipt-area right">
          <Button
            style="height:2.5em;font-size: 1.4em;line-height:1.4em"
            type="warning"
            @click="SendSms"
            long
            v-show="!IsSend"
          >{{AuthTips}}</Button>
          <Button
            style="height:2.5em;font-size: 1.4em;line-height:1.4em"
            type="warning"
            @click="align"
            long
            v-show="IsSend"
          >{{CountDown}}s</Button>
        </div>
      </div>
      <!-- <div class="info-box">
        <div class="ipt-area">
          <input class="ipt-box" v-model="SubData.password" placeholder="请输入密码">
        </div>
      </div> -->
      <div class="ipt-area">
        <Button
          style="height:2.6em;font-size: 1.4em;line-height:1.4em"
          type="warning"
          long
          @click="RegisterBtn"
        >立即申请</Button>
      </div>
      <p class="flooter">
        <Checkbox v-model="single"></Checkbox>点击申请表示同意用户协议
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { debug } from "util";

export default {
  name: "register",
  data() {
    return {
      baseUrl: "",
      title: "推广页面",
      code: "",
      bgImage: "",
      AuthTips: "获取短信",
      CodeColor: "",
      AuthPic: {
        IsShow: false,
        Data: ""
        // password
        // Txt: ""
      },
      SubColor: "",
      SubData: {
        phone: "",
        smscode: "",
        // password: ""
      },
      IsSend: false,
      CountDown: 60,
      num: "", //数字验证码
      img: "",
      single: true
    };
  },
  created() {
    this.code = this.$route.query.code;
    // this.vernum();
    this.getimg();
  },
  mounted() {
    // const title = "欣荣钱包推广";
    // document.body.style.overflow = "hidden";
    // document.setTitle = function(t) {
    //   document.title = t;
    //   var i = document.createElement("iframe");
    //   i.style.display = "none";
    //   i.onload = function() {
    //     setTimeout(function() {
    //       i.remove();
    //     }, 9);
    //   };
    //   document.body.appendChild(i);
    // };
    // document.title = title;
    // document.setTitle(title);
  },
  methods: {
    getimg() {
      this.$fetch("/backend/promote/get-img", { code: this.code }).then(d => {
        this.img = "url(" + d.img + ")";
      });
    },
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
    align() {
      this.$Message.error({ content: "请稍后再试!", duration: 6 });
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
        this.$Message.error({
          content: "请输入格式正确的手机号！!",
          duration: 6
        });
        return;
      }
      this.AuthPic.status = true;
      this.AuthPic.Data =
        this.baseUrl + "/Promote/getImgCode?phone=" + this.SubData.phone;
    },
    SendSms() {
      if (this.WrongPhone()) {
        this.$Message.error({
          content: "请输入格式正确的手机号！!",
          duration: 6
        });
        return;
      }
      // else if (this.AuthPic.password === "") {
      //   this.$Message.error("请先输入密码！");
      //   return;
      // }
      //短信验证码
      this.$fetch("/backend/promote/send-code", {
        phone: this.SubData.phone,
        type: 1
      }).then(d => {
        if (d.status === 1) {
          this.$Message.success("发送成功");
          this.StartCountDown();
          this.IsSend = true;
        }else if(d.status === 2){
          this.$Message.error({
          content:d.message,
          duration: 10
        });
            this.$router.push({ name: "guide" });
        } else {
          this.$Message.error(d.message);
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
        this.$Message.error({
          content: "请输入格式正确的手机号！!",
          duration: 6
        });
        return;
      } else if (this.single == false) {
        this.$Message.error({ content: "请先同意用户协议!", duration: 6 });
      } else {
        this.$fetch("/backend/promote/reg", {
          phone: this.SubData.phone,
          code: this.SubData.smscode,
          codebase: this.code
        }).then(d => {
          if (d.status == 1) {
            this.$router.push({ name: "guide" });
            this.$Message.success({ content: d.message, duration: 6 });
          } else {
            this.$Message.error({ content: d.message, duration: 6 });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" >
.body{
  height: 100vh;
}
#extend {
  width: 100vw;
  // width: 100%;
  // height: 43vh;
  height: 225px;
  background-color: #333;
  // background-image: url(../assets/Background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  position: relative;
}
.bot-info {
  text-align: center;
  color: #fff;
  font-size: 13px;
  // position: fixed;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.form-box {
  color: #333333;
  // position: fixed;
  position: absolute;
  left: 0;
  top: 45vh;
  width: 100%;
  padding: 0 12vw;
  .info-box {
    // border-bottom: 1px solid #333333;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .ipt-area {
    width: 100%;
    background-color: transparent;
    border: 0;
    // display: flex;
    // flex-direction: row;
    &.left {
      width: 57%;
    }
    &.right {
      position: absolute;
      right: 0;
      top: 1px;
      width: 40%;
      // font-size: 1.4em;
      // margin-top: 7px;

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
      // margin-left: 10px;
    }
    input[type="text"],
    #btn1,
    #btn2 {
      box-sizing: border-box;
      text-align: center;
      font-size: 1.4em;
      height: 2.7em;
      border-radius: 4px;
      border: 1px solid #c8cccf;
      color: #6a6f77;
      -web-kit-appearance: none;
      -moz-appearance: none;
      display: block;
      outline: 0;
      padding: 0 1em;
      text-decoration: none;
      width: 100%;
    }
    input[type="text"]:focus {
      border: 1px solid #ff7496;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #6a6f77;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #6a6f77;
    }
    input::-webkit-input-placeholder {
      color: #6a6f77;
    }
    // input::-ms-input-placeholder {
    //   text-align: center;
    // }
    // input::-webkit-input-placeholder {
    //   text-align: center;
    // }

    .ipt-box {
      padding-left: 15px;
      -web-kit-appearance: none;
      -moz-appearance: none;
      font-size: 1.4em;
      height: 2.5em;
      line-height: 2.5em;
      border-radius: 4px;
      border: 1px solid #c8cccf;
      color: #6a6f77;
      outline: 0;
      margin-top: 1px;
      // vtical-align:middle;
      width: 100%;
      // margin-left: 6px;
      // font-size: 12px;
      // height: 25px;
      // line-height: 25px;
      // border: none;
      // outline: none;
      background-color: transparent;
    }
    .sub-btn {
      background-image: url(../assets/now_butt.png);
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
  background-image: url(../assets/butt.png);
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
.flooter {
  margin-top: 6px;
  color: #1983f9;
  text-align: center;
}
</style>
