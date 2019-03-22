<template>
  <div id="repay-list">
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
            <Input
              v-model="ScreenData.key"
              style="width: 200px;margin-right:200px"
              @on-enter="SimpleSearch"
            ></Input>
            <Button
              style="margin-left:20px"
              v-for="(item,index) in typelist"
              :key="index"
              @click="switchBar(item.val)"
              :class="{cur:Page.type==item.val}"
            >{{item.name}}</Button>

            <Select
              style="width: 180px;margin-left:30px"
              @on-change="isPeriodtpye"
              v-model="Page.is_period"
              placeholder="全部记录"
            >
              <Option
                v-for="(item,index) in chargeType"
                :key="index"
                :value="item.val"
              >{{item.name}}</Option>
            </Select>
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
        <Table border :columns="Page.type==2?UserCol:UserCol1" :data="UserData" :loading="loading"></Table>
        <div class="page-box">
          <Page
            :current="Page.page"
            :page-size="Page.num"
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
import { getLocal, crtTimeFtt, crtTimeFM } from "@/util/util";
import AuditModal from "@/components/infoModal/AuditModal";
import OrderModal from "@/components/infoModal/OrderModal";
import { getOrderOne } from "@/util/getData";
import Clipboard from "clipboard";
export default {
  name: "RepayList",
  components: {
    AuditModal,
    OrderModal
  },
  data() {
    return {
      typelist: [
        { name: "还款记录", val: "2" },
        { name: "订单记录", val: "1" }
      ],
      formInline: {
        type: ""
      },
      chargeType: [
        { name: "全部还款流水", val: "" },
        { name: "分期还款流水", val: "1" },
        { name: "标准还款流水", val: "0" }
      ],
      title: "还款记录",
      loading: true,
      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: ""
        // status: 2
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
          width: 100,
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
          title: "账单金额",
          align: "center",
          key: "back_price"
        },
        {
          title: "还款金额",
          width: "150",
          align: "center",
          key: "price"
        },
        {
          title: "剩余金额",
          align: "center",
          key: "left_price"
        },
        {
          title: "应还金额",
          align: "center",
          key: "back_price"
        },
        {
          title: "违约金",
          align: "center",
          key: "delay_price"
        },
        {
          title: "还款方式",
          align: "center",
          key: "pay_type",
          render: (h, params) => {
            if (params.row.pay_type == 0) {
              return "线上支付";
            } else if (params.row.pay_type == 1) {
              return "线下支付";
            } else if (params.row.pay_type == 2) {
              return "线下销账";
            }
          }
        },
        {
          title: "还款类型",
          align: "center",
          key: "is_period",
          render: (h, params) => {
            if (params.row.is_period == 0) {
              return "标准还款";
            } else if (params.row.is_period == 1) {
              return "分期还款";
            }
          }
        },
        {
          title: "还款时间",
          align: "center",
          key: "pay_at"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "230",
          render: (h, params) => {
            return h("div", this.RenderBtn(h, params, this.BtnData));
          }
        }
      ],
      UserCol1: [
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
          width: "100",
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
          title: "账单金额",
          align: "center",
          key: "amount_due"
        },
        {
          title: "还款金额",
          width: "150",
          align: "center",
          key: "price"
        },
        {
          title: "剩余金额",
          align: "center",
          key: "left_price"
        },
        {
          title: "应还金额",
          align: "center",
          key: "amount_due"
        },
        {
          title: "违约金",
          align: "center",
          key: "delay_price"
        },
        {
          title: "还款方式",
          align: "center",
          key: "pay_type",
          render: (h, params) => {
            if (params.row.pay_type == 0) {
              return "线上支付";
            } else if (params.row.pay_type == 1) {
              return "线下支付";
            } else if (params.row.pay_type == 2) {
              return "线下销账";
            }
          }
        },
        {
          title: "还款类型",
          align: "center",
          key: "is_period",
          render: (h, params) => {
            if (params.row.is_period == 0) {
              return "标准还款";
            } else if (params.row.is_period == 1) {
              return "分期还款";
            }
          }
        },
        {
          title: "还款时间",
          align: "center",
          key: "return_time"
          // render: (h, params) => {
          //   if (params.row.return_time != 0) {
          //     return (
          //       crtTimeFtt(params.row.return_time) +
          //       crtTimeFM(params.row.return_time)
          //     );
          //   }
          // }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "230",
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
        is_period: "",
        type: "2",
        count: 0,
        page: 1,
        num: 20
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
    this.InitData(this.Page);
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
    isPeriodtpye(obj) {
      this.Page.is_period = obj;
      this.InitData(this.Page);
    },
    switchBar(msg) {
      if (this.Page.type != msg) {
        this.Page.type = msg;
          this.$set(this.Page,'page', 1)
          this.$set(this.Page,'num', 20)
          this.Page.is_period = "";
        if (msg == 2) {
          // this.Page.page = 1;
          // this.Page.num = 20;
          this.chargeType = [
            { name: "全部还款流水", val: "" },
            { name: "分期还款流水", val: "1" },
            { name: "标准还款流水", val: "0" }
          ];
        } else {
          this.chargeType = [
            { name: "全部订单记录", val: "" },
            { name: "分期订单记录", val: "1" },
            { name: "标准订单记录", val: "0" }
          ];
        }
        this.InitData(this.Page);
      }
    },
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
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
      this.InitData(this.Page);
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
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$post("/backend/order/pay-order-list", params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
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
      this.UploadData("/backend/Loan/repaymentList", sinfo).then(url => {
        window.location.href = url;
      });
    },
    //改变页数
    ChangePage(curpage) {
      this.Page.page = curpage;

      this.InitData(this.Page);
    },
    //改变显示条数
    ChangeSize(size) {
      this.Page.num = size;
      this.Page.page = 1;

      this.InitData(this.Page);
    },
    ResetPageNum() {
      this.Page.page = 1;
      this.Page.num = 20;
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
.cur {
  background-color: #5cadff;
  color: #fff;
}
</style>
