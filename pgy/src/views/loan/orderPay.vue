<template>
  <div id="order-pay">
    <div>
      <h1 class="list-title opt-between">
        <span class="tit-text">{{ title }}</span>

        <Button class="tit-btn" type="info" icon="ios-reload" size="large" @click="RefreshList">刷新列表</Button>
      </h1>
    </div>
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
            <Icon type="clipboard"></Icon>支付记录
            <span class="count-num">总数：{{Page.count}}</span>
          </h3>
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
    <order-modal :modalShow="Order.modal" :data="Order.row" @CloseModal="OrderCancel"></order-modal>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt } from "@/util/util";
import AuditModal from "@/components/infoModal/AuditModal";
import OrderModal from "@/components/infoModal/OrderModal";
import { getOrderOne } from "@/util/getData";
import Clipboard from "clipboard";
export default {
  name: "orderPay",
  components: {
    AuditModal,
    OrderModal
  },
  data() {
    return {
      title: "支付记录",
      loading: false,
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
          title: "流水号",
          align: "center",
          key: "serial_num",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.serial_num,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.serial_num
                )
              ]
            );
          }
        },
        {
          title: "姓名",
          width: "100",
          align: "center",
          key: "pay_name",
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
                  src: params.row.pay_name
                }
              },
              params.row.pay_name
            );
          }
        },
        {
          title: "手机号",
          width: "140",
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
        {
          title: "金额",
          align: "center",
          width: "90",
          key: "price"
        },
        {
          title: "用途",
          width: "90",
          align: "center",
          key: "pay_type"
        },
        {
          title: "状态",
          align: "center",
          key: "status"
        },
        {
          title: "银行",
          align: "center",
          key: "pay_bank"
        },
        {
          title: "卡号",
          width: "160",
          align: "center",
          key: "pay_bank_num"
        },
        {
          title: "支付时间",
          align: "center",
          width: "160",
          key: "pay_time"
        },
        {
          title: "操作",
          key: "operation",
          width: "160",
          align: "center",
          render: (h, params) => {
            return h("div", this.RenderBtn(h, params, this.BtnData));
          }
        }
      ],
      Page: {
        count: 0,
        cur: 1,
        size: 20
      },
      ScreenData: {
        key: ""
      },
      BtnData: [],
      UserData: [],
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
    DetailsOpt(row) {
      getOrderOne({ id: row.order_id }).then(d => {
        this.Order.modal = true;
        this.Order.row = d.data;
      });
    },
    OrderCancel() {
      this.Order.modal = false;
      this.Order.row = {};
    },
    //刷新
    RefreshList() {
      this.InitData({ page: this.Page.cur, num: this.Page.size }).then(() => {
        this.$Message.success("刷新成功");
      });
    },
    //查询结果
    SimpleSearch() {
      this.Page.cur = 1;

      this.InitData({
        page: this.Page.cur,
        num: this.Page.size,
        key: this.ScreenData.key
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
        this.$post("/backend/new-loan/pay-log-list", params).then(d => {
          var res_item = ["", "放款", "还款", "展期费"];
          var res_item2 = ["失败", "成功"];
          let res = d.data.list;
          for (let i = 0; res.length > i; i++) {
            res[i].pay_type = res_item[res[i].pay_type];
            res[i].status = res_item2[res[i].status];
          }
          this.Page.count = d.data.count;
          this.RowUserData = res;
          this.UserData = res;
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
    AuditPanel(row) {
      //用户面板
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
      //this.InitData({status:this.ScreenData.status,page:this.Page.cur,num:this.Page.size});
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
