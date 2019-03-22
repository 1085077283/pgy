<template>
  <div class="down_body" :width="clientWidth+'px'">
    <img v-show="Webpage=='ios'" class="guide" src="../assets/ios_down.jpg" alt>
    <!-- <img v-show="Webpage=='ios'" class="guide" src="../assets/ios_down1.jpg" alt> -->
    <!-- <img v-show="Webpage=='ios'" class="guide" src="../assets/ios_down2.jpg" alt> -->
    <div class="floot_btn" v-show="Webpage=='ios'">
      <a class="img_ios" :href="ios_url">
        <img v-show="Webpage=='ios'" class="ios_d" src="../assets/ios_down.png" alt>
      </a>
    </div>
    <img v-show="Webpage=='android'" class="guide_1" src="../assets/all_down.jpg" alt>
    <!-- <img v-show="Webpage=='android'" class="guide_1" src="../assets/all_down1.jpg" alt> -->
    <!-- <img v-show="Webpage=='android'" class="guide_1" src="../assets/all_down2.jpg" alt> -->

    <!-- <Button class="floot_btn"  type="warning" long>下载</Button> -->
      <a class="img_ios" :href="ios_url">
    <img v-show="Webpage=='android'" class="floot_ios" src="../assets/ios_btn.png" alt>
      </a>
    <img
      v-show="Webpage=='android'"
      @click="downloadAndriod"
      class="floot_andriod"
      src="../assets/andriod_btn.png"
      alt
    >
    <div v-show="weixin" class="modal_weixin" @scroll.prevent>
      <img class="weixin_img" src="../assets/cl.png" alt>
      <p>点击右上角
        <br>选择浏览器中打开
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      clientWidth: "",
      Webpage: "",
      weixin: false,
      android_url:'',
      ios_url:''
    };
  },
  created() {
    //获取下载地址
    this.urlData()
    // this.weixin = false;
    this.clientWidth = document.documentElement.clientWidth;
    let ua = navigator.userAgent.toLowerCase();
    //Android终端
    let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Ios终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isWeixinBrowser()) {
      // this.$router.push({
      //   path: "/product"
      // });
      this.Webpage = "android";
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // console.log("ios");
      this.Webpage = "ios";
      // alert("ios");
    }else{
      this.weixin = true;
    }
    } else {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // console.log("ios");
      this.Webpage = "ios";
      // alert("ios");
    } 
    else if (/(Android)/i.test(navigator.userAgent)) {
      //Android终端
      // window.location = 'http://www.xyfan.top/app.apk'
      // console.log("Android");
      this.Webpage = "android";
      // alert("Android");
    } else {
      this.Webpage = "android";
    }
    }
    function isWeixinBrowser() {
      return /micromessenger/.test(ua) ? true : false;
    }
  },
  mounted() {
    //  console.log(window.navigator.userAgent)
  },
  methods: {
    urlData(){
      this.$fetch('/backend/download/info').then(d=>{
        // console.log(d)
        if(d.status==1){
          this.android_url=d.data.android_url
          this.ios_url='itms-services://?action=download-manifest&url='+d.data.ios_url
          // this.ios_url='itms-services://?action=download-manifest&url=https://apitest.pgyxwd.com/xinrong.plist'

        }
      })
    },
    downloadIos(){
      },
    downloadAndriod(){
      window.location.href=this.android_url

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.down_body {
  position: relative;
}
.guide {
  width: 100%;
  // margin-bottom: 20px;
}
.guide_1{
  width: 100%;
  height: 100vh;

}
.floot_btn {
  position: fixed;
  // height: 40px;
  bottom: 0px;
  // width: 100%;
  // height: 80px;
  // background-color: #000000;
  // opacity: 0.7;
}
.ios_d {
  margin-top: 13px;
  width: 100%;
}
.floot_andriod {
  position: absolute;
  bottom: 60px;
  padding: 0 10px;
  width: 100%;
  z-index: 100;
}
.floot_ios {
  position: absolute;
  bottom: 140px;
  padding: 0 10px;
  width: 100%;
}
.modal_weixin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000;
  opacity: 0.8;
  -moz-opacity: 0.8;
  color: rgb(255, 255, 255);
  font-size: 1.6em;
  text-align: center;
  overflow: hidden;
  z-index: 100;
}
.weixin_img {
  margin-top: 10px;
  width: 35%;
  margin-left: 40%;
}
.img_ios {
  vertical-align: bottom;
}
// .guide {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// //   background-color: #000000;
//   background: url("../assets/Extension.png") no-repeat center;
//   background-size: 100% 100%;
// }
</style>
