<template>
  <div id="consumer">
    <div id="listRole">
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
            <div class="btn-box">
              <!-- <Button type="primary" icon="upload" @click="OpenImport">批量导入</Button> -->
              <!--<Button type="ghost" icon="reply" @click="ResetScreen">重置筛选</Button>
              <Button type="success" icon="search" @click="SimpleSearch">查询结果</Button>-->
              <!-- <Button type="warning" icon="clipboard" @click="SeniorShow">高级检索</Button> -->
            </div>
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
              <!-- <Button type="info" size="large" icon="chatbox" @click="GroupAppOpt">群发消息</Button>
              <Button type="primary" size="large" icon="archive" @click="ExportData">导出数据</Button>-->
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
      <Modal v-model="SeniorModal" class="all-modal" :width="600" @on-ok="SeniorSearch">
        <h2 slot="header">高级筛选</h2>
        <Form class="ipt-form" :model="SeniorData" label-position="right" :label-width="120" inline>
          <FormItem label="用户类型：">
            <Select v-model="SeniorData.type" placeholder="请选择用户类型" style="width:162px">
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </FormItem>
          <!-- <RadioGroup class="rdo-group" v-model="SeniorData.status_bz">
            <div class="chose-area">
              <Radio label="AUDIT">审核状态：</Radio>
              <Select v-model="SeniorData.sh_status" placeholder="请选择审核状态" style="width:162px">
                <Option value="1">已通过</Option>
                <Option value="2">未通过</Option>
              </Select>
            </div>
            <div class="chose-area">
              <Radio label="LOAN">交易状态：</Radio>
              <Select v-model="SeniorData.pay_status" placeholder="请选择交易状态" style="width:162px">
                <Option value="1">未借款</Option>
                <Option value="2">借款已还</Option>
                <Option value="3">正常借款中</Option>
                <Option value="4">逾期未还</Option>
                <Option value="5">展期中</Option>
                <Option value="6">展期逾期未还</Option>
              </Select>
            </div>
          </RadioGroup>-->
          <!--<div class="chose-area long">
              <Radio label="CERT" class="rz-state">认证状态：</Radio>
              <div class="option">
                <div class="opt-box">
                  <Checkbox :indeterminate="Idtmte1"
                            class="check-all1"
                            :value="CheckAll1"
                            @click.prevent.native="CheckAll(1)">基础认证</Checkbox>
                  <Checkbox :indeterminate="Idtmte2"
                            class="check-all2"
                            :value="CheckAll2"
                            @click.prevent.native="CheckAll(2)" :disabled="LimitState">提额认证</Checkbox>
                </div>
                <div class="opt-box">
                  <div class="base">
                    <CheckboxGroup v-model="BaseCheck" @on-change="BaseCheckChange">
                      <Checkbox label="RG">仅注册</Checkbox>
                      <Checkbox label="ID">身份验证</Checkbox>
                      <Checkbox label="CB">已绑卡</Checkbox>
                      <Checkbox label="MB">已运营商验证</Checkbox>
                      <Checkbox label="BI">基本资料认证</Checkbox>
                      <Checkbox label="ZM">芝麻分已认证</Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="uplimit">
                    <CheckboxGroup v-model="UpCheck" @on-change="UpCheckChange">
                      <Checkbox label="TB" :disabled="LimitState">淘宝已认证</Checkbox>
                      <Checkbox label="WX" :disabled="LimitState">微信客服认证</Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
                <div class="opt-box">
                  <div class="rdo-box">
                    <Radio v-model="RenzTypeB">并</Radio>
                    <Radio v-model="RenzTypeQ">且</Radio>
                  </div>
                </div>
              </div>
          </div>-->
          <FormItem label="来源渠道：">
            <Select v-model="SeniorData.regform" placeholder="请选择来源渠道" style="width:162px">
              <Option :value="0">今日头条</Option>
              <Option :value="1">借贷宝</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="芝麻分范围：">
            <Row style="width: 300px">
              <Col span="10">
                <Input type="text" v-model="SeniorData.start_zmop" placeholder="下限"></Input>
              </Col>
              <Col span="2" style="text-align: center">至</Col>
              <Col span="10">
                <Input type="text" v-model="SeniorData.end_zmop" placeholder="上限"></Input>
              </Col>
            </Row>
          </FormItem>-->
          <FormItem label="注册时间：">
            <DatePicker
              type="datetimerange"
              placeholder="选择日期和时间"
              format="yyyy-MM-dd HH:mm:ss"
              @on-change="PickDate"
              :value="allTime"
              style="width: 275px"
              placement="top"
            ></DatePicker>
          </FormItem>
        </Form>
        <p slot="footer">
          <Button type="ghost" @click="SeniorReset">重置</Button>
          <Button type="info" @click="SeniorSearch">提交筛选</Button>
        </p>
      </Modal>
      <ImportModal
        :modalShow="ImportState.show"
        :InitData="ImportState.tempUrl"
        @ImportSuccess="ImportOver"
        @CloseModal="CloseImport"
      ></ImportModal>
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
        :UniqueId="Audit.id"
        :AllId="Audit.allId"
        @CloseModal="AuditCancel"
      ></AuditModal>
      <OrderlistModal :modalShow="Order.modal" :UserId="Order.userId" @CloseModal="OrderCancel"></OrderlistModal>
    </div>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt, crtTimeFM } from "@/util/util";
