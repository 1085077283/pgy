<template>
  <div id="loan-list">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button class="tit-btn" type="info" icon="ios-reload" size="large" @click="RefreshList">刷新列表</Button>
    </h1>
    <div class="screen-area">
      <Card>
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="ios-pricetags-outline"></Icon>筛选查询
          </h3>
          <!--<div class="btn-box">
            <Button type="ghost" icon="reply" @click="ResetScreen">重置筛选</Button>
            <Button type="success" icon="search" @click="SimpleSearch">查询结果</Button>
          </div>-->
        </div>
        <div class="opt-box">
          <div class="form-group">
            <label class="form-label">检索：</label>
            <Input v-model="ScreenData.key" style="width: 200px" @on-enter="SimpleSearch"></Input>
          </div>
        </div>
      </Card>
    </div>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>数据列表
            <span class="count-num">总数：{{Page.count}}</span>
          </h3>
          <!-- <div class="btn-box">
            <Button type="primary" icon="archive" @click="ExportData">导出数据</Button>
          </div>-->
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>
        <div class="page-box">
          <Page
            :current="Page.cur"
            :page-size="Page.size"
            :total="Page.count"
            placement="top"
            @on-change="ChangePage"
            @on-page-size-change="ChangeSize"
            show-sizer
          ></Page>
        </div>
      </Card>
      <AuditModal
        :modalShow="Audit.modal"
        :InitId="Audit.id"
        :BtnId="Audit.btn"
        :UniqueId="Audit.id"
        :AllId="Audit.allId"
        @CloseModal="AuditCancel"
      ></AuditModal>
      <order-modal :modalShow="Order.modal" :data="Order.row" @CloseModal="OrderCancel"></order-modal>
    </div>
  </div>
</template>

