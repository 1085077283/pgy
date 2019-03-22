<template>
  <div id="workliu-list">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button
        class="tit-btn"
        type="info"
        icon="ios-reload"
        size="large"
        @click="RefreshList(1)"
      >刷新列表</Button>
    </h1>
    <!--<div class="screen-area">
      <Card>
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="ios-pricetags-outline"></Icon>
            筛选查询
          </h3>
          <div class="btn-box">
            <Button type="ghost" icon="reply" @click="ResetScreen">重置筛选</Button>
            <Button type="success" icon="search" @click="SimpleSearch">查询结果</Button>
          </div>
        </div>
        <div class="opt-box">
          <Form :model="ScreenData" inline :label-width="85">
            <FormItem label="用户名：">
              <Input v-model="ScreenData.name" style="width: 120px"></Input>
            </FormItem>
            <FormItem label="用户手机号：">
              <Input v-model="ScreenData.phone" style="width: 120px"></Input>
            </FormItem>
            <FormItem label="申请时间：">
              <DatePicker type="datetimerange"
                          placeholder="选择日期和时间"
                          format="yyyy-MM-dd HH:mm:ss"
                          placement="bottom-end"
                          :value="allTime"
                          @on-change="PickDate"
                          style="width: 280px"></DatePicker>
            </FormItem>
            <FormItem label="状态：">
              <Select v-model="ScreenData.status" style="width:162px">
                <Option :value="0">未处理</Option>
                <Option :value="1">已放款</Option>
                <Option :value="-1">已拒绝</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>-->
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>放款列表
          </h3>
          <div class="btn-box">
            <!--<Button type="primary" size="large" icon="archive" @click="ExportData">导出数据</Button>-->
          </div>
        </div>
        <Table
          border
          :columns="UserCol"
          :data="UserData"
          :loading="loading"
          @on-selection-change="SelectTable"
        ></Table>
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
      :UniqueId="Audit.id"
      :BtnId="Audit.btn"
      :AllId="Audit.allId"
      @CloseModal="AuditCancel"
    ></AuditModal>
    <!-- 线下展期 -->
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>线下展期
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="Extension" :data="ExtensionData" :loading="loading"></Table>
        <div class="page-box">
          <Page
            :current="Extensionpage.cur"
            :page-size="Extensionpage.size"
            :total="Extensionpage.count"
            placement="top"
            @on-change="ExtensionChangePage"
            @on-page-size-change="ExtensionChangeSize"
            show-sizer
          ></Page>
        </div>
      </Card>
    </div>
    <!-- 线下销账 -->
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>线下销账
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="WriteOff" :data="xiaozhangData" :loading="loading"></Table>
        <div class="page-box">
          <Page
            :current="xiaozhangpage.cur"
            :page-size="xiaozhangpage.size"
            :total="xiaozhangpage.count"
            placement="top"
            @on-change="xiaozhangChangePage"
            @on-page-size-change="xiaozhangChangeSize"
            show-sizer
          ></Page>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt, crtTimeFM } from "@/util/util";
import Clipboard from "clipboard";
import GroupSms from "@/components/groupModal/GroupSms";
import AuditModal from "@/components/infoModal/AuditModal";

