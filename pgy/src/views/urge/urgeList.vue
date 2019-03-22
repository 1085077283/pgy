<template>
  <div id="urge-list">
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
    <div class="card-box">
      <div
        v-for="(item,index) in CountData"
        class="sim-card"
        :key="index"
        :class="{cur:item.cur}"
        @click="CountList(item.type)"
      >
        <Icon class="icon" :type="item.icon"></Icon>
        <p class="title">{{ item.name }}</p>
        <p class="value">
          <span class="num">{{item.count}}</span>人
        </p>
        <span class="tips">点击查看</span>
      </div>
    </div>
    <!-- <div class="screen-area">
      <Card>
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="ios-pricetags-outline"></Icon>筛选查询
          </h3>
          <div class="btn-box">
            <Button type="ghost" icon="reply" @click="ResetScreen">重置筛选</Button>
            <Button type="success" icon="search" @click="SimpleSearch">查询结果</Button>
          </div>
        </div>
        <div class="opt-box">
          <div class="form-group">
            <label class="form-label">检索：</label>
            <Input v-model="ScreenData.key" style="width: 200px" @on-enter="SimpleSearch"></Input>
          </div>
          <Form :model="ScreenData" inline :label-width="85">
            <FormItem label="还款日：">
              <DatePicker
                type="daterange"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                placement="bottom-end"
                :value="allTime"
                @on-change="PickDate"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>-->
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
            <Button type="info" size="large" icon="chatbox" @click="GroupAppOpt">群发消息</Button>
            <Button type="warning" size="large" icon="archive" @click="OpenReport">导出催收报告</Button>
            <Button type="primary" size="large" icon="archive" @click="ExportData">导出数据</Button>
          </div>-->
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
            :page-size-opts="[20,30,40,50]"
            placement="top"
            @on-change="ChangePage"
            @on-page-size-change="ChangeSize"
            show-sizer
          ></Page>
        </div>
      </Card>
    </div>
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
    <Modal v-model="Report.modal" @on-ok="ExportReport">
      <h2 slot="header">确认报告类型</h2>
      <Form :model="Report" :label-width="120">
        <FormItem label="报告类型：">
          <Select v-model="Report.type" style="width: 200px">
            <Option :value="1">借贷宝（txt）</Option>
            <Option :value="2">外包催收（excel）</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="Order.modal" :title="'催收记录( '+Order.true_name+' )'" z-index="9">
      <div class="dingdanbody" id="dialogue_box">
        <div v-for="(item,index) in beizhuData" :key="index">
          <p class="bode_time">{{item.create_at}}</p>
          <p class="bode_name">{{item.type_name}} {{item.fm}}</p>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div slot="footer">
        <!-- <Button type="success">{{collection_default}}</Button> -->
        <div class="foot">
          <Button
            v-for="(item,index) in collection_type"
            :class="{active:item.cur}"
            :key="index"
            :name="item.id"
            @click="switch_btn(item.id)"
          >{{item.title}}</Button>
        </div>

        <!-- <Dropdown :visible="visible" @on-click="changeMenu">
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(item,index) in collection_type"
                :key="index"
                :name="item.id"
                class="bode_time"
              >{{item.title}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>-->
        <div class="foot">
          <Input class="inp" type="textarea" v-model="value" placeholder="请输入..."/>
          <Button type="info" @click="Submission">提交</Button>
        </div>
      </div>
    </Modal>
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
    <GroupSms
      :modalShow="Group.SmsModal"
      :InitData="SelectData"
      :Count="Page.count"
      @CloseModal="CloseSms"
      @UpOver="SmsOpt"
    ></GroupSms>
    <!-- <PushApp
      :modalShow="Group.AppmsgModal"
      :InitData="SelectData"
      :Count="Page.count"
      @CloseModal="CloseApp"
      @UpOver="AppOpt"
    ></PushApp>-->
    <AuditModal
      :modalShow="Audit.modal"
      :InitId="Audit.id"
      :BtnId="Audit.btn"
      :is_period="Audit.is_period"
      :UniqueId="Audit.unique"
      :AllId="Audit.allId"
      :back_price="Audit.back_price"
      :order_id="Audit.order_id"
      @CloseModal="AuditCancel"
    ></AuditModal>
    <!-- <DelayModal
      :modalShow="Delay.modal"
      :initData="Delay.data"
      @CloseModal="DelayCancel"
      @SubModal="DelaySub"
    ></DelayModal>-->
    <RepayModal
      :modalShow="Repay.modal"
      :initData="Repay.data"
      @CloseModal="RepayCancel"
      @SubModal="RepaySub"
    ></RepayModal>
    <Repayment :State="Repayment.modal" :user_id="Repayment.user_id" :orderId="Repayment.orderId" @CloseModal="RepaymentCancel"></Repayment>
    <!-- <OrderlistModal :modalShow="Order.modal" :order_id="Order.order_id" @CloseModal="OrderCancel"></OrderlistModal> -->
  </div>
</template>

<script>
import {
  getLocal,
  getYesterdayFormatDate,
  crtTimeFtt,
  crtTimeFM,
  yqtime
} from "@/util/util";
import Clipboard from "clipboard";
import GroupSms from "@/components/groupModal/GroupSms";
// import PushApp from "@/components/groupModal/PushApp";
import AuditModal from "@/components/infoModal/AuditModal";
import DelayModal from "@/components/infoModal/DelayModal";
import RepayModal from "@/components/infoModal/RepayModal";
import Repayment from "@/components/infoModal/Repayment";

// import OrderlistModal from "@/components/infoModal/OrderlistModal";

export default {
  name: "UrgeList",
  components: {
    GroupSms,
    // PushApp,
    AuditModal,
    DelayModal,
    RepayModal,
    Repayment
    // OrderlistModal
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
      visible: true,
      beizhuData: [],
      model1: false,
      RowUserData: [],
      Order: {
        modal: false,
        row: {}
      },
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
      //实时数据
      title: "催收列表",
      apiUrl: "/backend/order/collection-order-list",
      auth_id: "",
      loading: true,
      Remark: {
        modal: false,
        loan_id: 58304,
        remark: ""
      },
      Order: {
        modal: false,
        order_id: ""
      },
      allTime: [],
      //统计数据
      CountData: [
        {
          name: "今日还款",
          icon: "calendar",
          count: 0,
          type: "",
          cur: true,
          url: "/backend/order/collection-order-list"
        },
        // ,{
        //   name: '宽限日列表',
        //   icon: 'ios-search-strong',
        //   count: 0,
        //   type: 3,
        //   cur: false
        // },{
        //   name: '明天还款',
        //   icon: 'android-calendar',
        //   count: 0,
        //   type: 2,
        //   cur: false
        // }
        {
          name: "今日逾期",
          icon: "android-time",
          count: 0,
          type: "reduce",
          cur: false
        }
      ],
      //基础筛选数据
      ScreenData: {
        key: ""
      },
      UserCol: [
        {
          title: "订单号",
          key: "order_id",
          align: "center",
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
          align: "center",
          key: "remark"
          // render: (h, params) => {
          //   return this.RenderRemark(h, params);
          // }
        },
        {
          title: "操作",
          key: "operation",
          width: "300",
          align: "center",
          render: (h, params) => {
            let rule = {};
            rule.btns = [
              {
                class: "MarkOpt",
                name: "marking",
                type: "default",
                right: 1,
                wbtn: "取消标记"
              }
            ];
            rule.size = 1;
            return h("div", this.$renderBtn(h, params, this.BtnData, rule));
          }
        }
      ],
      UserData: [], //表格数据
      BtnData: [],
      RowUserData: [], //获取的原始数据
      //群选打钩后操作
      SelectData: [],
      //导出报告
      Report: {
        modal: false,
        type: 1
      },
      Group: {
        SmsModal: false,
        AppmsgModal: false
      },
      //初始分页信息
      Page: {
        count: 0,
        cur: 1,
        size: 50
      },
      //审核面板
      Audit: {
        modal: false,
        id: "",
        unique: "",
        allId: "",
        btn: ""
      },
      //展期操作
      Delay: {
        modal: false,
        data: {
          id: "",
          name: "",
          amount: ""
        }
      },
      //主动还款操作
      Repay: {
        modal: false,
        data: {
          id: "",
          name: "",
          amount: ""
        }
      },
      switch_num: "", //选中数据
      user_id: ""
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData("/backend/order/collection-order-list", { page: 1, num: 20 });
  },
  mounted() {
    //剪切板功能
    this.ClipBoard = new Clipboard(".clipBtn", {
      text: function(elm) {
        return elm.getAttribute("src");
      }
    });
    this.ClipBoard.on("success", e => {
      e.trigger.style.color = "#F00";
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
          this.RefreshList(1);
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
            this.RefreshList();
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
      this.SimpleSearch(1);
    },
    //统计列表
    CountList(num) {
      this.ResetPageNum();
      this.CountData.forEach(val => {
        if (val.type === num) {
          val.cur = true;
        } else {
          val.cur = false;
        }
      });
      let refresh = this.CountData;
      for (let i = 0; refresh.length > i; i++) {
        if (refresh[i].cur == true) {
          this.InitData(this.apiUrl, {
            page: 1,
            num: 50,
            type: refresh[i].type
          });
        }
      }
    },
    //查询结果
    SimpleSearch() {
      this.ResetPageNum();
      let refresh = this.CountData;
      for (let i = 0; refresh.length > i; i++) {
        if (refresh[i].cur == true) {
          this.InitData(this.apiUrl, {
            page: 1,
            num: 50,
            type: refresh[i].type,
            key: this.ScreenData.key
          }).then(() => {
            this.$Message.success("筛选成功！");
          });
        }
      }
    },
    //初始化数据
    InitData(url, params = {}, isinit = 0) {
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
        this.$fetch(url, params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
          this.CountData[0].count = d.data.review;
          this.CountData[1].count = d.data.reduce;
          this.UserData = res;
          this.loading = false;
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
    // 改 刷新列表
    RefreshList(msg) {
      this.ResetPageNum();
      // if (this.ScreenData.check === "") {
      //   this.ScreenData.check = 0;
      //   this.CountData[0].cur = true;
      // }
      // this.ScreenData.key = "";
      // this.ScreenData.start_time = "";
      // this.ScreenData.end_time = "";
      // this.SimpleSearch(0);
      let refresh = this.CountData;
      for (let i = 0; refresh.length > i; i++) {
        if (refresh[i].cur == true) {
          this.InitData(this.apiUrl, {
            page: 1,
            num: 50,
            type: refresh[i].type
          });
        }
      }
      if (msg == 1) {
        this.$Message.success("刷新成功");
      }
    },
    //审核面板
    AuditPanel(row) {
      console.log(row);
      
      this.Audit.modal = true;
      this.Audit.id = row.user_id;
      this.Audit.is_period = row.is_period;
      this.Audit.unique = row.loan_id;
      this.Audit.back_price = row.back_price;
      this.Audit.order_id = row.order_id;
      let idArr = [];
      this.UserData.forEach(val => {
        idArr.push(val.loan_id);
      });
      this.Audit.allId = idArr;
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
    //提交备注
    SubRemark() {
      /*if(event.keyCode === 13){
          const data = {
            loan_id: this.Remark.loan_id,
            remark: this.Remark.remark
          }
          this.UploadData('/backend/Collection/remark',data).then(()=>{
            this.UserData.forEach(val=>{
              val.remark_state = false;
              if(val.loan_id === this.Remark.loan_id){
                val.remark = this.Remark.remark;
              }
            });
          });
        }*/
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
    //展期功能
    DelayOpt(row) {
      this.Delay.modal = true;
    },
    DelayCancel() {
      this.RefreshList();
      this.Delay.modal = false;
    },
    DelaySub(data) {
      this.UploadData("/backend/Loan/payDelayRequest", data).then(() => {
        this.Delay.modal = false;
        this.InitData(this.apiUrl, this.GetCurrentScreen());
      });
    },
    RepaymentCancel() {
      this.RefreshList();
      this.Repayment = {
        modal: false,
        orderId: "",
        user_id:''
      };
    },
    //主动还款
    RepayOpt(row) {
      const data = {
        uid: row.uid,
        amount: row.amount,
        wy_amount: "",
        name: row.name
      };
      this.Repay.modal = true;
      this.Repay.data = data;
    },
    RepayCancel() {
      this.Repay.modal = false;
    },
    RepaySub(data) {
      this.UploadData("/backend/Loan/payMentDone", data).then(() => {
        this.Repay.modal = false;
        this.SimpleSearch(0);
      });
    },
    //标记功能
    MarkOpt(row) {
      this.UploadData("/backend/Collection/marking", {
        loan_id: row.loan_id
      }).then(() => {
        this.SimpleSearch(0);
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
    //群发消息
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
    OpenReport() {
      if (this.SelectData.length > 0) {
        this.Report.modal = true;
      } else {
        this.$Message.error("请先勾选要导出数据的用户！");
      }
    },
    //导出报告
    ExportReport() {
      const idAll = this.SelectData.join(",");
      const url =
        this.Report.type === 1
          ? "/backend/data-collection/jdb-handle"
          : "/backend/data-collection/wb-handle";
      this.$post(url, { id: idAll }).then(d => {
        if (d.status === 1) {
          window.location.href = d.data.download_url;
        }
      });
    },
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.ScreenData);
      sinfo.expro = 1;
      this.UploadData("/backend/Collection/CollectionList", sinfo).then(url => {
        window.location.href = url;
      });
    },
    //获取当页筛选条件
    GetCurrentScreen() {
      return Object.assign(this.ScreenData, {
        page: this.page.cur,
        num: this.Page.size
      });
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
    //重置页码
    ResetPageNum() {
      this.Page.cur = 1;
      this.Page.size = 50;
      this.ScreenData.page = 1;
      this.ScreenData.num = 50;
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
    ShowRemark(id) {
      // console.log(id);
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
.count-num {
  font-size: 14px;
  font-weight: normal;
  padding-left: 15px;
  color: #ff6614;
}
.card-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  .sim-card {
    position: relative;
    width: 48%;
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
    // flex: 1;
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
