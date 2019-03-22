<template>
  <div id="ding-list">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <div class="opt-box">
            <h3>
              <Icon type="clipboard"></Icon>配置列表
            </h3>
            <Poptip placement="right">
              <h4 class="ml-10">
                <Icon type="ios-help"/>
              </h4>
              <div class="api" slot="content">
                <p>信贷管理后台今日截止12:00点数据</p>
                <p>1:注册用户：1000人</p>
                <p>2:机审通过：500人</p>
                <p>3:展期费：10000元</p>
                <p>4:用户订单（新增）：200人</p>
                <p>5:用户订单（续借）：100人</p>
                <p>6:放款人数/金额：100人/10000元</p>
                <p>7:展期人数/金额：100人/10000元</p>
                <p>8:还款人数/金额：100人/100000元</p>
                <p>9:还款人数/金额（提前）：100人/10000元</p>
                <p>10:还款人数/金额（正常）：100人/10000元</p>
                <p>11:还款人数/金额（逾期）：100人/100000元</p>
              </div>
            </Poptip>
          </div>
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>
      </Card>
    </div>
    <Modal v-model="DingContent.editModal" title="修改发送地址" @on-ok="urlok" @on-cancel="urlcancel">
      <Form :model="DingContent" label-position="top">
        <FormItem label="发送地址">
          <Input v-model="DingContent.url"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="DingContent.modal"
      title="业绩推送内容"
      @on-ok="ok"
      @on-cancel="cancel"
    >{{DingContent.content}}</Modal>
  </div>
</template>

<script>
import DingModal from "@/components/infoModal/DingModal";
import radioList from "@/components/list/radioList";
export default {
  name: "DingList",
  components: {
    DingModal
  },
  data() {
    return {
      title: "",
      apiUrl: "/backend/ding-config/list",
      auth_id: "",
      loading: true,
      DingContent: {
        modal: false,
        content: "",
        editModal: false,
        url: "",
        id: ""
      },
      //模板详情
      DingDetail: {
        modal: false,
        id: "",
        title: "",
        content: [],
        btns: []
      },
      //模板添加编辑模型
      ModalData: {
        edit: {
          status: false,
          id: ""
        },
        show: false,
        data: {}
      },
      UserCol: [
        // {
        //   title: '序号',
        //   width: '70',
        //   align: 'center',
        //   align: "center", key: 'id'
        // },
        {
          title: "模板名",
          align: "center",
          key: "title"
        },
        // {
        //   title: '标志',
        //   width:'70',
        //   align: "center", key: 'tag'
        // },
        {
          title: "发送地址",
          align: "center",
          key: "url"
        },
        {
          title: "内容",
          align: "center",
          key: "content",
          render: (h, params) => {
            if (params.row.content.length < 30) {
              return params.row.content;
            } else {
              return h(
                "div",
                this.$renderBtn(h, params, [
                  { class: "showContent", name: "查看内容", color: "info" }
                ])
              );
            }
          }
        },

        // {
        //   title: '状态',
        //   key: 'operation',
        //   align: 'center',
        //   render: (h, params)=>{
        //     console.log(params)
        //     return h('div', [
        //       h(radioList, {
        //         props: {
        //           status: params.row.status,
        //           id :params.row.id,
        //           index:params.index,
        //           datas :this.UserData,
        //           url:'/backend/ding-config/change-status'
        //         },
        //       })
        //     ]);
        //   }
        // },
        {
          title: "编辑",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
      ],
      UserData: [], //表格数据
      BtnData: []
    };
  },
  created() {
    this.auth_id = this.$getLocal("auth_id");
    this.InitData(this.apiUrl);
  },
  computed: {
    BtnSpan() {
      return 24 / this.DingDetail.btns.length;
    }
  },
  methods: {
    // ChangeStatus(row){
    //     this.$post('/backend/ding-config/change-status',{id:row.id}).then(d=>{
    //         if(d.status ==1){
    //             this.$Message.success(d.message);
    //             this.InitData(this.apiUrl)
    //         }else{
    //             this.$Message.error(d.message);
    //         }
    //     })
    // },
    ok() {
      this.DingContent.modal = false;
    },
    cancel() {
      this.DingContent.modal = false;
    },
    urlcancel() {
      this.DingContent.editModal = false;
      this.DingContent.id = "";
      this.DingContent.url = "";
    },
    urlok() {
      this.$post("/backend/ding-config/edit", {
        id: this.DingContent.id,
        url: this.DingContent.url
      }).then(d => {
        if (d.status == 1) {
          this.$Message.success(d.message);
          this.InitData(this.apiUrl);
        } else {
          this.$Message.error(d.message);
        }
      });
    },
    EditOpt(row) {
      this.DingContent.editModal = true;
      this.DingContent.id = row.id;
      this.DingContent.url = row.url;
    },
    //初始化数据
    InitData(url, params = {}) {
      const that = this;
      this.loading = true;
      //获取按钮信息
      this.$fetch("/backend/Menuauth/listAuthGet", {
        auth_id: this.auth_id
      }).then(d => {
        this.BtnData = d.data.operation;
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$fetch(url, params).then(d => {
          this.UserData = d.data;
          that.loading = false;
          resolve();
        });
      });
    },
    showContent(row) {
      this.DingContent.modal = true;
      this.DingContent.content = row.content;
    }
  }
};
</script>


<style lang="less" scoped>
.list-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: normal;
  padding-bottom: 10px;
}
.data-area {
  padding-top: 20px;
  .ivu-table-wrapper {
    border: none;
  }
  .page-box {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
.card-tit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col-center {
  text-align: center;
}
.auto-height {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.info-width {
  width: 200px;
}
.ding-title {
  font-size: 18px;
  text-align: center;
}
.ding-content {
  font-size: 14px;
  padding: 15px 35px;
  .line {
    line-height: 25px;
  }
}
.ding-btn {
  padding-top: 10px;
}
.btn-box {
  padding: 0 10px;
}
.api > p {
  display: block;
  font-weight: normal;
  font-size: 12px;
  color: #495060;
}
.ml-10 {
  margin-left: 10px;
}
</style>
