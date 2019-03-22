<template>
  <div id="login" class="login">
    <div class="center-area">
      <h1 class="head-text">信贷管理后台</h1>
      <div class="input-box">
        <h2 class="tips">登陆</h2>
        <Input v-model="username"
               @on-enter="signIn"
               icon="person"
               placeholder="请输入账号"
               size="large"
               class="ipt"/>
        <Input v-model="password"
               @on-enter="signIn"
               icon="locked"
               type="password"
               placeholder="请输入密码"
               size="large"
               class="ipt"/>
        <div class="other">
          <Checkbox v-model="remember" class="remember-me">记住密码</Checkbox>
        </div>
        <Button
          type="primary"
          size="large"
          @click="signIn"
          long>{{btnInfo}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import { saveLocal,getLocal } from '@/util/util'
  import router from '@/router'
  import {loginIn} from '@/util/getData'

  export default {
    name: 'Login',
    data () {
      return {
        dingding: {
          admin_url: ''
        },
        msg: 'login',
        username: '',
        password: '',
        remember: true,
        btnInfo: '登录'
      }
    },
    created(){
      this.dingding = this.$route.query;
    },
    methods:{
      signIn(){
          // this.$post('/backend/promote/reg').then(d=>{
          //   console.log(d);
          // })
          // this.$post('/backend/Login/login',{
          //    username: this.username,
          //     password: this.password
          // }).then(d=>{
          //   console.log(d);
          // })
          if(this.validateInfo()){
            return false;
          }
          const data = {
              username: this.username,
              password: this.password
          }
          this.btnInfo = '登录中...';
          loginIn(data).then((d)=>{
            // console.log(d);
              const info = d.data;
              if(d.status === 1) {
                  this.setFirstView();
                    this.$store.commit('SET_USERNAME',info.username);
                    saveLocal('token', info.token);
                    saveLocal('username', info.username);
                    saveLocal('auth_id', info.index.id);
                    saveLocal('avator', info.img);
                    saveLocal('admin_id',info.id);
                    let firstview = d.data.index.function;
                    this.$store.commit('SET_FIRST_VIEW',firstview);
                    this.$store.commit('SET_PATH', firstview);
                    //console.log(firstview);
                    router.push({
                      path: firstview
                    })
              }else{
                  this.btnInfo = '登录'
                  this.$Message.error(d.message);
              }
          })
      },
      setFirstView(){
          this.$store.dispatch('setView').then((d)=>{
            
          // let permission = JSON.stringify(this.$store.getters.permission);
          //   // console.log(permission);
          // let perdep = JSON.parse(permission);
          //   // console.log(perdep);
          // perdep.forEach((val)=>{
          //   // console.log(val);
          //   val.component = componentList[val.component];
          //   if('children' in val){
          //     val.children.forEach((vval)=>{
          //       if(vval.component in componentList){
          //         vval.component = componentList[vval.component];
          //       }else{
          //         vval.component = NoContent;
          //       }
          //     })
          //   }
          // }
        //   );
        //   router.addRoutes(perdep);
         }
        );
      },
      validateInfo(){
        if(this.username === ""){
          this.$Message.error("账号不能为空！");
          return true;
        }else if(this.password === ""){
          this.$Message.error("密码不能为空！");
          return true;
        }else{
          return false;
        }
      },
      dingTrans(){
        const params = this.dingding;
        if(this.dingding.admin_url === '/workliumob'){
          router.push({path: '/workliumob'});
        }else{
          router.push({path: '/checkover',query: params});
        }
      }
    }
  }
</script>


<style lang="less">
  .login{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #222729;
    //background: url('/static/images/sign_bg.jpg') no-repeat center;
    //background-size: 100% 100%;
    .center-area{
      position:absolute;
      top: 15%;
      left: 50%;
      width: 360px;
      margin-left: -180px;
      .head-text{
        color: #FFF;
        text-align: center;
        font-size: 32px;
        padding-bottom: 25px;
      }
      .input-box{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        background: #FFF;
        .tips{
          text-align: center;
          font-size: 16px;
          padding: 0 0 15px;
        }
        .ipt{
          padding-bottom: 10px;
        }
        .other{
          padding-bottom: 10px;

        }
      }
    }
  }
  @media screen and (max-width: 350px){
    .center-area{
      width: 300px!important;
      margin-left: -150px!important;
    }
  }
</style>
