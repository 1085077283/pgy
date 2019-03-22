<template>
  <div id="review-panel">
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
          <Form ref="formInline" :model="formInline" inline :label-width="60">
            <!-- <FormItem label="类型">
                    <Select v-model="formInline.chargeType" placeholder='请选择要查询的类型'>
                        <Option v-for="(item,index) in chargeType" :key="index" :value='index'>{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="流水号">
                    <Input type="text" v-model="formInline.serial_number" placeholder='请输入流水号' ></Input>
                </FormItem>
                <FormItem label="订单号">
                    <Input type="text" v-model="formInline.charge" placeholder='请输入关联单号' ></Input>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="formInline.status" placeholder='请选择状态' >
                        <Option v-for="(item,index) in status" :key="index" :value="index">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="执行时间">
                        <DatePicker type="date" placeholder="选择开始时间" v-model="formInline.start_date_str"></DatePicker> -
                        <DatePicker type="date" placeholder="选择结束时间" v-model="formInline.end_date_str"></DatePicker>
            </FormItem>-->
            <!-- <FormItem label="订单号">
              <Input type="text" v-model="formInline.charge" placeholder="请输入订单号"></Input>
            </FormItem>-->
            <FormItem label="手机号">
              <Input type="text" v-model="formInline.key" placeholder="请输入手机号"></Input>
            </FormItem>
            <FormItem label="扣费类型">
              <Select v-model="formInline.type" placeholder="请选择要查询的类型" style="width:170px">
                <Option
                  v-for="(item,index) in chargeType"
                  :key="index"
                  :value="item.name"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <!-- <FormItem label="状态">
              <Input type="text" v-model="formInline.charge" placeholder="请输入状态"></Input>
            </FormItem>-->
            <FormItem label="执行时间">
              <DatePicker type="date" placeholder="选择开始时间" v-model="formInline.start_time"></DatePicker>-
              <DatePicker type="date" placeholder="选择结束时间" v-model="formInline.end_time"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit(formInline)">查询</Button>
              <Button type="default" @click="reset()">重置</Button>
            </FormItem>
          </Form>
          <!-- <div class="form-group">
            <label class="form-label">检索：</label>
            <Input v-model="ScreenData.key" style="width: 200px" @on-enter="SimpleSearch"></Input>
          </div>-->
        </div>
      </Card>
    </div>
    <div class="screen-area" style="margin-top:20px">
      <Card>
        <div class="opt-box">
          <div style="width:100%">
            <Row>
              <Col span="16">
                <span>当前余额:{{allDate.balance}}元</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>收入总金额:{{allDate.income}}元</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>支出总金额:{{allDate.expenditure}}元</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a>
                  <span @click="recharge">点击充值</span>
                </a>
              </Col>
              <!-- <Col span=8><span><router-link to="/recharge/rechargeIndex">点击充值</router-link></span></Col> -->
              <Col span="8">
                <span>当前总收入:{{allDate.curr_income}}元</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>当前总支出:{{allDate.curr_expenditure}}元</span>
              </Col>
              <!-- <Col span="4">
                <a ><span @click="transfer">线下转账</span></a>
              </Col>-->
            </Row>
            <Row>
              <Col span="24"></Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>费用列表
          </h3>
        </div>
        <Table border :columns="UserCol" :data="taskData" :loading="loading"></Table>
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
    <Modal v-model="rechargeModal.modal" title=" " @on-visible-change="ClosePic">
      <Form :model="rechargeModal.data" label-position="right" :label-width="100">
        <!-- <div>请联系您的商务进行充值</div> -->
        <div v-show="tabSwitch">微信支付金额: &nbsp;
          <Input
            v-model="value"
            placeholder="请输入充值金额单位(元)"
            @on-enter="paySub"
            style="width: 300px"
          />&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="info" @click="paySub">提交</Button>
        </div>
        <!-- <FormItem label="充值金额 ：">
          <Input v-model="rechargeModal.data.money"></Input>
        </FormItem>-->
      </Form>
      <div v-show="!tabSwitch" class="imgBack">
        <img :src="imgPay" alt>
        <div>充值成功后，余额一般5-10分钟内到帐，如有长时间未到帐问题，咨询客服。</div>
      </div>
      <div slot="footer">
        <!-- <Button type="text" @click="ModalCancel" size="large">取消</Button>
        <Button type="primary" @click="SubmitOver" size="large">充值</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt, cztime } from "@/util/util";
import { chargeList, listAuthGet } from "@/util/getData";

