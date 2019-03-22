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
            <Icon type="clipboard"></Icon>任务列表
          </h3>
          <div class="btn-box">
            <Button type="success" @click="AddTask">添加任务</Button>
          </div>
          <!-- <div class="btn-box">
            <Button :type="HangType" icon="pin" @click="ShowHang">{{HangText}}</Button>
            <Button type="warning" v-show="PassShow" icon="checkmark" @click="SumPass">一键通过</Button>
          </div>-->
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
    <Modal v-model="task.modal" title="添加菜单">
      <Form
        ref="AddTask"
        :model="task.data"
        :rules="ValidateRules"
        label-position="right"
        :label-width="80"
      >
        <FormItem label="任务名称" prop="task_name">
          <Input v-model="task.data.task_name"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="task.data.status">
            <Radio label="1">启用</Radio>
            <Radio label="2">禁用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="任务标志" prop="task_tag">
          <Input v-model="task.data.task_tag"></Input>
        </FormItem>
        <FormItem label="任务周期" prop="task_time_info">
          <Input v-model="task.data.task_time_info"></Input>
        </FormItem>
        <FormItem label="任务方法" prop="task_function_name">
          <Input v-model="task.data.task_function_name"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="Cancel" size="large">取消</Button>
        <Button type="primary" @click="submitTask" size="large">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocal } from "@/util/util";

export default {
  name: "taskList",
  data() {
    return {
      title: "定时任务",
      apiUrl: "/backend/task/lists",
      auth_id: "",
      loading: true,
      ScreenData: {
        key: ""
      },
      ValidateRules: {
        task_name: [{ required: true, message: "任务名称不能为空！" }],
        task_tag: [{ required: true, message: "任务标志不能为空！" }],
        status: [{ required: true, message: "请选择状态！" }],
        task_time_info: [{ required: true, message: "任务周期不能为空！" }],
        task_function_name: [
          { required: true, message: "任务方法名不能为空！" }
        ]
      },
      UserCol: [
        {
          title: "ID",
          width: "80",
          align: "center",
          key: "id"
        },
        {
          title: "任务名",
          width: "100",
          align: "center",
          key: "task_name"
        },
        {
          title: "任务标志",
          align: "center",
          key: "task_tag"
        },
        {
          title: "任务周期",
          align: "center",
          key: "task_time_info"
        },
        {
          title: "任务方法名",
          align: "center",
          key: "task_function_name"
        },
        {
          title: "执行成功次数",
          align: "center",
          key: "success_number"
        },
        {
          title: "失败次数",
          align: "center",
          key: "error_number"
        },
        {
          title: "添加时间",
          align: "center",
          key: "created_at"
        },
        {
          title: "上次执行时间",
          align: "center",
          key: "updated_at"
        },
        {
          title: "成功率",
          align: "center",
          key: "updated_at",
          render: (h, params) => {
            if (Number(params.row.success_number) == 0) {
              return 0;
            } else {
              return (
                (Number(params.row.success_number) /
                  (Number(params.row.success_number) +
                    Number(params.row.error_number))) *
                  100 +
                "%"
              );
            }
          }
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            return params.row.status == 1 ? "已启用" : "已禁用";
          }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "220",
          render: (h, params) => {
            //console.log(params)
            return h("div", this.$renderBtn(h, params, this.BtnData));
          }
        }
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
        cur: 1,
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
      }
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl, this.ScreenData);
  },

  methods: {
    AddTask() {
      this.task.data = {};
      this.$refs["AddTask"].resetFields();
      this.task.modal = true;
    },

    Cancel() {
      this.task.modal = false;
    },
    EditOpt(row) {
      this.$refs["AddTask"].resetFields();
      this.task.data.id = row.id;
      this.task.data.task_name = row.task_name;
      this.task.data.status = row.status;
      this.task.data.task_tag = row.task_tag;
      this.task.data.task_time_info = row.task_time_info;
      this.task.data.task_function_name = row.task_function_name;
      this.task.modal = true;
    },
    ChangeStatus(row) {
      this.$post("backend/task/change-status", { id: row.id }).then(
        response => {
          if (response.status == 1) {
            this.$Message.success(response.message);
            this.InitData(this.apiUrl);
          } else {
            this.$Message.error(response.message);
          }
        }
      );
    },
    submitTask() {
      this.$refs["AddTask"].validate(vaid => {
        this.$post("/backend/task/add", this.task.data).then(response => {
          this.task.modal = false;
          if (response.status == 1) {
            this.$Message.success(response.message);
            this.InitData(this.apiUrl);
          } else {
            this.$Message.error(response.message);
          }
        });
      });
    },
    RefreshList() {
      this.loading = true;
      this.ResetPageNum();
      if (this.ScreenData.type === "all") {
        this.CountData[0].cur = true;
        this.ScreenData.type = "check_waiting";
      }
      this.ScreenData.key = "";
      this.SimpleSearch(0).then(() => {
        this.$Message.success("刷新成功！");
      });
    },

    //查询结果
    SimpleSearch() {
      this.InitData(this.apiUrl, this.ScreenData);
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
      this.$fetch(
        url,
        Object.assign(params, { page: this.Page.cur, num: this.Page.size })
      ).then(d => {
        let res = d.data;
        this.Page.count = d.data.count;
        this.taskData = res.list;
        that.loading = false;
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
</style>
