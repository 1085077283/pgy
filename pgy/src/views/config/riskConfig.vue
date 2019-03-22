<template>
  <div id="template-edit">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>数据列表
          </h3>
          <!-- <div class="btn-box">
            <Button type="warning" size="large" icon="plus-circled" @click="AddRate">添加配置</Button>
          </div>-->
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>

        <Modal v-model="RateModal.modal" title="设置配置" :width="600">
          <Form
            ref="RateModal"
            :model="RateModal.data"
            :rules="RateRules"
            label-position="right"
            :label-width="110"
          >
            <FormItem label="编号" prop="number">
              <Input v-model="RateModal.data.number"></Input>
            </FormItem>
            <FormItem label="信息类别" prop="type">
              <Select v-model="RateModal.data.type" style="width:200px">
                <Option v-for="(item,index) in option" :key="index" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="状态" prop="status">
              <Select v-model="RateModal.data.status" style="width:200px">
                <Option
                  v-for="(item,index) in option_stats"
                  :key="index"
                  :value="item.status"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="项目名" prop="name">
              <Input v-model="RateModal.data.name"></Input>
            </FormItem>
            <FormItem label="内容说明" prop="content">
              <Input v-model="RateModal.data.content"></Input>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" @click="handleReset('RateModal')" size="large">取消</Button>
            <Button type="primary" @click="handleSubmit('RateModal')" size="large">保存</Button>
          </div>
        </Modal>
        <!-- <div class="page-box">
          <Page :current="Page.cur"
                :page-size="Page.size"
                :total="Page.count"
                placement="top"
                @on-change="ChangePage"
                @on-page-size-change="ChangeSize" show-sizer></Page>
        </div>-->
      </Card>
    </div>
  </div>
</template>

<script>
import { getLocal } from "@/util/util";
import radioList from "@/components/list/radiobad";

export default {
  name: "riskConfig",
  components: {
    radioList
  },
  data() {
    return {
      title: "",
      apiUrl: "/backend/risk/list",
      auth_id: "",
      loading: true,
      TextArr: {
        status: ["关闭", "开启"]
      },
      //设置配置
      RateModal: {
        modal: false,
        isEdit: false,
        id: "",
        data: {
          number: "",
          type: "",
          name: "",
          content: "",
          status: ""
        }
      },
      RateRules: {
        number: [
          { required: true, message: "编号不能为空", trigger: "change" }
        ],
        type: [{ required: true, message: "信息类型不能为空" }],
        status: [{ required: true, message: "状态不能为空" }],
        name: [
          { required: true, message: "项目名不能为空", trigger: "change" }
        ],
        content: [
          { required: true, message: "内容说明不能为空", trigger: "change" }
        ]
      },
      UserCol: [
        {
          title: "编号",
          width: "100",
          align: "center",
          key: "number"
        },
        {
          title: "信息类别",
          width: "100",
          align: "center",
          key: "type",
          render(h, params) {
            if (params.row.type == 1) {
              var text = "基本信息";
            } else if (params.row.type == 2) {
              var text = "运营商";
            } else if (params.row.type == 3) {
              var text = "注册与申请";
            } else if (params.row.type == 4) {
              var text = "数据源";
            } else {
              var text = "复贷规则";
            }
            return h("span", text);
          }
        },
        {
          title: "项目名",
          width: "270",
          align: "center",
          key: "name"
        },
        {
          title: "内容说明",
          align: "center",
          key: "content"
        },
        {
          title: "满足条件",
          align: "center",
          key: "risk_status",
          width: "100",
          render: (h, params) => {
            // let text = params.row.risk_status === 1?'开启':'关闭';
            // 直接显示拒绝
            let text = "拒绝";
            return h("span", text);
          }
        }
        // {
        //   title: "状态",
        //   key: "status",
        //   align: "center",
        //   width: "130",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(radioList, {
        //         props: {
        //           status: params.row.status,
        //           number: params.row.number,
        //           datas: this.UserData,
        //           id: params.row.id,
        //           index: params.index,
        //           url: "/backend/risk/edit"
        //         }
        //       })
        //     ]);
        //   }
        // },
        // {
        //   title: "编辑",
        //   key: "operation",
        //   align: "center",
        //    width: "130",
        //   render: (h, params) => {
        //     return h("div", this.$renderBtn(h, params, this.BtnData));
        //   }
        // }
      ],
      option: [
        { name: "基本信息", id: 1 },
        { name: "运营商", id: 2 },
        { name: "注册与申请", id: 3 },
        { name: "数据源", id: 4 },
        { name: "复贷规则", id: 5 }
      ],
      option_stats: [{ name: "启用", status: 1 }, { name: "禁用", status: 2 }],
      ValidateRules: {
        title: [{ required: true, message: "名称不能为空！" }],
        content: [{ required: true, message: "内容不能为空！" }],
        title_en: [{ required: true, message: "英文名不能为空！" }]
      },
      Page: {
        cur: 1,
        size: 20,
        count: ""
      },
      UserData: [], //表格数据
      RowUserData: [], //获取的原始数据
      BtnData: []
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl);
  },
  methods: {
    EditOpt(row) {
      this.RateModal.modal = true;
      this.RateModal.isEdit = true;
      this.RateModal.data.number = row.number;
      this.RateModal.data.type = row.type;
      this.RateModal.data.name = row.name;
      this.RateModal.data.content = row.content;
      this.RateModal.data.status = row.status;
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
    //改变页数
    ChangePage(curpage) {
      this.InitData({
        page: curpage,
        num: this.Page.size
      }).then(() => {
        this.Page.cur = curpage;
      });
    },
    //改变显示条数
    ChangeSize(size) {
      this.InitData({
        page: 1,
        num: size
      }).then(() => {
        this.Page.cur = 1;
        this.Page.size = size;
      });
    },
    //循环渲染按钮

    //初始化数据
    InitData(url, params = { page: this.Page.cur, num: this.Page.size }) {
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
          // res.lists.forEach((item, index) => {
          //   res.lists[index].status = item.status + 1;
          // });
          this.RowUserData = res;
          this.UserData = res.lists;
          that.loading = false;
          resolve();
        });
      });
    },
    changestatus(row) {},
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.RateModal.modal = false;

          // this.RateModal.data.admin_id = getLocal("admin_id");

          let url = this.RateModal.isEdit
            ? "/backend/risk/edit"
            : "/backend/risk/add";
          return new Promise(resolve => {
            this.$post(url, this.RateModal.data)
              .then(d => {
                if (d.status === 1) {
                  this.$Message.success(d.message);
                  this.InitData(this.apiUrl);
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
</style>
