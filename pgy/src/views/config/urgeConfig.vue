<template>
  <div id="user-config">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>审核员配置
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="ReviewCol" :data="ReviewData" :loading="Reviewloading"></Table>
      </Card>
    </div>
    <!-- <div class="data-area">
      <Card>
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="settings"></Icon>催收分配方式
          </h3>
        </div>
        <div class="mode-area">
          <div class="ipt-area">
            <RadioGroup v-model="ModeType.type">
              <p class="ipt-line">
                <Radio :label="1" :disabled="!ModeType.edit">按人数</Radio>
                <span class="after-info" v-show="AccordPerson">
                  每
                  <Input v-show="ModeType.edit" class="line-control" v-model="ModeType.number"></Input>
                  <span class="value" v-show="!ModeType.edit">{{ ModeType.number }}</span>
                  <span class="unit">人</span>
                </span>
              </p>
              <p class="ipt-line">
                <Radio :label="2" :disabled="!ModeType.edit">按时间</Radio>
                <span class="after-info" v-show="!AccordPerson">
                  每
                  <Input class="line-control" v-show="ModeType.edit" v-model="ModeType.number"></Input>
                  <Select class="line-control" v-show="ModeType.edit" v-model="ModeType.per">
                    <Option value="day">天</Option>
                    <Option value="week">周</Option>
                    <Option value="month">月</Option>
                  </Select>
                  <span class="value" v-show="!ModeType.edit">{{ModeType.number}}</span>
                  <span class="unit" v-show="!ModeType.edit">{{ TimeUnit }}</span>
                </span>
                <span class="sub-btn">
                  <Button type="info" v-show="!ModeType.edit" @click="ModeBtn('fix')">修改</Button>
                  <Button type="success" v-show="ModeType.edit" @click="ModeBtn('sub')">保存</Button>
                  <Button type="error" v-show="ModeType.edit" @click="ModeBtn('cancel')">取消</Button>
                </span>
              </p>
            </RadioGroup>
          </div>
        </div>
      </Card>
    </div>-->
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>催收员配置
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>
      </Card>
    </div>
    <Modal v-model="ModeModal.modal" title="主动分配">
      <p class="assign-line">
        <span>
          分
          <span class="assign-name">{{ ModeModal.name }}</span> 的所有用户给
        </span>
        <Select v-model="ModeModal.give_user" style="width: 120px">
          <Option v-for="item in SelectData" :value="item.uid" :key="item.uid">{{item.name}}</Option>
        </Select>
      </p>
      <div slot="footer">
        <Button type="text" @click="AssignCancel" size="large">取消</Button>
        <Button type="primary" @click="AssignSub" size="large">提交分配</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UserConfig",
  data() {
    return {
      title: "",
      apiUrl: "/backend/config-vc/collection-list",
      auth_id: "",
      loading: true,
      Reviewloading: true,
      ModeType: {
        edit: false,
        type: 1,
        number: 11,
        per: "circle"
      },
      TextArr: {
        status: ["离职", "在职"],
        tunit: {
          day: "天",
          week: "周",
          month: "月",
          circle: "人"
        }
      },
      //主动分配
      ModeModal: {
        modal: false,
        uid: 0,
        name: "",
        give_user: ""
      },
      UserCol: [
        // {
        //   title: "序号",
        //   width: "70",
        //   align: "center",
        //   key: "uid"
        // },
        {
          title: "姓名",
          align: "center",
          key: "admin_name"
        },
        {
          title: "在线状态",
          align: "center",
          key: "online"
        },
        {
          title: "分配方式",
          align: "center",
          key: "assign_type"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "330",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
      ],
      ReviewCol: [
        // {
        //   title: "序号",
        //   width: "70",
        //   align: "center",
        //   key: "uid"
        // },
        {
          title: "姓名",
          align: "center",
          key: "admin_name"
        },
        {
          title: "在线状态",
          align: "center",
          key: "online"
        },
        {
          title: "分配方式",
          align: "center",
          key: "assign_type"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "330",
          render: (h, params) => {
            //需要判断人员是否离职
            return h("div", this.$renderBtn(h, params, this.ReviewBtnData));
          }
        }
      ],
      ReviewData: [],
      ReviewBtnData: [
        {
          name: "离职分配",
          color: "primary",
          class: "reviewQuitOpt"
        }
      ],
      ValidateRules: {
        level: [{ required: true, message: "等级不能为空！" }]
      },
      UserData: [], //表格数据
      BtnData: []
    };
  },
  created() {
    this.auth_id = this.$getLocal("auth_id");
    this.InitData(this.apiUrl);
    this.getReviewUser();
  },
  computed: {
    AccordPerson() {
      return this.ModeType.type === 1 ? true : false;
    },
    TimeUnit() {
      return this.TextArr.tunit[this.ModeType.per];
    },
    SelectData() {
      let data = [];
      this.UserData.forEach(val => {
        if (val.uid !== this.ModeModal.uid) {
          data.push({
            uid: val.uid,
            name: val.admin_name
          });
        }
      });
      return data;
    }
  },
  methods: {
    //去除data数据里绑定的监视器
    RemoveObserve(rowdata) {
      return JSON.parse(JSON.stringify(rowdata));
    },
    getReviewUser(params = {}) {
      return new Promise(resolve => {
        this.$fetch("/backend/config-vc/verify-list", params).then(d => {
          let res = d.data;
          if (res.verify_list.length > 0) {
            res.verify_list.forEach(val => {
              val.assign_type = "平均分配";
            });
          }
          res.verify_list.forEach((item, index) => {
            if (item.online == 1) {
              res.verify_list[index].online = "在线";
            } else {
              res.verify_list[index].online = "离线";
            }
          });
          this.ReviewData = res.verify_list;
          this.Reviewloading = false;
          resolve();
        });
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
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$fetch(url, params).then(d => {
          let res = d.data;
          if (res.collection_list.length > 0) {
            res.collection_list.forEach(val => {
              val.assign_type = "平均分配";
            });
          }
          res.collection_list.forEach((item, index) => {
            if (item.online == 1) {
              res.collection_list[index].online = "在线";
            } else {
              res.collection_list[index].online = "离线";
            }
          });
          this.UserData = res.collection_list;
          // if (res.collection_list.length > 0) {
          //   res.config_list.forEach(val => {
          //     if (val.is_used) {
          //       this.ModeType.type = val.type;
          //       this.ModeType.number = val.number;
          //       this.ModeType.per = val.per;
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
    //配置按钮操作
    ModeBtn(type) {
      switch (type) {
        case "fix":
          this.ModeType.edit = true;
          break;
        case "sub":
          if (this.ModeType.type === 1) {
            this.ModeType.per = "circle";
          }
          this.UploadData("/backend/config-vc/config-update", {
            type: this.ModeType.type,
            number: this.ModeType.number,
            per: this.ModeType.per
          }).then(() => {
            this.ModeType.edit = false;
          });
          break;
        case "cancel":
          this.ModeType.edit = false;
          break;
      }
    },
    //离职操作
    QuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">该催收员名下所有未催回用户将会平均分配给在职的其他催收员</p>`,
        onOk: () => {
          this.UploadData("/backend/config-vc/active-separation", {
            admin_id: row.uid
          }).then(() => {
            this.InitData(this.apiUrl);
          });
        }
      });
    },
    //审核人员离职操作
    reviewQuitOpt(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `<p class="confirm-text">该审核员名下所有未审核用户将会平均分配给在职的其他审核员</p>`,
        onOk: () => {
          this.UploadData("/backend/config-vc/equal-verify", {
            admin_id: row.uid
          }).then(() => {
            this.InitData(this.apiUrl);
          });
        }
        // okText: "是",
        // cancelText: "否"
      });
    },
    //主动分配操作
    AssignUrge(row) {
      this.ModeModal.uid = row.uid;
      this.ModeModal.name = row.admin_name;
      this.ModeModal.modal = true;
    },
    AssignCancel() {
      this.ModeModal.modal = false;
    },
    AssignSub() {
      this.UploadData("/backend/config-vc/equal-collection", {}).then(() => {
        this.InitData(this.apiUrl);
        this.ModeModal.modal = false;
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
.ipt-line {
  padding-bottom: 10px;
  width: 450px;
  position: relative;
  .after-info {
    margin-left: 20px;
    .unit,
    .value {
      margin-left: 10px;
    }
  }
  .sub-btn {
    position: absolute;
    bottom: 11px;
    right: 0;
  }
}
.line-control {
  width: 70px;
  margin-left: 10px;
  display: inline-block;
}
.assign-line {
  text-align: center;
  .assign-name {
    font-size: 16px;
    color: #d73435;
  }
}
</style>
