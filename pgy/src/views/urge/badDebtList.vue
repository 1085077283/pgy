<template>
  <div id="bad-debt-list">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button class="tit-btn" type="info" icon="ios-reload" size="large" @click="RefreshList(1)">刷新列表</Button>
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
          <div class="btn-box">
            <!--<Button type="warning" size="large" icon="chatbubble" @click="GroupSmsOpt">群发短信</Button>
            <Button type="info" size="large" icon="chatbox" @click="GroupAppOpt">群发APP消息</Button>-->
            <!-- <Button type="warning" size="large" icon="wrench" @click="SetOverTime">设置逾期天数</Button> -->
            <!-- <Button type="primary" size="large" icon="archive" @click="ExportData">导出数据</Button> -->
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
    <!-- <Modal
      v-model="OverTime.modal"
      @on-ok="SubOverTime">
      <h2 slot="header">逾期天数设置</h2>
      <Form :label-width="120">
        <FormItem label="逾期天数：">
          <Input v-model="ScreenData.overtime" style="width: 250px;" />
        </FormItem>
      </Form>
    </Modal>-->
    <Modal v-model="WithholdModal.modal" class="beizhu" title="代扣还款">
      <!-- <Input
        v-model="WithholdModal.value"
        :disabled='true'
      />-->
      <div>将会从用户绑定的银行卡进行扣款
        <div class="text_Primary">{{this.WithholdModal.value}}</div>元
      </div>
      <div slot="footer">
        <Button type="text" @click="WithholdCancel" size="large">取消</Button>
        <Button type="primary" @click="WithholdOver" size="large">确定</Button>
      </div>
    </Modal>

    <Modal
      v-model="Remark.modal"
      @on-cancel="RemarkCancel"
      class="all-modal remark-modal"
      @on-ok="SubRemark"
    >
      <h2 slot="header">备注信息</h2>
      <div class="remark-box">
        <Input
          v-model="Remark.remark"
          ref="OutRemark"
          autofocus
          type="textarea"
          :rows="4"
          @on-enter="SubRemark"
          placeholder="请输入备注信息"
        ></Input>
      </div>
      <div slot="footer"></div>
    </Modal>
    <AuditModal
      :modalShow="Audit.modal"
      :InitId="Audit.id"
      :BtnId="Audit.btn"
      :UniqueId="Audit.unique"
      :AllId="Audit.allId"
      :back_price="Audit.back_price"
      :order_id="Audit.order_id"
      @CloseModal="AuditCancel"
    ></AuditModal>
    <!-- <OrderlistModal
      :modalShow="Order.modal"
      :UserId="Order.userId"
      @CloseModal="OrderCancel"
    ></OrderlistModal>-->
    <Modal v-model="Order.modal" :title="'催收记录( '+Order.true_name+' )'" z-index="9">
      <div class="dingdanbody" id="dialogue_box">
        <div v-for="(item,index) in beizhuData" :key="index">
          <p class="bode_time">{{item.create_at}}</p>
          <p class="bode_name">{{item.type_name}}&nbsp;{{item.fm}}</p>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div slot="footer">
        <div class="foot">
          <Button
            v-for="(item,index) in collection_type"
            :class="{active:item.cur}"
            :key="index"
            :name="item.id"
            @click="switch_btn(item.id)"
          >{{item.title}}</Button>
        </div>
        <div class="foot">
          <!-- <Dropdown trigger="custom" :visible="visible" @on-click="changeMenu">
            <Button type="success" @click="handleOpen">{{collection_default}}</Button>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(item,index) in collection_type"
                :key="index"
                :name="item.id"
                class="bode_time"
              >{{item.title}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>-->
          <Input class="inp" v-model="value" type="textarea" placeholder="请输入..."/>
          <Button type="info" @click="Submission">提交</Button>
        </div>
      </div>
    </Modal>
     <Repayment :State="Repayment.modal" :user_id="Repayment.user_id" :orderId="Repayment.orderId" @CloseModal="RepaymentCancel"></Repayment>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt, crtTimeFM } from "@/util/util";
import Clipboard from "clipboard";
import GroupSms from "@/components/groupModal/GroupSms";
import PushApp from "@/components/groupModal/PushApp";
import AuditModal from "@/components/infoModal/AuditModal";
import OrderlistModal from "@/components/infoModal/OrderlistModal";
import Repayment from "@/components/infoModal/Repayment";


