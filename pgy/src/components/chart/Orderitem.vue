<template>
  <div class="vueBox">
    <div class="num_main">
      <div class="num_top">
        <p class="num_title">{{datas.title}}</p>
        <div class="opy-around">
          <div class="num_box" v-for="item in num" :key="item">
            <img src="../../assets/images/num.png" alt>
            <p class="num_number">{{item}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "number",
  data() {
    return {
      animate: false
    };
  },
  props: ["datas"],
  created: function() {
    this.num = this.datas.num.split("");
   
  },
  methods: {
   
  }
};
</script>
<style scoped>
.marquee_box {
  display: block;
  height: 30px;
  overflow: hidden;
  display: flex;
  position: relative;
  background-color: rgba(235, 238, 240, 1);
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 30px;
}

.marquee_list li span {
  padding: 0 2px;
}
.vueBox {
  /* width: 300px; */
  /* width: 300px;
  height: 210px; */
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(235, 239, 240, 1);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 1, 0.02);
  border-radius: 3px;
  position: relative;
}
.num_box {
  position: relative;
}
.num_number {
  position: absolute;
  top: 0;
  left: 7px;
  font-size: 38px;
  color: #ffffff;
}
/* .num_top {
  position: relative;
} */
/* .opy-around{
  position: absolute;
  bottom: 0;
} */
.num_title {
  font-size: 20px;
  line-height: 47px;
  color:#666666;
}
.laba {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 8px;
  left: 9px;
}
.num_main{
  padding: 30px 40px; 
}
</style>



