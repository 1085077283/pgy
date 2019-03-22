<template>
  <div id="black-list">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button class="tit-btn" type="info" icon="ios-reload" size="large" @click="RefreshList">刷新列表</Button>
    </h1>
    <Modal v-model="RateModal.modal" title="设置配置" :width="600">
      <Form
        ref="RateModal"
        :model="RateModal.data"
        :rules="RateRules"
        label-position="right"
        :label-width="110"
      >
        <FormItem label="名字：">
          <div>{{RateModal.data.name}}</div>
        </FormItem>
        <FormItem label="反馈内容：">
          <div>{{RateModal.data.remark}}</div>
        </FormItem>
        <FormItem label="回复内容：" prop="reply_content">
          <Input
            v-model="RateModal.data.reply_content_new"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleReset('RateModal')" size="large">取消</Button>
        <Button type="primary" @click="handleSubmit('RateModal')" size="large">提交反馈</Button>
      </div>
    </Modal>
    <!-- <div class="screen-area">
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
          <div class="form-group">
            <label class="form-label">检索：</label>
            <Input v-model="ScreenData.key" style="width: 200px" @on-enter="SimpleSearch"></Input>
          </div>
        </div>
      </Card>
    </div>-->
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>数据列表
            <span class="count-num">总数：{{Page.count}}</span>
          </h3>
          <!-- <div class="btn-box">
            <Button type="primary" size="large" icon="archive" @click="ExportData">导出数据</Button>
          </div>-->
        </div>
        <Table
          border
          :columns="UserCol"
          :data="UserData"
          :loading="loading"
          :row-class-name="IsUntreated"
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
      v-model="EditModal"
      title="编辑账号">
      <Form ref="EditInfo" :model="EditInfo" :rules="ValidateRules" label-position="right" :label-width="80">
        <FormItem label="用户名" prop="name">
          <Input v-model="EditInfo.name"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="EditInfo.phone"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="idcard">
          <Input v-model="EditInfo.idcard"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="EditCancel" size="large">取消</Button>
        <Button type="primary" @click="EditOver" size="large">修改</Button>
      </div>
    </Modal>-->
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
</template>

<script>
import { getLocal, crtTimeFtt, crtTimeFM } from "@/util/util";
import Clipboard from "clipboard";
import { phoneCheck } from "@/util/valid";
import GroupSms from "@/components/groupModal/GroupSms";
import AuditModal from "@/components/infoModal/AuditModal";
import OrderlistModal from "@/components/infoModal/OrderlistModal";

export default {
  name: "BlackList",
  components: {
    GroupSms,
    AuditModal,
    OrderlistModal
  },
  data() {
    return {
      title: "用户反馈",
      BlackType: ["第三方认定黑名单", "手动设定黑名单"],
      apiUrl: "/backend/user-report/lists",
      auth_id: "",
      loading: true,
      Remark: {
        modal: false,
        loan_id: "",
        remark: ""
      },
      //操作
      //设置配置
      RateModal: {
        modal: false,
        isEdit: false,
        id: "",
        data: {}
      },
      RateRules: {
        reply_content_new: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
      },

      allTime: [],
      //基础筛选数据
      ScreenData: {
        key: ""
      },
      UserCol: [
        // {
        //   title: "序号",
        //   width: "70",
        //   align: "center",
        //   key: "id"
        // },
        {
          title: "姓名",
          align: "center",
          width: "80",
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
          align: "center",
          width: "120",
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
        //   title: '身份证号',
        //   align: "center", key: 'idcard'
        // },
        {
          title: "反馈内容",
          align: "center",
          key: "remark",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.remark,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.remark
                )
              ]
            );
          }
        },
        {
          title: "反馈时间",
          align: "center",
          width: "170",
          key: "create_at",
          render: (h, params) => {
            return (
              crtTimeFtt(params.row.create_at) +
              " " +
              crtTimeFM(params.row.create_at)
            );
          }
        },
        {
          title: "状态 ",
          align: "center",
          width: "120",
          key: "status",
          render: (h, params) => {
            let text = params.row.status === 1 ? "未处理" : "已处理";
            return h("span", text);
          }
        },
        {
          title: "处理人员",
          align: "center",
          width: "120",
          key: "nickname"
        },
        {
          title: "回复内容",
          align: "center",
          key: "reply_content",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.reply_content,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.reply_content
                )
              ]
            );
          }
        },
        {
          title: "回复时间",
          align: "center",
          width: "170",
          key: "operator_time",
          render: (h, params) => {
            if (params.row.operator_time != 0) {
              return (
                crtTimeFtt(params.row.operator_time) +
                " " +
                crtTimeFM(params.row.operator_time)
              );
            }
          }
        },
        {
          title: "操作",
          key: "operation",
          width: "140",
          align: "center",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
      ],
      UserData: [], //表格数据
      BtnData: [],
      RowUserData: [], //获取的原始数据
      //群选打钩后操作
      SelectData: [],
      //验证规则
      ValidateRules: {
        name: [{ required: true, message: "用户名不能为空！" }],
        phone: [
          { required: true, message: "手机号码不能为空！" },
          { validator: phoneCheck, trigger: "blur" }
        ],
        idcard: [{ required: true, message: "身份证号不能为空！" }]
      },
      EditModal: false,
      //编辑数据
      EditInfo: {
        uid: "",
        name: "",
        phone: "",
        idcard: ""
      },
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
      //审核面板
      Audit: {
        modal: false,
        id: "",
        allId: "",
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
    this.InitData(this.apiUrl);
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
    IsUntreated(row) {
      if (row.status === 1) {
        return "untreated";
      } else {
        return "";
      }
    },
    //取消
    handleReset(name) {
      this.$refs[name].resetFields();
      this.RateModal.modal = false;
    },
    //提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (typeof this.RateModal.data.reply_content_new !== "undefined") {
            this.RateModal.modal = false;
            let datas = this.RateModal.data;
            let data = {
              id: datas.id,
              operator_id: getLocal("admin_id"),
              reply_content: datas.reply_content_new,
              status: "2"
            };
            this.$fetch("/backend/user-report/edit", data)
              .then(d => {
                if (d.status === 1) {
                  this.$Message.success(d.message);
                  this.ScreenData.key = "";
                  this.InitData(this.apiUrl).then(() => {});
                }
              })
              .catch(err => {
                this.$Message.error("服务器繁忙，请稍后再试！");
              });
          } else {
            this.$Message.error("内容不能为空！");
          }
        }
      });
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
          this.UserData = res;
          // this.UserData.forEach(val=>{
          //   val.black = this.BlackType[val.black - 1];
          // })
          this.RowUserData = res;
          that.loading = false;
          resolve();
        });
      });
    },
    //刷新列表
    RefreshList() {
      this.ScreenData.key = "";
      this.InitData(this.apiUrl).then(() => {
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
    //编辑操作
    EditOpt(row) {
      for (let key in this.EditInfo) {
        if (key === "uid") {
          this.EditInfo.uid = row.id;
        } else {
          this.EditInfo[key] = row[key];
        }
      }
      this.EditModal = true;
    },
    EditCancel() {
      this.EditModal = false;
    },
    //提交编辑
    EditOver() {
      this.$refs["EditInfo"].validate(valid => {
        if (valid) {
          this.UploadData("/backend/Postloan/blackUp", this.EditInfo).then(
            () => {
              this.SimpleSearch(0);
            }
          );
        }
      });
    },
    //移除操作
    Delopt(row) {},
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
    EditOpt(row) {
      this.RateModal.data = row;
      this.RateModal.isEdit = true;
      this.RateModal.id = row.id;
      this.RateModal.modal = true;
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