import Clipboard from "clipboard";
import PushApp from "@/components/groupModal/PushApp";
import AuditModal from "@/components/infoModal/AuditModal";
import ImportModal from "@/components/infoModal/ImportModal";
import OrderlistModal from "@/components/infoModal/OrderlistModal";

export default {
  name: "consumerList",
  components: {
    PushApp,
    AuditModal,
    ImportModal,
    OrderlistModal
  },
  data() {
    return {
      title: "客户列表",
      auth_id: "",
      loading: true,
      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: ""
      },
      SeniorModal: false,
      LimitState: true,
      Idtmte1: false,
      BaseCheck: [],
      CheckAll1: false,
      Idtmte2: false,
      UpCheck: [],
      CheckAll2: false,
      RenzTypeB: false,
      RenzTypeQ: false,
      SeniorData: {
        name: "",
        phone: "",
        idcard: "",
        type: "",
        // status_bz: "",
        // pay_status: "",
        // sh_status: "",
        // rz_status: "",
        beginTime: "",
        endTime: "",
        regform: ""
      },
      ImportState: {
        show: false,
        tempUrl: ""
      },
      UserCol: [
        // {
        //   title: "用户ID",
        //   width: "80",
        //   align: "center", key: "id"
        // },
        {
          title: "姓名",
          key: "name",
          align: "center",
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
          key: "phone",
          align: "center",
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
        //   title: '身份证号',
        //   width: '160',
        //   key: 'idcard'
        // },{
        //   title: '芝麻分',
        //   align: 'center',
        //   key: 'zmop'
        // },
        {
          title: "客户类型",
          align: "center",
          key: "type"
        },
        {
          title: "来源渠道",
          align: "center",
          key: "title"
        },
        {
          title: "注册时间",
          width: "150",
          align: "center",
          key: "create_at"
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
      SelectData: [],
      Group: {
        SmsModal: false,
        AppmsgModal: false
      },
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
      //初始分页
      Page: {
        count: 0,
        cur: 1,
        size: 20
      },
      BtnData: [], //按钮数据
      Audit: {
        modal: false,
        id: "",
        allId: [],
        btn: ""
      },
      Order: {
        modal: false,
        userId: ""
      }
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData();
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
  watch: {
    RenzTypeB(val) {
      if (val) {
        this.RenzTypeQ = false;
      }
    },
    RenzTypeQ(val) {
      if (val) {
        this.RenzTypeB = false;
      }
    },
    CheckAll1(val) {
      if (val) {
        this.LimitState = false;
      } else {
        this.LimitState = true;
        this.Idtmte2 = false;
        this.CheckAll2 = false;
        this.UpCheck = [];
      }
    }
  },
  methods: {
    //选择时间
    PickDate(time) {
      this.allTime = time;
      this.ScreenData.sim_time = time;
      this.SeniorData.beginTime = time[0];
      this.SeniorData.endTime = time[1];
    },
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    //订单列表
    DetailsOpt(rowdata) {
      this.Order.modal = true;
      this.Order.userId = rowdata.id;
    },
    OrderCancel() {
      this.Order.modal = false;
    },
    //批量导入
    ImportData(file) {
      return false;
    },
    //筛选操作(重置筛选)
    ResetScreen() {
      for (let key in this.ScreenData) {
        this.ScreenData[key] = "";
      }
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
    //查询结果
    SimpleSearch() {
      this.SeniorReset();
      let sinfo = this.RemoveObserve(this.ScreenData);
      if (this.allTime[0] !== "") {
        sinfo.beginTime = this.allTime[0];
        sinfo.endTime = this.allTime[1];
      } else {
        sinfo.beginTime = "";
        sinfo.endTime = "";
      }
      this.InitData(sinfo).then(() => {
        // for (let key in this.ScreenData) {
        //   this.SeniorData[key] = this.ScreenData[key];
        // }
      });
    },
    //初始化列表数据
    InitData(params = {}) {
      const that = this;
      this.loading = true;
      //获取按钮信息
      this.$fetch("/backend/Menuauth/listAuthGet", {
        auth_id: this.auth_id
      }).then(d => {
        if(d.data.operation!=''){
          this.BtnData = d.data.operation;
        this.BtnData.forEach(val => {
          if (val.class === "AuditPanel") {
            this.Audit.btn = val.id;
          }
        });
        }
      });
      //列表数据获取
      return new Promise((resolve, reject) => {
        this.$post("/backend/User/get-user-list", params).then(d => {
          // console.log(d);
          
          if (d.status === 1) {
            // var regform = [
            //   "公众号",
            //   "今日头条",
            //   "借贷宝",
            //   "第三方",
            //   "同行",
            //   "信息流"
            // ];
            if (d.data.length === 0) {
              this.Page.count = 0;
              this.UserData = [];
            } else {
              let res = d.data.list;
              res.forEach((item, index) => {
                // res[index].regfrom = regform[res[index].regfrom];
                res[index].create_at =
                  crtTimeFtt(item.create_at) + " " + crtTimeFM(item.create_at);
              });
              this.Page.count = d.data.count;
              this.RowUserData = res;
              this.UserData = res;
            }
            that.loading = false;
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    /**
     * 转换中文状态成数字
     * @param data 初始数据（object）
     * @param key 转换的键值（string）
     * @param val1 1对应的字符（string）
     */
    TransNum(data, key, val1) {
      if (data[key] === "") return data;
      data[key] = data[key] === val1 ? 1 : 0;
    },
    //刷新列表
    RefreshList() {
      this.ResetPageNum();
      this.ScreenData.key = "";
      this.SeniorData.key = "";
      this.InitData().then(() => {
        this.$Message.success("刷新成功");
      });
    },
    //提交信息操作
    UploadData(url, info) {
      this.$post(url, info)
        .then(d => {
          if (d.status === 1) {
            this.$Message.success(d.message);
            this.InitData();
          } else {
            this.$Message.error(d.message);
          }
        })
        .catch(err => {
          this.$Message.error("服务器繁忙，请稍后再试！");
        });
    },
    //添加部门
    SeniorShow() {
      this.SeniorModal = true;
    },
    //高级筛选重置
    SeniorReset() {
      this.BaseCheck = [];
      this.UpCheck = [];
      this.allTime = [];
      this.RenzTypeB = false;
      this.RenzTypeQ = false;
      this.LimitState = true;
      this.CheckAll1 = false;
      this.CheckAll2 = false;
      this.Idtmte1 = false;
      this.Idtmte2 = false;
      for (let key in this.SeniorData) {
        this.SeniorData[key] = "";
      }
    },
    //高级筛选提交
    SeniorSearch() {
      if (
        !this.RenzTypeB &&
        !this.RenzTypeQ &&
        this.SeniorData.status_bz === "CERT"
      ) {
        this.$Message.error("请选择认证状态类型（并，且）");
      } else {
        if (this.RenzTypeB) {
          this.SeniorData.rz_tag = "and";
        } else {
          this.SeniorData.rz_tag = "or";
        }
        this.SeniorData.rz_status = [...this.BaseCheck, ...this.UpCheck].join(
          ","
        );
        this.InitData(this.SeniorData).then(() => {
          for (let key in this.ScreenData) {
            this.ScreenData[key] = this.SeniorData[key];
          }
          this.SeniorModal = false;
        });
      }

      //this.InitData(this.SeniorData);
    },
    //全选功能
    CheckAll(num) {
      if (num === 2 && this.LimitState) return;
      if (this[`Idtmte${num}`]) {
        this[`CheckAll${num}`] = false;
      } else {
        this[`CheckAll${num}`] = !this[`CheckAll${num}`];
      }
      this[`Idtmte${num}`] = false;

      if (this[`CheckAll${num}`]) {
        if (num === 1) {
          this.BaseCheck = ["RG", "ID", "CB", "MB", "BI", "ZM"];
        } else {
          this.UpCheck = ["TB", "WX"];
        }
      } else {
        if (num === 1) {
          this.BaseCheck = [];
        } else {
          this.UpCheck = [];
        }
      }
    },
    //多选框功能
    BaseCheckChange(data) {
      if (data.length === 6) {
        this.Idtmte1 = false;
        this.CheckAll1 = true;
      } else if (data.length > 0) {
        this.Idtmte1 = true;
        this.CheckAll1 = false;
      } else {
        this.Idtmte1 = false;
        this.CheckAll1 = false;
      }
    },
    UpCheckChange(data) {
      if (data.length === 2) {
        this.Idtmte2 = false;
        this.CheckAll2 = true;
      } else if (data.length > 0) {
        this.Idtmte2 = true;
        this.CheckAll2 = false;
      } else {
        this.Idtmte2 = false;
        this.CheckAll2 = false;
      }
    },
    //导入数据
    OpenImport() {
      this.ImportState.show = true;
    },
    CloseImport() {
      this.ImportState.show = false;
    },
    ImportOver() {
      this.ImportState.show = false;
      this.InitData();
    },
    //审核面板
    AuditPanel(row) {
      this.Audit.modal = true;
      this.Audit.id = row.id;
      let idArr = [];
      this.RowUserData.forEach(val => {
        idArr.push(val.id);
      });
      this.Audit.allId = idArr;
    },
    AuditCancel() {
      this.Audit.modal = false;
    },
    //删除用户
    Delopt(row) {
      //删除确认
      this.$Modal.confirm({
        title: "温馨提示",
        content: '<p class="confirm-text">确认删除此用户吗？</p>',
        onOk: () => {
          this.UploadData("Auth/deparDel", { id: row.id });
        }
      });
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
    },
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.SeniorData);
      sinfo.expro = 1;
      this.$post("/backend/User/get-user-list", sinfo).then(d => {
        window.location.href = d.data;
      });
    },
    //改变页数
    ChangePage(curpage) {
      let sinfo = {
        page: curpage,
        num: this.Page.size
      };
      this.InitData(sinfo).then(() => {
        this.Page.cur = curpage;
      });
    },
    //改变显示条数
    ChangeSize(size) {
      let sinfo = {
        page: 1,
        num: size
      };
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
.ipt-form {
  padding-top: 20px;
}
.card-tit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.senior-subtit {
  padding-bottom: 15px;
}
.rdo-group {
  display: block;
  padding-left: 31px;
}
.chose-area {
  display: block;
  margin-bottom: 24px;
  &.long {
    width: 100%;
    display: flex;
    flex-direction: row;
    .rz-state {
      padding-top: 110px;
    }
    .option {
      width: 450px;
      display: flex;
      flex-direction: row;
      .opt-box {
        width: 30%;
        display: flex;
        flex-direction: column;
        .check-all1 {
          padding-top: 60px;
        }
        .check-all2 {
          padding-top: 75px;
        }
        .base {
          padding-bottom: 15px;
        }
        .rdo-box {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
  }
}
.upload-btn {
  display: inline-block;
}
</style>
