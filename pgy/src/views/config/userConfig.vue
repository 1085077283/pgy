<template>
  <div id="user-config">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area" style="margin-bottom: 20px;">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <div class="opt-box">
            <h3>
              <Icon type="images"></Icon>利率配置
            </h3>
            <Poptip placement="right">
              <h4 class="ml-10">
                <Icon type="ios-help"/>
              </h4>
              <div class="api" slot="content">
                <p>还款金额=借款金额+借款金额*日利率*时间+违约金</p>
                <p>展期费=逾期违约金+借款金额*展期费率</p>
                <p>违约金=借款金额*违约金率*逾期时间</p>
                <p>违约金 < 借款金额</p>
                <p>违约金 >= 借款金额，违约金不再增加</p>
              </div>
            </Poptip>
          </div>
          <div class="btn-box">
            <Button type="warning" size="large" icon="plus-circled" @click="AddRate">添加利率配置</Button>
          </div>
        </div>
        <Table border :columns="RateCol" :data="RateData" :loading="Rateloading"></Table>
      </Card>
    </div>
    <Modal v-model="RateModal.modal" title="设置配置" :width="600">
      <Form
        ref="RateModal"
        :model="RateModal.data"
        :rules="RateRules"
        label-position="right"
        :label-width="110"
      >
        <FormItem label="费率名称：" prop="rate_name">
          <Input v-model="RateModal.data.rate_name"></Input>
        </FormItem>
        <FormItem label="借款费率：" prop="borrowing_rate">
          <Input v-model="RateModal.data.borrowing_rate"></Input>
        </FormItem>
        <FormItem label="展期费率：" prop="rollover_rate">
          <Input v-model="RateModal.data.rollover_rate"></Input>
        </FormItem>
        <FormItem label="逾期费率：" prop="overdue_rate">
          <Input v-model="RateModal.data.overdue_rate"></Input>
        </FormItem>
        <FormItem label="日利率：" prop="daily_rate">
          <Input v-model="RateModal.data.daily_rate"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleReset('RateModal')" size="large">取消</Button>
        <Button type="primary" @click="handleSubmit('RateModal')" size="large">保存</Button>
      </div>
    </Modal>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>配置列表
          </h3>
          <div class="btn-box">
            <Button type="warning" size="large" icon="wrench" @click="AddModeModal">添加类型</Button>
          </div>
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>
      </Card>
    </div>

    <Modal v-model="ModeModal.modal" title="设置等级">
      <Form
        ref="ModeModal"
        :model="ModeModal.data"
        :rules="ValidateRules"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="等级：" prop="level">
          <Input v-model="ModeModal.data.level"/>
        </FormItem>
        <FormItem label="额度：" prop="money_limit">
          <Input v-model="ModeModal.data.money_limit"/>
        </FormItem>
        <FormItem label="借款天数：" prop="days">
          <Input v-model="ModeModal.data.days"/>
        </FormItem>
        <FormItem label="费率类型：" prop="config_rate_id">
          <Select v-model="ModeModal.data.config_rate_id" style="width:200px">
            <Option
              v-for="(item,index) in RateData"
              :key="index"
              :value="item.id"
            >{{ item.rate_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="默认类型" prop="is_default">
          <Select v-model="ModeModal.data.is_default" style="width:200px">
            <Option v-for="(item,index) in moren" :key="index" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否逾期过" v-show="ModeModal.data.is_default==0">
          <Select v-model="ModeModal.data.config_rate_id" style="width:200px">
            <Option v-for="(item,index) in moren" :key="index" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="续借次数"  v-show="ModeModal.data.is_default==0">
          <Select v-model="ModeModal.data.symbol" style="width:50px">
            <Option v-for="(item,index) in symbollist" :key="index" :value="item.value">{{ item.value }}</Option>
          </Select>
          <Input v-model="ModeModal.data.num" style="width:200px" />
        </FormItem>
        <!-- <FormItem label="备注：">
          <Input v-model="ModeModal.data.remark" type="textarea" :rows="3"></Input>
        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="ModalCancel" size="large">取消</Button>
        <Button type="primary" @click="AddOver" size="large">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocal } from "@/util/util";
import radioList from "@/components/list/radioList";
export default {
  name: "UserConfig",
  comments: {
    radioList
  },
  data() {
    const validateRate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("利率必填"));
      } else if (rule.trigger == "jk") {
        if (isNaN(value) || value > 0.3) {
          callback(new Error("借款费率必须是数字并且小于等于0.3"));
        }
        callback();
      } else if (rule.trigger == "zq") {
        if (isNaN(value) || value > 0.35) {
          callback(new Error("展期费率必须是数字并且小于等于0.35"));
        }
        callback();
      } else if (rule.trigger == "yq") {
        if (isNaN(value) || value > 0.1) {
          callback(new Error("逾期费率必须是数字并且小于等于0.1"));
        }
        callback();
      } else if (rule.trigger == "rl") {
        if (isNaN(value) || value > 0.06) {
          callback(new Error("日利率必须是数字并且小于等于0.06"));
        }
        callback();
      }
    };
    return {
      symbollist: [
        {
          value: ">",
         
        },
        {
          value: "<",
          
        },
        {
          value: "=",
          
        }
      ],
      moren: [{ id: 0, name: "非默认" }, { id: 1, name: "默认" }],
      title: "",
      apiUrl: "/backend/Sysconfig/sysLevelList",
      auth_id: "",
      loading: true,
      Rateloading: false,
      TextArr: {
        status: ["关闭", "开启"]
      },
      //设置配置
      RateModal: {
        modal: false,
        isEdit: false,
        id: "",
        data: {
          rate_name: "",
          borrowing_rate: "",
          rollover_rate: "",
          overdue_rate: "",
          daily_rate: ""
        }
      },
      RateBtnData: [
        {
          name: "编辑",
          color: "primary",
          class: "EditRate"
        }
        // {
        //   name: '启用/禁用',
        //   color: 'warning',
        //   class: 'ChangeRate'
        // }
      ],
      RateRules: {
        rate_name: [
          { required: true, message: "费率名称不能为空", trigger: "change" }
        ],
        borrowing_rate: [{ validator: validateRate, trigger: "jk" }],
        rollover_rate: [{ validator: validateRate, trigger: "zq" }],
        overdue_rate: [{ validator: validateRate, trigger: "yq" }],
        daily_rate: [{ validator: validateRate, trigger: "rl" }]
      },
      RateData: [],
      //添加用户类型
      ModeModal: {
        modal: false,
        isEdit: false,
        id: "",
        data: {
          level: "",
          days: "",
          config_rate_id: "",
          remark: "",
          status: "",
          is_default: "",
          config_rate_id: "",
          num: ""
        }
      },
      UserCol: [
        // {
        //   title: "序号",
        //   width: "70",
        //   align: "center",
        //   key: "id"
        // },
        {
          title: "客户类型",
          align: "center",
          key: "level"
        },
        {
          title: "借款天数",
          align: "center",
          key: "days"
        },
        {
          title: "是否可逾期",
          align: "center",
          key: "is_reduce",
          render: (h, params) => {
            if (params.row.is_default == 1) {
              return "可逾期";
            } else if (params.row.is_default == 2) {
              return "不可逾期";
            } else if (params.row.is_default == 0) {
              return "未设置";
            }
          }
        },
        {
          title: "续借次数",
          align: "center",
          key: "num"
        },
        {
          title: "额度",
          align: "center",
          key: "money_limit"
        },
        {
          title: "费率类型",
          align: "center",
          key: "rate_name"
        },
        {
          title: "是否默认",
          align: "center",
          key: "is_default",
          render: (h, params) => {
            if (params.row.is_default == 0) {
              return "非默认";
            } else {
              return "默认";
            }
          }
        },
        // {
        //   title: "备注",
        //   align: "center", key: "remark"
        // },
        // {

        // {
        //   title: "状态",
        //   key: "state",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(radioList, {
        //         props: {
        //           status: params.row.status,
        //           id: params.row.id,
        //           index: params.index,
        //           datas: this.UserData,
        //           url: "/backend/Sysconfig/sysLevelDisable"
        //         }
        //       })
        //     ]);
        //   }
        // },
        {
          title: "编辑",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
      ],
      RateCol: [
        // {
        //   title: "序号",
        //   width: "70",
        //   align: "center",
        //   key: "id"
        // },
        {
          title: "费率名",
          align: "center",
          key: "rate_name"
        },
        {
          title: "借款费率",
          align: "center",
          key: "borrowing_rate"
        },
        {
          title: "展期费率",
          align: "center",
          key: "rollover_rate"
        },
        {
          title: "逾期费率",
          align: "center",
          key: "overdue_rate"
        },
        {
          title: "日利率",
          align: "center",
          key: "daily_rate"
        },

        // {
        //   title: "状态",
        //   key: "operation",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(radioList, {
        //         props: {
        //           status: params.row.status,
        //           id: params.row.id,
        //           index: params.index,
        //           datas: this.UserData,
        //           url: "/backend/rate/disable"
        //         }
        //       })
        //     ]);
        //   }
        // },
        {
          title: "编辑",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.RateBtnData));
          }
        }
      ],
      ValidateRules: {
        config_rate_id: [{ required: true, message: "费率不能为空" }],
        money_limit: [{ required: true, message: "额度不能为空" }],
        level: [{ required: true, message: "等级不能为空！" }],
        is_default: [{ required: true, message: "类型不能为空！" }],
        days: [{ required: true, message: "借款天数不能为空！" }]
      },
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
      BtnData: []
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl);
    this.getConfigRate();
  },
  methods: {
    // ChangeRate(row){
    //   //禁用费率
    //   this.$fetch('/backend/rate/disable',{id: row.id}).then((d)=>{
    //     if(d.status === 1){
    //         this.$Message.success(d.message);
    //         this.getConfigRate();
    //       }else{
    //         this.$Message.error('禁用失败');
    //       }
    //   });
    // },
    EditRate(row) {
      this.RateModal.modal = true;
      this.RateModal.isEdit = true;
      this.RateModal.data.id = row.id;
      this.RateModal.data.rate_name = row.rate_name;
      this.RateModal.data.borrowing_rate = row.borrowing_rate;
      this.RateModal.data.rollover_rate = row.rollover_rate;
      this.RateModal.data.overdue_rate = row.overdue_rate;
      this.RateModal.data.daily_rate = row.daily_rate;
    },
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    AddRate() {
      this.$refs["RateModal"].resetFields();

      this.RateModal.isEdit = false;
      this.RateModal.modal = true;
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
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$post(url, params).then(d => {
          let res = d.data;
          this.RowUserData = res;
          this.UserData = res;
          // if (res.length > 0) {
          //   this.UserData.forEach(val => {
          //     for (let key in val) {
          //       if (key in this.TextArr) {
          //         val[key] = this.TextArr[key][val[key]];
          //       }
          //     }
          //   });
          // }
          that.loading = false;
          resolve();
        });
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
    //添加操作
    AddModeModal() {
      this.$refs["ModeModal"].resetFields();
      this.ModeModal.data = {
        level: "",
        money_limit: "",
        days: "",
        config_rate_id: "",
        remark: ""
      };
      this.ModeModal.isEdit = false;
      this.ModeModal.modal = true;
    },
    ModalCancel() {
      this.ModeModal.modal = false;
    },
    AddOver() {
      this.$refs["ModeModal"].validate(valid => {
        if (valid) {
          this.ModeModal.modal = false;
          let ninfo = this.RemoveObserve(this.ModeModal.data);
          if(ninfo.is_default==1){
            ninfo.config_rate_id='';
            ninfo.symbol='';
            ninfo.num='';
          }
          const isEdit = this.ModeModal.isEdit;
          const url = isEdit
            ? "/backend/Sysconfig/sysLevelUp"
            : "/backend/Sysconfig/sysLevelAdd";
          if (isEdit) {
            ninfo.id = this.ModeModal.id;
          }
          this.UploadData(url, ninfo).then(() => {
            this.InitData(this.apiUrl);
          });
        }
      });
    },
    getConfigRate() {
      return new Promise(resolve => {
        this.$post("backend/rate/list", this.RateModal.data)
          .then(d => {
            if (d.status === 1) {
              this.RateData = d.data;
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.RateModal.modal = false;

          this.RateModal.data.admin_id = getLocal("admin_id");
          let url = this.RateModal.isEdit
            ? "backend/rate/edit"
            : "backend/rate/add";
          return new Promise(resolve => {
            this.$post(url, this.RateModal.data)
              .then(d => {
                if (d.status === 1) {
                  this.$Message.success(d.message);
                  this.getConfigRate();
                  resolve(d.data);
                } else {
                  this.$Message.error(d.message);
                }
              })
              .catch(err => {
                this.$Message.error("服务器繁忙，请稍后再试！");
              });
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.RateModal.modal = false;
    },
    //修改操作
    EditOpt(row) {
      this.ModeModal.data = {
        level: row.level,
        money_limit: row.money_limit,
        days: row.days,
        config_rate_id: row.config_rate_id,
        remark: row.remark,
        is_default: row.is_default,
        symbol: row.symbol,
        num: row.num
      };
      this.ModeModal.isEdit = true;
      this.ModeModal.id = row.id;
      this.ModeModal.modal = true;
    },
    ChangeStatus(row) {
      this.$post("/backend/Sysconfig/sysLevelDisable", { id: row.id }).then(
        response => {
          this.$Message.success(response.message);
          this.InitData(this.apiUrl);
        }
      );
    },

    //删除用户类型
    Delopt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">删除此用户类型？</p>`,
        onOk: () => {
          this.UploadData("/backend/Sysconfig/sysLevelDel", {
            id: row.id
          }).then(() => {
            this.InitData(this.apiUrl);
          });
        }
      });
    }
  }
};
</script>


<style scoped>
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
.col-center {
  text-align: center;
}
.auto-height {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.info-width {
  width: 200px;
}
.api > p {
  display: block;
  font-weight: normal;
  font-size: 12px;
  color: #495060;
}
.ml-10 {
  margin-left: 10px;
}
</style>