export default {
  name: "WorkLiuList",
  components: {
    GroupSms,
    AuditModal
  },
  data() {
    return {
      title: "财务确认",
      apiUrl: "/backend/order/order-list",
      auth_id: "",
      loading: true,
      Remark: {
        modal: false,
        loan_id: "",
        remark: ""
      },
      allTime: [],
      //基础筛选数据
      ScreenData: {
        name: "",
        phone: "",
        start_time: "",
        end_time: ""
        //status: ''
      },
      UserCol: [
        {
          title: "订单号",
          width: "190",
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
          key: "name",
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
          width: "130",
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
          title: "订单金额",
          align: "center",
          key: "loan_amount"
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            return "待放款";
          }
        },
        {
          title: "申请时间",
          width: "170",
          align: "center",
          key: "created_at"
          // render: (h, params) => {
          //   return crtTimeFtt(params.row.created_at);
          // }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "320",
          render: (h, params) => {
            return h("div", this.RenderBtn(h, params, this.BtnData));
          }
        }
      ],
      UserData: [], //表格数据
      BtnData: [],
      RowUserData: [], //获取的原始数据
      //群选打钩后操作
      SelectData: [],
      Group: {
        SmsModal: false,
        AppmsgModal: false
      },
      //初始分页信息
      Page: {
        count: 0,
        cur: 1,
        size: 10
      },
      Extensionpage: {
        count: 0,
        cur: 1,
        size: 10
      },
      xiaozhangpage: {
        count: 0,
        cur: 1,
        size: 10
      },
      //审核面板
      Audit: {
        modal: false,
        id: "",
        allId: "",
        btn: ""
      },
      //线下展期
      Extension: [
        {
          title: "订单号",
          width: "190",
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
          key: "name",
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
          width: "130",
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
          title: "展期金额",
          align: "center",
          key: "delay_amount"
        },
        {
          title: "实际收取金额",
          align: "center",
          key: "fee"
        },
        {
          title: "开始时间",
          align: "center",
          key: "delay_begin_time",
          render: (h, params) => {
            return crtTimeFtt(params.row.delay_begin_time);
          }
        },
        {
          title: "结束时间",
          align: "center",
          key: "delay_end_time",
          render: (h, params) => {
            return crtTimeFtt(params.row.delay_end_time);
          }
        },

        {
          title: "状态",
          width: "150",
          align: "center",
          key: "status",
          render: (h, params) => {
            if (params.row.status == 0) {
              return "审核中";
            } else if (params.row.status == 1) {
              return "审核通过";
            } else if (params.row.status == 2) {
              return "审核拒绝";
            }
          }
          // render: (h, params) => {
          //   return crtTimeFtt(params.row.created_at);
          // }
        },
        {
          title: "申请时间",
          align: "center",
          key: "created_at",
          render: (h, params) => {
            return crtTimeFtt(params.row.created_at) + " " + params.row.fm;
          }
        },
        {
          title: "展期类型",
          align: "center",
          key: "created_at",
          render: (h, params) => {
            if (params.row.type == 1) {
              return "线上展期";
            } else if (params.row.type == 2) {
              return "线下展期";
            } else if (params.row.type == 3) {
              return "代扣展期";
            }
          }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "320",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.zhanqiBtnData));
          }
        }
      ],
      zhanqiBtnData: [
        {
          name: "客户面板",
          color: "info",
          class: "AuditPanel"
        },
        {
          name: "通过",
          color: "success",
          class: "reviewQuitOpt"
        },
        {
          name: "拒绝",
          color: "error",
          class: "errorQuitOpt"
        }
      ],
      ExtensionData: [],
      xiaozhangData: [],
      WriteOff: [
        {
          title: "订单号",
          width: "190",
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
          key: "name",
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
                  src: params.row.name
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "手机号",
          width: "130",
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
          title: "销账金额",
          align: "center",
          key: "back_price"
        },
        {
          title: "减免金额",
          align: "center",
          key: "free_amount"
        },
        {
          title: "状态",
          width: "150",
          align: "center",
          key: "status",
          render: (h, params) => {
            if (params.row.status == 0) {
              return "审核中";
            } else if (params.row.status == 1) {
              return "通过";
            } else if (params.row.status == 2) {
              return "拒绝";
            }
          }
        },
        {
          title: "申请时间",
          align: "center",
          key: "create_at",
          render: (h, params) => {
            return crtTimeFtt(params.row.create_at) + " " + params.row.fm;
          }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "320",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.xiaozhangBtnData));
          }
        }
      ],
      xiaozhangBtnData: [
        {
          name: "客户面板",
          color: "info",
          class: "AuditPanel"
        },
        {
          name: "通过",
          color: "success",
          class: "xzreviewQuitOpt"
        },
        {
          name: "拒绝",
          color: "error",
          class: "xzerrorQuitOpt"
        }
      ]
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl, {
      page: this.Page.cur,
      num: this.Page.size,
      status: 2
    });
    this.ExtensionFunction({
      page: this.Extensionpage.cur,
      num: this.Extensionpage.size,
      status: 0
    });
    this.xiaozhangFunction({
      page: this.xiaozhangpage.cur,
      num: this.xiaozhangpage.size,
      status: 0
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
    //展期通过
    reviewQuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认展期成功通过吗？</p>`,
        onOk: () => {
          this.$post("/backend/order-delay/review-delay", {
            id: row.id,
            status: 1
          }).then(d => {
            if (d.status == 1) {
              this.$Message.success("已通过");
              this.RefreshList();
            } else {
              this.$Message.error(d.message);
            }
          });
        }
      });
    },
    errorQuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认拒绝吗？</p>`,
        onOk: () => {
          this.$post("/backend/order-delay/review-delay", {
            id: row.id,
            status: 2
          }).then(d => {
            if (d.status == 1) {
              this.$Message.success("已拒绝");
              this.RefreshList();
            } else {
              this.$Message.error(d.message);
            }
          });
        }
      });
    },
    //展期
    ExtensionFunction(params) {
      this.$post("/backend/order-delay/list", params).then(d => {
        // console.log(d);
        if (d.data.list != "") {
          d.data.list.forEach((val, index) => {
            d.data.list[index].fm = crtTimeFM(val.created_at);
          });
          this.ExtensionData = d.data.list;
          this.Extensionpage.count = d.data.count;
        }
      });
    },
    //销账
    xiaozhangFunction(params) {
      this.$post("/backend/order/review-list", params).then(d => {
        if (d.data.list != "") {
          d.data.list.forEach((val, index) => {
            d.data.list[index].fm = crtTimeFM(val.create_at);
          });
          this.xiaozhangData = d.data.list;
          this.xiaozhangpage.count = d.data.count;
        }
      });
    },
    xiaozhangChangePage(curpage) {
      this.xiaozhangFunction({
        page: curpage,
        num: this.xiaozhangpage.size,
        status: 0
      });
      this.xiaozhangpage.cur = curpage;
    },
    xiaozhangChangeSize(size) {
      this.xiaozhangFunction({
        page: this.xiaozhangpage.cur,
        num: size,
        status: 0
      });
      this.xiaozhangpage.size = size;
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
        const types = params.row.types,
          status = params.row.status,
          hktype = params.row.hktype;
        if (
          (val.class === "AddOpt" || val.class === "RejectOpt") &&
          status === 0 &&
          types === 1
        ) {
          arr.push(btn);
        } else if (
          (val.class === "DelayOpt" || val.class === "RejectOpt") &&
          types === 2
        ) {
          arr.push(btn);
        } else if (val.class === "DetailsOpt" && status === 1) {
          arr.push(btn);
        } else if (
          (val.class === "LoanOpt" || val.class === "RejectOpt") &&
          status === 2
        ) {
          arr.push(btn);
        } else if (
          (val.class === "PreRepayOpt" || val.class === "RejectOpt") &&
          types === 3 &&
          hktype === 2
        ) {
          arr.push(btn);
        } else if (
          (val.class === "WriteOffOpt" || val.class === "RejectOpt") &&
          types === 3 &&
          hktype === 3
        ) {
          arr.push(btn);
        } else if (val.class == "AuditPanel") {
          arr.push(btn);
        }
      });
      return arr;
    },
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    //筛选操作(重置筛选)
    ResetScreen() {
      for (let key in this.ScreenData) {
        this.ScreenData[key] = "";
      }
      this.allTime = "";
    },
    //多选打钩绑定数据
    SelectTable(data) {
      let idarr = [];
      if (data.length > 0) {
        data.forEach(val => {
          idarr.push(val.id);
        });
      }
      this.SelectData = idarr;
    },
    //选择时间
    PickDate(time) {
      this.allTime = time;
    },
    //查询结果
    SimpleSearch(sign = 1) {
      let sinfo = this.RemoveObserve(this.ScreenData);
      if (this.allTime[0] !== "") {
        sinfo.start_time = this.allTime[0];
        sinfo.end_time = this.allTime[1];
      } else {
        sinfo.start_time = "";
        sinfo.end_time = "";
      }
      this.InitData(this.apiUrl, sinfo).then(() => {
        if (sign) {
          this.$Message.success("筛选成功！");
        }
      });
    },
    //初始化数据
    InitData(url, params = {}) {
      this.loading = true;
      //获取按钮信息
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
        this.$post(url, params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
          this.UserData = res;
          this.RowUserData = res;
          this.loading = false;
          resolve();
        });
      });
    },
    //刷新列表
    RefreshList(msg) {
      this.Page.cur = 1;
      this.Page.size = 10;
      this.Extensionpage.cur = 1;
      this.Extensionpage.size = 10;
      this.xiaozhangpage.cur = 1;
      this.xiaozhangpage.size = 10;
      this.InitData(this.apiUrl, {
        page: this.Page.cur,
        num: this.Page.size,
        status: 2
      });
      this.ExtensionFunction({
        page: this.Extensionpage.cur,
        num: this.Extensionpage.size,
        status: 0
      });
      this.xiaozhangFunction({
        page: this.xiaozhangpage.cur,
        num: this.xiaozhangpage.size,
        status: 0
      });
      if (msg == 1) {
        this.$Message.success("刷新成功");
      }
    },
    //提交信息操作
    UploadData(url, info) {
      return new Promise(resolve => {
        this.$post(url, info)
          .then(d => {
            if (d.status === 1) {
              this.$Message.success(d.message);
              resolve(d.data);
            } else {
              this.$Message.error(d.message);
            }
          })
          .catch(err => {
            this.$Message.error("服务器繁忙，请稍后再试！");
          });
      });
    },
    //审核面板
    AuditPanel(row) {
      this.Audit.modal = true;
      this.Audit.id = row.user_id;
      let idArr = [];
      this.RowUserData.forEach(val => {
        idArr.push(val.user_id);
      });
      this.Audit.allId = idArr;
    },
    AuditCancel() {
      this.Audit.modal = false;
    },
    //移除操作
    Delopt(row) {},
    //审核通过
    AddOpt(row) {
      let url =
        row.types === 0
          ? "/backend/Loan/payDelayOk"
          : "/backend/Loan/jkAuditOk";
      let type = row.types === 0 ? "展期" : "放款审核";
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认通过该用户的${type}？</p>`,
        onOk: () => {
          this.UploadData(url, { jid: row.id, status: 1 }).then(() => {
            this.SimpleSearch(0);
          });
        }
      });
    },
    //确认服务费
    DetailsOpt(row) {
      let url =
        row.types === 0
          ? "/backend/Loan/zqWaiterOk"
          : "/backend/Loan/jkWaiterOk";
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认当前服务费</p>`,
        onOk: () => {
          this.UploadData(url, { jid: row.id }).then(() => {
            this.SimpleSearch(0);
          });
        }
      });
    },
    //放款操作
    LoanOpt(row) {
      let url =
        row.types === 0
          ? "/backend/Loan/payDelayOk"
          : "/backend/finance-new-loan/finance-audit-loan-order";
      let tips = row.types === 0 ? "确认通过该展期吗？" : "确认通过该借款吗？";
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">${tips}</p>`,
        onOk: () => {
          this.UploadData(url, {
            order_num: row.order_id,
            status: 1
          }).then(() => {
            this.InitData(this.apiUrl, {
              page: this.Page.cur,
              num: this.Page.size,
              status: 2
            });
          });
        }
      });
    },
    //展期通过操作
    DelayOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认展期成功通过吗？</p>`,
        onOk: () => {
          this.UploadData("/backend/Loan/payDelayOk", {
            jid: row.id,
            status: 1
          }).then(() => {
            this.SimpleSearch(0);
          });
        }
      });
    },
    //销账通过
    WriteOffOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认销账成功吗？</p>`,
        onOk: () => {
          this.UploadData("/backend/Loan/payMentDoneOk", { jid: row.id }).then(
            () => {
              this.SimpleSearch(0);
            }
          );
        }
      });
    },
    //销账通过
    xzreviewQuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认销账成功通过吗？</p>`,
        onOk: () => {
          this.$post("/backend/order/check-review-order", {
            id: row.id,
            status: 1,
            price: row.back_price
          }).then(d => {
            this.$Message.success(d.message);
            if (d.status == 1) {
              this.InitData(this.apiUrl, {
                page: 1,
                num: 10,
                status: 2
              });
              this.ExtensionFunction({
                page: 1,
                num: 10,
                status: 0
              });
              this.xiaozhangFunction({
                page: 1,
                num: 10,
                status: 0
              });
            }
          });
        }
      });
    },
    xzerrorQuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认拒绝吗？</p>`,
        onOk: () => {
          this.$post("/backend/order/check-review-order", {
            id: row.id,
            status: 2,
            price: row.back_price
          }).then(d => {
            // console.log(d);
            this.$Message.success(d.message);
            if (d.status == 1) {
              this.InitData(this.apiUrl, {
                page: 1,
                num: 10,
                status: 2
              });
              this.ExtensionFunction({
                page: 1,
                num: 10,
                status: 0
              });
              this.xiaozhangFunction({
                page: 1,
                num: 10,
                status: 0
              });
            }
          });
        }
      });
    },
    //提前还款
    PreRepayOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">确认提前还款成功通过吗？</p>`,
        onOk: () => {
          this.UploadData("/backend/Loan/payMentDoneOk", { jid: row.id }).then(
            () => {
              this.SimpleSearch(0);
            }
          );
        }
      });
    },
    //拒绝操作
    RejectOpt(row) {
      let url = "/backend/finance-new-loan/finance-audit-loan-order",
        tips = "确认拒绝该借款吗？";

      switch (row.types) {
        case 1:
          url = "";
          tips = "确认拒绝该借款吗？";
          break;
        case 2:
          url = "/backend/Loan/zqAuditOk";
          tips = "确认拒绝该展期吗？";
          break;
        case 3:
          url = "/backend/Loan/hkDeTo";
          tips = "确认拒绝该还款吗？";
          break;
      }
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">${tips}</p>`,
        onOk: () => {
          this.UploadData(url, { order_num: row.order_id }).then(d => {
            /*let num = '';
              this.UserData.forEach((val,index)=>{
                if(val.id === row.id){
                  num = index;
                }
              });
              this.UserData = [...this.UserData.slice(0, num),...this.UserData.slice(num+1,this.UserData.length)];*/
            // this.SimpleSearch(0);

            this.InitData(this.apiUrl, { page: 1, num: 20, status: 2 }).then(
              () => {}
            );
          });
        }
      });
    },
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.ScreenData);
      sinfo.expro = 1;
      this.UploadData(this.apiUrl, sinfo).then(url => {
        //window.location.href = url;
      });
    },
    //改变页数
    ChangePage(curpage) {
      let sinfo = Object.assign(this.ScreenData, {
        page: curpage,
        num: this.Page.size,
        status: 2
      });
      this.InitData(this.apiUrl, sinfo).then(() => {
        this.Page.cur = curpage;
      });
    },
    ExtensionChangePage(curpage) {
      let sinfo = {
        page: curpage,
        num: this.Extensionpage.size,
        status: 0
      };
      this.ExtensionFunction(sinfo);
      this.Extensionpage.cur = curpage;
    },
    ExtensionChangeSize(size) {
      let sinfo = {
        page: 1,
        num: size,
        status: 0
      };
      this.ExtensionFunction(sinfo);
      this.Extensionpage.cur = 1;
      this.Extensionpage.size = size;
    },

    //改变显示条数
    ChangeSize(size) {
      let sinfo = Object.assign(this.ScreenData, {
        page: 1,
        num: size,
        status: 2
      });
      this.InitData(this.apiUrl, sinfo).then(() => {
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
