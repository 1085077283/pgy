<template>
  <div id="template-edit">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>
            数据列表
          </h3>
          
        </div>
        <Table border :columns="UserCol"
               :data="UserData"
               :loading="loading"></Table>
      </Card>
    </div>
    
  </div>
</template>

<script>
  import { getLocal } from '@/util/util'
  import MsgModal from '@/components/infoModal/MsgModal'
  import radioList from "@/components/list/radioList";

  export default {
    name: 'smsConfig',
    components:{
      MsgModal
    },
    data () {
      return {
        title: '',
        apiUrl: '/backend/sms-config/list',
        auth_id: '',
        loading: false,
        TextArr:{
          status: ['关闭','开启']
        },
        //添加规则
        ModeModal:{
          modal: false,
          isEdit: {
            status: false,
            id: ''
          },
          data: {
            status: 1,
            name: '',
            title_en: '',
            title: [],
            content: []
          }
        },
        UserCol: [
          // {
          //   title: '序号',
          //   width: '70',
          //   align: 'center',
          //   key: 'id'
          // },
          {
            title: '名称',
             key: 'title'
          },
          // {
          //   title: '标志',
          //   width:'70',
          //   align: "center", key: 'tag'
          // },
          {
            title: '内容',
            key: 'content'
          },
        //    {
        //   title: "状态",
        //   key: "state",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(radioList, {
        //         props: {
        //           status: params.row.status,
        //           id: params.row.id,
        //           index: params.index,
        //           datas: this.UserData,
        //           url: "/backend/sms-config/change-status"
        //         }
        //       })
        //     ]);
        //   }
        // },
        // {
        //     title: '操作',
        //     key: 'operation',
        //     align: 'center',
        //     width: '130',
        //     render: (h, params)=>{
        //       return h('div',this.RenderBtn(h, params, this.BtnData));
        //     }
        //   }
        ],
        ValidateRules:{
          title: [
            {required: true, message: '名称不能为空！'}
          ],
          content: [
            {required: true, message: '内容不能为空！'}
          ],
          title_en: [
            {required: true, message: '英文名不能为空！'}
          ]
        },
        UserData: [
          // {title:'放款到帐通知：',content:'您的帐户8249于12月1日入帐1000元.'},
          // {title:'还款提醒（还款日前一晚11：00发送）：',content:' 温馨提示，明天是您还款日的最后一天哦，请您及时处理。回T退订'},
          // {title:'还款成功通知（主动还款）：',content:' 尊敬的用户，您已成功还款1005元，恭喜您还款成功！'},
          // {title:'还款成功通知（代扣还款）：',content:'您帐户8249于12月1日通过系统自动扣款1005元，感谢您的使用。'},
          // {title:'逾期通知：',content:' 您的借款合同已到期，为避免对您的生活及工作造成不便，请尽快还款。回T退订。'},
        ],     //表格数据
        RowUserData: [],  //获取的原始数据
        BtnData: []
      }
    },
    created(){
      this.auth_id = getLocal('auth_id');
      this.InitData(this.apiUrl);
    },
    methods: {
      //循环渲染按钮
      RenderBtn(h,params,bdata){
        let res = [];
        bdata.forEach((val)=>{
          const btn = h('Button',{
            props: {
              type: val.color
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: ()=>{
                this[val.class](params.row)
              }
            },
          },val.name);
          res.push(btn);
        });
        return res;
      },
      
      //初始化数据
      InitData(url,params = {}){
        const that = this;
        this.loading = true;
        //获取按钮信息
        this.$fetch('/backend/Menuauth/listAuthGet',{auth_id: this.auth_id}).then((d)=>{
          this.BtnData = d.data.operation;
        });
        //列表数据获取
        return new Promise((resolve)=>{
          this.$post(url,params).then((d)=>{
            let res = d.data;
            this.RowUserData = res;
            this.UserData = res;
            that.loading = false;
            resolve();
          })
        })
      },
      ChangeStatus(row){
          this.$post('/backend/sms-config/change-status',{id:row.id}).then(d=>{
              if(d.status ==1){
                  this.$Message.success(d.message);
                  this.InitData(this.apiUrl)
              }else{
                  this.$Message.error(d.message);
              }
          })
      }
    }
  }
</script>


<style lang="less" scoped>
  .list-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: normal;
    padding-bottom: 10px;
  }
  .data-area{
    padding-top: 20px;
    .ivu-table-wrapper{
      border: none;
    }
    .page-box{
      padding: 20px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .card-tit{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .col-center{
    text-align: center;
  }
  .auto-height{
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .info-width{
    width: 200px;
  }
</style>