<script>
import AuditModal from "@/components/infoModal/AuditModal";
import OrderModal from "@/components/infoModal/OrderModal";
import { getLocal, crtTimeFtt } from "@/util/util";
import Clipboard from "clipboard";
export default {
  name: "LoanList",
  components: {
    AuditModal,
    OrderModal
  },
  data() {
    return {
      title: "借款记录",
      loading: true,
      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: ""
        // status:3
      },
      UserCol: [
        {
          title: "订单号",
          align: "center",
          key: "order_id",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.order_id,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.order_id
                )
              ]
            );
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "true_name",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  clipBtn: true
                },
                style: {
                  cursor: "pointer",
                  color: "#0f76c7"
                },
                attrs: {
                  src: params.row.true_name
                }
              },
              params.row.true_name
            );
          }
        },
        {
          title: "手机号",
          align: "center",
          width: "130",
          key: "phone",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  clipBtn: true
                },
                style: {
                  cursor: "pointer",
                  color: "#0f76c7"
                },
                attrs: {
                  src: params.row.phone
                }
              },
              params.row.phone
            );
          }
        },
        // {
        //   title: '借款类型',
        //   align: "center", key: 'is_first',
        //   render:(h,params)=>{
        //     if(params.row.is_first==1){
        //       return '首借'
        //     }else{
        //       return '续借'
        //     }
        //   }
        // },
        {
          title: "借款次数",
          align: "center",
          key: "number"
        },
        {
          title: "订单金额",
          align: "center",
          key: "loan_amount"
        },
        {
          title: "账单金额",
          align: "center",
          key: "back_price"
        },
        {
          title: "借款日",
          align: "center",
          key: "loan_time"
        },
        {
          title: "应还日",
          align: "center",
          key: "anount_time"
        },
        {
          title: "逾期天数",
          align: "center",
          key: "delay_days"
        },
        {
          title: "违约金",
          align: "center",
          key: "delay_price"
        },
        // {
        //   title: '渠道',
        //   align: "center", key: 'channel',
        //   render:(h,params)=>{
        //     if(params.row.channel==0){
        //       return 'app'
        //     }else{
        //       return '其他'
        //     }
        //   }
        // },
         {
          title: "订单类型",
          align: "center",
          width: "100",
          key: "is_period",
          render: (h, params) => {
            if(params.row.is_period==1){
              return '分期'
            }else{
              return '标准'
            }
          }
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            return this.$store.getters.orderStatus[params.row.status];
          }
        },
        {
          title: "借款时间",
          align: "center",
          key: "created_at"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "170",
          render: (h, params) => {
            return h("div", this.RenderBtn(h, params, this.BtnData));
          }
        }
      ],
      BtnData: [],
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
      //初始分页信息
      Page: {
        count: 0,
        cur: 1,
        size: 20
      },
      Order: {
        modal: false,
        row: {}
      },
      Audit: {
        modal: false,
        id: "",
        allId: "",
        btn: ""
      }
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData({
      page: this.Page.cur,
      num: this.Page.size
    });
  },
  mounted() {
    //剪切板功能
    this.ClipBoard = new Clipboard(".clipBtn", {
      text: function(elm) {
        return elm.getAttribute("src");
      }
    });
    this.ClipBoard.on("success", e => {
      this.$Message.success("复制成功！");
    });
  },
  destroyed() {
    this.ClipBoard.destroy();
  },
  methods: {
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    DetailsOpt(row) {
      this.Order.modal = true;
      this.Order.row = row;
    },
    OrderCancel() {
      this.Order.modal = false;
      this.Order.row = {};
    },
    AuditPanel(row) {
      this.Audit.modal = true;
      this.Audit.id = row.user_id;
      let idArr = [];
      this.UserData.forEach(val => {
        idArr.push(val.user_id);
      });
      this.Audit.allId = idArr;
    },
    AuditCancel() {
      this.Audit.modal = false;
      this.InitData({ status: 3 });
    },
    //筛选操作(重置筛选)
    ResetScreen() {
      for (let key in this.ScreenData) {
        this.ScreenData[key] = "";
      }
      this.allTime = "";
    },
    //选择时间
    PickDate(time) {
      this.allTime = time;
    },
    //查询结果
    SimpleSearch() {
      this.ResetPageNum();
      let sinfo = this.RemoveObserve(this.ScreenData);

      this.InitData(sinfo).then(() => {
        this.$Message.success("筛选成功！");
      });
    },
    //初始化数据
    InitData(params = {}) {
      this.loading = true;
      this.$fetch("/backend/Menuauth/listAuthGet", {
        auth_id: this.auth_id
      }).then(d => {
        this.BtnData = d.data.operation;
        this.BtnData.forEach(val => {
          if (val.class === "AuditPanel") {
            this.Audit.btn = val.id;
          }
        });
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$post("/backend/order/borrow-order-list", params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
          this.Page.cur = 1;
          this.Page.size = 20;
          this.RowUserData = res;
          this.UserData = this.TransText(res, "error_msg", "无");
          this.loading = false;
          resolve();
        });
      });
    },
    /**
     * 转换空字符串
     * @param data 初始数据（object）
     * @param key 转换的键值（string）
     * @param val1 空对应的字符（string）
     * @returns data(object);
     */
    TransText(data, key, val1) {
      data.forEach(val => {
        val[key] = val[key] === "" ? val1 : val[key];
      });
      return data;
    },
    //刷新列表
    RefreshList() {
      this.ScreenData.key = "";
      this.ResetPageNum();
      this.InitData().then(() => {
        this.$Message.success("刷新成功");
      });
    },
    //提交信息操作
    UploadData(url, info) {
      return new Promise(resolve => {
        this.$post(url, info)
          .then(d => {
            if (d.status === 1) {
              this.$Message.success(d.message);
              resolve(d.data);
              //this.InitData();
            } else {
              this.$Message.error(d.message);
            }
          })
          .catch(err => {
            this.$Message.error("服务器繁忙，请稍后再试！");
          });
      });
    },
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.ScreenData);
      sinfo.expro = 1;
      this.UploadData("/backend/Loan/loanList", sinfo).then(url => {
        window.location.href = url;
      });
    },
    //改变页数
    ChangePage(curpage) {
      let sinfo = Object.assign(this.ScreenData, {
        page: curpage,
        num: this.Page.size
      });
      this.InitData(sinfo).then(() => {
        this.Page.cur = curpage;
      });
    },
    //改变显示条数
    ChangeSize(size) {
      let sinfo = Object.assign(this.ScreenData, {
        page: 1,
        num: size
      });
      this.InitData(sinfo).then(() => {
        this.Page.cur = 1;
        this.Page.size = size;
      });
    },
    ResetPageNum() {
      this.Page.cur = 1;
      this.Page.size = 20;
      this.ScreenData.page = 1;
      this.ScreenData.num = 20;
    },
    RenderBtn(h, params, bdata) {
      let arr = [];
      bdata.forEach(val => {
        let btn = h(
          "Button",
          {
            props: {
              type: val.color
            },
            style: {
              marginRight: "5px"
            },
            on: {
              click: () => {
                this[val.class](params.row);
              }
            }
          },
          val.name
        );
        arr.push(btn);
      });
      return arr;
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
</style>
