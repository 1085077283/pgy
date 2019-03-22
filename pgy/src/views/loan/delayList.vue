<template>
  <div id="delay-list">
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
    </div>
    <AuditModal
      :modalShow="Audit.modal"
      :InitId="Audit.id"
      :BtnId="Audit.btn"
      :UniqueId="Audit.id"
      :AllId="Audit.allId"
      @CloseModal="AuditCancel"
    ></AuditModal>
    <ExtensionModal :modalShow="Order.modal" :data="Order.row" @CloseModal="OrderCancel"></ExtensionModal>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt } from "@/util/util";
import { getOrderOne } from "@/util/getData";
import AuditModal from "@/components/infoModal/AuditModal";
import ExtensionModal from "@/components/infoModal/ExtensionModal";
import Clipboard from "clipboard";
export default {
  name: "DelayList",
  components: {
    AuditModal,
    ExtensionModal
  },
  data() {
    return {
      title: "展期记录",
      loading: true,
      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: ""
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
          width: "80",
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
          width: "120",
          align: "center",
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
        //   title: "订单金额",
        //   align: "center",
        //   key: "order_amount"
        // },
        {
          title: "展期次数",
          align: "center",
          width: "90",
          key: "number"
        },
        {
          title: "展期金额",
          align: "center",
          // width: "200",
          key: "delay_amount"
        },
        {
          title: "展期费",
          // width: "200",
          align: "center",
          key: "fee"
        },
        {
          title: "展期天数",
          align: "center",
          key: "days",
          width: "90"
        },
        // {
        //   title: "开始日",
        //   align: "center",
        //   key: "delay_begin_time"
        // },
        // {
        //   title: "结束日",
        //   align: "center",
        //   key: "delay_end_time"
        // },
        // {
        //   title: "逾期天数",
        //   key: "overdue_days",
        //   width: "90"
        // },
        // {
        //   title: "违约金",
        //   align: "center",
        //   key: "violate_amount"
        // },
        {
          title: "状态",
          align: "center",
          key: "status",
          width: "100",
          render: (h, params) => {
            if (params.row.status == 0) {
              return "审核中";
            } else if (params.row.status == 1) {
              return "成功";
            } else {
              return "失败";
            }
          }
        },
        {
          title: "展期时间",
          align: "center",
          key: "update_at",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.update_at,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.update_at
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          // width: "230",
          render: (h, params) => {
            return h("div", this.RenderBtn(h, params, this.BtnData));
          }
        }
      ],
      BtnData: [],
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
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
    this.InitData({ page: this.Page.cur, num: this.Page.size });
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
      // getOrderOne({ id: row.order_id }).then(d => {
        this.Order.modal = true;
        this.Order.row = row;
      // });
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
      this.InitData({ page: this.Page.cur, num: this.Page.size });
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
    },
    //查询结果
    SimpleSearch() {
      this.ResetPageNum();
      let sinfo = this.RemoveObserve(this.ScreenData);
      if (this.allTime[0] !== "") {
        sinfo.start_time = this.allTime[0];
        sinfo.end_time = this.allTime[1];
      } else {
        sinfo.start_time = "";
        sinfo.end_time = "";
      }
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
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$post("/backend/order/zhanqi-order-list", params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
          this.RowUserData = res;
          this.UserData = res;
          this.loading = false;
          resolve();
        });
      });
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
      this.UploadData("/backend/Loan/delayList", sinfo).then(url => {
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