export default {
  name: "rechargeList",
  data() {
    return {
      imgPay: "",
      tabSwitch: true,
      value: "",
      title: "费用明细",
      auth_id: "",
      allDate: "",
      loading: true,
      chargeType: [],
      status: {
        1: "成功",
        2: "失败"
      },
      formInline: {},
      UserCol: [
        {
          title: "流水号",
          width: "280",
          align: "center",
          key: "number"
          // render: (h, params) => {
          //   return this.chargeType[params.row.type];
          // }
        },
        // {
        //   title: "关联订单号",
        //   width: "100",
        //   align: "center",
        //   key: "serial_number"
        // },
        {
          title: "手机号",
          align: "center",
          key: "phone"
        },
        {
          title: "扣费类型",
          align: "center",
          key: "remark"
          // render: (h, params) => {
          //   return this.chargeType[params.row.type];
          // }
        },
        {
          title: "金额",
          align: "center",
          key: "money"
        },
        // {
        //   title: "状态",
        //   align: "center", key: "charge_money"
        // },
        {
          title: "时间",
          align: "center",
          key: "create_at"
          // render: (h, params) => {
          //   return crtTimeFtt(params.row.created_at);
          // }
        }
        // {
        //   title: '状态',
        //   align: "center", key: 'status',
        //   render:(h,params)=>{
        //       return this.status[params.row.status]
        //   }
        // },
        // {
        //   title: '备注',
        //   align: "center", key: 'remark'
        // }
      ],
      taskData: [], //表格数据
      BtnData: [], //按钮数据
      task: {
        modal: false,
        data: {
          task_name: "",
          status: "",
          task_tag: "",
          task_time_info: "",
          task_function_name: ""
        }
      },
      //初始分页信息
      Page: {
        count: 0,
        page: 1,
        size: 20
      },
      Order: {
        modal: false,
        userId: ""
      },
      Audit: {
        modal: false,
        id: "",
        allId: "",
        btn: ""
      },
      rechargeModal: {
        modal: false,
        data: {
          username: "",
          money: ""
        }
      }
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    //获取按钮信息
    listAuthGet({ auth_id: this.auth_id }).then(d => {
      this.BtnData = d.data.operation;
    });
    this.InitData();
  },
  methods: {
    ClosePic(obj) {
      if (obj == false) {
        this.InitData();
      }
    },
    //充值
    paySub() {
      var msg = this.value;
      if (Number(msg) != "NaN" && msg != "") {
        this.$post("/backend/finance-new-loan/uni-pay", { price: msg }).then(
          d => {
            console.log(d);
            if (d.status == 1) {
              this.imgPay = d.data.image;
              this.tabSwitch = false;
            } else {
              this.$Message.error(d.message);
            }
          }
        );
      } else {
        this.$Message.error("请输入正确的金额!");
      }
    },
    //转帐
    transfer() {},
    recharge() {
      this.tabSwitch = true;
      this.value = "";
      this.imgPay = "";
      this.rechargeModal = {
        modal: true,
        data: {
          username: "",
          money: ""
        }
      };
    },
    //取消
    ModalCancel() {
      this.rechargeModal.modal = false;
    },

    handleSubmit(formName) {
      var _data = {};
      var that = this;
      for (var key in formName) {
        _data[key] = formName[key];
      }

      if (_data.start_time != "") {
        _data.start_time = cztime(_data.start_time);
      }
      if (_data.end_time != "") {
        _data.end_time = cztime(_data.end_time);
      }
      if (_data.type != "") {
        this.chargeType.forEach(val => {
          if (_data.type == val.name) {
            _data.type = val.id;
          }
        });
      }
      this.InitData(_data);
    },
    reset(formName) {
      this.formInline = {};
    },
    RefreshList() {
      this.loading = true;
      this.formInline = {};
      this.InitData();
    },
    //查询结果
    SimpleSearch() {
      this.InitData(this.ScreenData);
    },
    //初始化数据
    InitData(params) {
      this.loading = true;
      //列表数据获取
      this.$fetch("/backend/wallet/bill-list", params).then(d => {
        // chargeList(
        //   Object.assign(params, { page: this.Page.cur, num: this.Page.size })
        // ).then(d => {
        let res = d.data;
        this.allDate = res;
        this.Page.count = d.data.total;
        this.taskData = res.lists;
        this.loading = false;
      });
      this.$fetch("/backend/wallet/type-list").then(d => {
        this.chargeType = d.data.lists;
      });
    },

    //改变页数
    ChangePage(curpage) {
      this.Page.page = curpage;
      this.InitData(this.Page);
    },
    //改变显示条数
    ChangeSize(size) {
      this.Page.size = size;
      this.InitData(this.Page);
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
.opt-box {
  font-size: 12px;
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
.count-span {
  font-size: 18px;
  padding: 0 5px;
  color: #d7000f;
}
.auth-icon {
  width: 32px;
  height: 32px;
  display: inline-block;
  margin-right: 5px;
  &.TB {
    background: url("../../assets/images/taobao.png") no-repeat center;
    background-size: cover;
  }
  &.MB {
    background: url("../../assets/images/phone.png") no-repeat center;
    background-size: cover;
  }
  &.JD {
    background: url("../../assets/images/phone.png") no-repeat center;
    background-size: cover;
  }
}
.imgBack {
  text-align: center;
}
</style>