export default {
  name: "badDebtList",
  components: {
    GroupSms,
    PushApp,
    AuditModal,
    OrderlistModal,
    Repayment
  },
  data() {
    return {
       Repayment: {
        modal: false,
        orderId: "",
        user_id:''
      },
      WithholdModal: {
        modal: false,
        value: "",
        orderId: ""
      },
      beizhuData: [],
      model1: false,
      RowUserData: [],
      Order: {
        modal: false,
        row: {}
      },
      visible: true,
      value: "",
      collection_type: [
        { id: 1, title: "用户停机", cur: false },
        { id: 2, title: "用户失联", cur: false },
        { id: 3, title: "承诺还款", cur: false },
        { id: 4, title: "承诺展期", cur: false },
        { id: 5, title: "拒绝还款", cur: false }
      ],
      collection_default: "选择分类",
      collection_index: "",
      title: "逾期客户",
      apiUrl: "/backend/order/delay-order-list",
      auth_id: "",
      loading: true,
      OverTime: {
        modal: false
      },
      Order: {
        modal: false,
        userId: "",
        true_name: ""
      },
      Remark: {
        modal: false,
        loan_id: "",
        remark: ""
      },
      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: "",
        overtime: 30
      },
      //审核面板
      Audit: {
        modal: false,
        id: "",
        unique: "",
        allId: "",
        btn: "",
        back_price: ""
      },
      UserCol: [
        {
          title: "订单号",
          width: "100",
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
          title: "手机",
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
          title: "应还金额",
          align: "center",
          key: "back_price"
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
          title: "最新催收记录",
          width: "200",
          align: "center",
          key: "remark"
          // render: (h, params) => {
          //   return this.RenderRemark(h, params);
          // }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "300",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
      ],
      switch_num: "", //选中数据
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
      BtnData: [],
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
        size: 20
      },
      user_id: ""
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl, { page: this.Page.cur, num: this.Page.size });
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
    WithholdOver() {
      this.$post("/backend/finance-new-loan/period-loan-order", {
        order_num: this.WithholdModal.orderId
      }).then(d => {
        if (d.status == 1) {
          this.$Message.success("扣款成功");
           this.WithholdModal = {
        modal: false,
        value: "",
        orderId: ""
      };
          this.RefreshList()
        } else {
          this.$Message.error(d.message);
        }
      });
    },
    WithholdCancel() {
      this.WithholdModal = {
        modal: false,
        value: "",
        orderId: ""
      };
    },
    RunOpt(row) {
      if (row.is_period == 1) {
        this.Repayment = {
          modal: true,
          orderId: row.order_id,
          user_id:row.user_id
        };
      } else {
      this.WithholdModal = {
        modal: true,
        value: row.back_price,
        orderId: row.order_id
      };
      }
    },
    RepaymentCancel() {
      this.RefreshList();
      this.Repayment = {
        modal: false,
        orderId: "",
        user_id:''
      };
    },
    switch_btn(obj) {
      // console.log(obj);
      this.collection_type.forEach((item, index) => {
        if (item.id == obj) {
          this.collection_type[index].cur = true;
          this.switch_num = obj;
        } else {
          this.collection_type[index].cur = false;
        }
      });
    },
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },  
    Submission() {
      if (this.value == "") {
        this.$Message.error("内容不能为空");
      } else if (this.switch_num == "") {
        this.$Message.error("类型不能为空");
      } else {
        this.$post("/backend/collection-record/add", {
          order_id: this.Order.order_id,
          content: this.value,
          collection_type: this.switch_num,
          uid: this.user_id
        }).then(d => {
          if (d.status == 1) {
            this.$Message.success("添加成功");
            this.Order.modal = false;
            this.ScreenData.key = "";
            this.InitData(this.apiUrl);
            this.value = "";
            this.switch_num = "";
            this.collection_type.forEach((item, index) => {
              this.collection_type[index].cur = false;
            });
          } else {
            this.$Message.error("添加失败");
          }
        });
      }
    },
    nextTick() {
      this.$nextTick(function() {
        var div = document.getElementById("dialogue_box");
        div.scrollTop = div.scrollHeight;
      });
    },
    changeMenu(name) {
      this.collection_index = name;
      this.visible = false;
      for (let i = 0; i < this.collection_type.length; i++) {
        if (name == this.collection_type[i].id) {
          this.collection_default = this.collection_type[i].title;
        }
      }
    },
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    //订单列表
    DetailsOpt(rowdata) {
      this.Order.modal = true;
      this.Order.order_id = rowdata.order_id;
      this.Order.true_name = rowdata.true_name;
      this.user_id = rowdata.user_id;
      this.$post("/backend/collection-record/list", {
        page: 1,
        num: 999,
        order_id: rowdata.order_id
      }).then(d => {
        d.data.list.forEach((val, index) => {
          d.data.list[index].fm = crtTimeFM(val.create_at);
          d.data.list[index].create_at = crtTimeFtt(val.create_at);
        });
        this.beizhuData = d.data.list;
        this.nextTick();
      });
    },
    OrderCancel() {
      this.Order.modal = false;
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
      this.ResetPageNum();
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
      const that = this;
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
          this.RowUserData = res;
          this.UserData = res;
          that.loading = false;
          resolve();
        });
      });
    },
    /**
     * 转换空字符串
     */
    TransText(data, key, val1) {
      data.forEach(val => {
        val[key] = val[key] === "" ? val1 : val[key];
      });
      return data;
    },
    //刷新列表
    RefreshList(msg) {
      this.ScreenData.key = "";
      this.InitData(this.apiUrl)
       if (msg == 1) {
        this.$Message.success("刷新成功");
      }
    },
    //审核面板
    AuditPanel(row) {
      this.Audit.modal = true;
      this.Audit.id = row.user_id;
      this.Audit.unique = row.loan_id;
      let idArr = [];
      this.RowUserData.forEach(val => {
        idArr.push(val.loan_id);
      });
      this.Audit.allId = idArr;
      this.Audit.back_price = row.back_price;
      this.Audit.order_id = row.order_id;
    },
    AuditCancel() {
      this.Audit.modal = false;
    },
    //标记记录
    TagClassName(row) {
      if (row.marking) {
        return "table-tag-row";
      } else {
        return "";
      }
    },
    //备注按钮
    RemarkOpt(row) {
      this.Remark.loan_id = row.loan_id;
      this.Remark.remark = row.remark;
      this.Remark.modal = true;
      this.$nextTick(() => {
        this.$refs["OutRemark"].focus();
      });
    },
    //展期功能
    // DelayOpt(row) {
    //   let tips = row.allow_delay ? "是否关闭展期？" : "是否开通展期？";
    //   this.$Modal.confirm({
    //     title: "提示",
    //     content: `<p class="confirm-text">${tips}</p>`,
    //     onOk: () => {
    //       this.UploadData("/backend/Collection/allowDelay", {
    //         uid: row.id
    //       }).then(() => {
    //         this.SimpleSearch(0);
    //       });
    //     }
    //   });
    // },
    // //标记功能
    // MarkOpt(row) {
    //   this.UploadData("/backend/Collection/marking", {
    //     loan_id: row.loan_id
    //   }).then(() => {
    //     this.SimpleSearch(0);
    //   });
    // },
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
    //群发短信
    GroupSmsOpt() {
      this.Group.SmsModal = true;
    },
    CloseSms() {
      this.Group.SmsModal = false;
    },
    SmsOpt(info) {
      this.Group.SmsModal = false;
    },
    //App推送
    GroupAppOpt() {
      this.Group.AppmsgModal = true;
    },
    CloseApp() {
      this.Group.AppmsgModal = false;
    },
    AppOpt(info) {
      let sinfo = this.RemoveObserve(info);
      sinfo.regid = sinfo.type.length > 0 ? sinfo.regid.join(",") : "";
      this.UploadData("/backend/Push/pushs", sinfo).then(() => {
        this.Group.AppmsgModal = false;
      });
      //this.Group.AppmsgModal = false;
    },
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.ScreenData);
      sinfo.expro = 1;
      this.UploadData(this.apiUrl, sinfo).then(url => {
        window.location.href = url;
      });
    },
    //设置逾期时间
    SetOverTime() {
      this.OverTime.modal = true;
    },
    SubOverTime() {
      this.SimpleSearch(0);
    },
    //改变页数
    ChangePage(curpage) {
      let sinfo = Object.assign(this.ScreenData, {
        page: curpage,
        num: this.Page.size
      });
      this.InitData(this.apiUrl, sinfo).then(() => {
        this.Page.cur = curpage;
      });
    },
    //改变显示条数
    ChangeSize(size) {
      let sinfo = Object.assign(this.ScreenData, {
        page: 1,
        num: size
      });
      this.InitData(this.apiUrl, sinfo).then(() => {
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
    //提交备注
    SubRemark() {
      this.UploadData("/backend/Collection/remark", this.Remark).then(() => {
        this.UserData.forEach(val => {
          if (val.loan_id === this.Remark.loan_id) {
            val.remark = this.Remark.remark;
          }
        });
        this.Remark.modal = false;
      });
    },
    RemarkCancel() {
      this.Remark.modal = false;
    },
    //渲染备注功能
    SetRemarkState(arr) {
      arr.forEach(val => {
        val.remark_state = false;
      });
      return arr;
    },
    SetRemark(event) {
      this.Remark.remark = event.target.value;
    },
    RenderRemark(h, params) {
      return h(
        "div",
        {
          style: {
            width: "164px",
            "min-height": "30px"
          },
          on: {
            click: () => {
              this.RemarkOpt(params.row);
            }
          }
        },
        params.row.remark
      );
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
.card-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  .sim-card {
    position: relative;
    width: 24%;
    padding: 15px;
    color: #fff;
    overflow: hidden;
    cursor: pointer;
    border-radius: 5px;
    background-color: #c3c3c3;
    .title {
      font-size: 16px;
    }
    .value {
      padding: 5px 0;
      font-size: 18px;
      .num {
        font-size: 40px;
      }
    }
    .tips {
      position: absolute;
      transition: all 0.1s linear;
      bottom: -20px;
      right: 20px;
      font-size: 14px;
    }
    &:hover {
      .tips {
        bottom: 10px;
      }
    }
    .icon {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 60px;
    }
    &.cur {
      background-color: #2db7f5;
      &:hover {
        .tips {
          bottom: -20px;
        }
      }
    }
  }
}
.foot {
  display: flex;
  margin-bottom: 10px;
  .inp {
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
.dingdanbody {
  height: 200px;
  overflow: auto;
}
.bode_time {
  text-align: center;
}
.bode_name {
  color: #2db7f5;
}
.active {
  background: #2db7f5;
  color: #fff;
  border: none;
}
.text_Primary {
  display: inline-block;
  color: #2d8cf0;
}
</style>
