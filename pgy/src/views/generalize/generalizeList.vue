<template>
  <div id="generalize-list">
    <h1 class="list-title">
      <span class="tit-text">&nbsp;{{ title }}</span>
      <Button
        class="tit-btn"
        type="success"
        icon="android-arrow-dropleft-circle"
        size="large"
        v-show="IndexStash.Show"
        @click="BackIndex"
      >返回首页</Button>
    </h1>
    <div class="card-box">
      <div
        v-for="(item,index) in CountData"
        :key="index"
        class="sim-card"
        :class="{cur:item.cur}"
        @click="CountList(item.status)"
      >
        <Icon class="icon" :type="item.icon"></Icon>
        <p class="title">{{ item.name }}</p>
        <p class="value">
          <span class="num">{{item.count}}</span>
          <span>{{item.cunit}}</span>
          <!-- <span class="num" v-show="item.second">/</span>
          <span class="num">{{item.other}}</span>
          <span>{{item.ounit}}</span>-->
        </p>
        <span class="tips">点击查看</span>
      </div>
    </div>
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
            <Icon type="clipboard"></Icon>
            {{ TableTitle }}
            <span class="count-num">总数：{{Page.count}}</span>
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="UserCol" :data="UserData" :loading="loading"></Table>

        <Modal v-model="ModeModal.modal" title="设置操作扣量">
          <Form
            ref="ModeModal"
            :model="ModeModal.data"
            :rules="ValidateRules"
            label-position="right"
            :label-width="110"
          >
            <FormItem label="扣量比例：0-1" prop="deduct">
              <Input v-model="ModeModal.data.deduct"></Input>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" @click="ModalCancel" size="large">取消</Button>
            <Button type="primary" @click="AddOver" size="large">保存</Button>
          </div>
        </Modal>
        <Modal v-model="zhanghao.modal" title="查看账号">
          <Form label-position="right" :label-width="110">
            <FormItem label="地址：">
              <a>
                <div class="clipBtn" :src="zhanghao.data.url">{{zhanghao.data.url}}</div>
              </a>
            </FormItem>
            <FormItem label="账号：">
              <a>
                <div class="clipBtn" :src="zhanghao.data.account">{{zhanghao.data.account}}</div>
              </a>
            </FormItem>
            <FormItem label="密码：">
              <a>
                <div class="clipBtn" :src="zhanghao.data.password">{{zhanghao.data.password}}</div>
              </a>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="primary" @click="Over" size="large">确定</Button>
          </div>
        </Modal>

        <div class="page-box">
          <Page
            v-show="IndexStash.Show"
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
  </div>
</template>

<script>
import { getLocal } from "@/util/util";
import Clipboard from "clipboard";

export default {
  name: "GeneralizeList",
  data() {
    const validateRate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必填"));
      } else {
        if (isNaN(value) || value > 1) {
          callback(new Error("必须是数字并且小于等于1"));
        }
        callback();
      }
    };
    return {
      zhanghao: {
        modal: false,
        data: {
          account: "",
          password: "",
          url: ""
        }
      },
      ModeModal: {
        modal: false,
        isEdit: false,
        id: "",
        data: {
          deduct: ""
        }
      },
      ValidateRules: {
        deduct: [{ validator: validateRate, trigger: "blur" }]
      },
      title: "渠道统计",
      apiUrl: "/backend/promote-info/index",
      auth_id: "",
      loading: true,
      ClipBoard: {},
      allTime: [],
      //统计数据
      CountData: [
        {
          name: "今日注册",
          icon: "android-calendar",
          count: 0,
          cunit: "人",
          second: false,
          status: "DAYREG",
          cur: false
        },
        {
          name: "今日浏览",
          icon: "android-calendar",
          count: 0,
          cunit: "人",
          second: false,
          status: "DAYVIEW",
          cur: false
        },
        {
          name: "今日转化",
          icon: "pie-graph",
          count: 0,
          cunit: "人",
          second: true,
          other: "",
          ounit: "",
          status: "DAYZH",
          cur: false
        },
        {
          name: "历史注册",
          icon: "calendar",
          count: 0,
          cunit: "人",
          second: false,
          status: "HISTORYREG",
          cur: false
        },
        {
          name: "历史浏览",
          icon: "calendar",
          count: 0,
          cunit: "人",
          second: false,
          status: "HISTORYVIEW",
          cur: false
        },
        {
          name: "历史转化",
          icon: "android-time",
          count: 0,
          cunit: "人",
          second: true,
          other: "",
          ounit: "'",
          status: "HISTORYZH",
          cur: false
        }

        // {
        //   name: "转化率",
        //   icon: "levels",
        //   count: 0,
        //   cunit: "%",
        //   second: false,
        //   status: "DAYLOAN",
        //   cur: false
        // },
        // {
        //   name: "逾期率",
        //   icon: "levels",
        //   count: 0,
        //   cunit: "%",
        //   second: false,
        //   status: "HISTORYLOAN",
        //   cur: false
        // }
      ],
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
          title: "渠道名称",
          width: "100",
          align: "center",
          key: "title"
        },
        {
          title: "推广链接",
          align: "center",
          key: "h5",
          render: (h, params) => {
            // const Url =
            //   window.location.origin +
            //   window.location.pathname +
            //   "#/extend?code=" +
            //   params.row.codebase;
            return h(
              "div",
              {
                class: {
                  clipBtn: true
                },
                style: {
                  cursor: "pointer",
                  color: "#d73435"
                },
                attrs: {
                  src: params.row.h5
                }
              },
              "复制链接"
            );
          }
        },
        {
          title: "推广短链",
          align: "center",
          key: "short_url",
          render: (h, params) => {
            // const Url =
            //   window.location.origin +
            //   window.location.pathname +
            //   "#/extend?code=" +
            //   params.row.codebase;
            if (params.row.short_url != '') {
              return h(
                "div",
                {
                  class: {
                    clipBtn: true
                  },
                  style: {
                    cursor: "pointer",
                    color: "#d73435"
                  },
                  attrs: {
                    src: params.row.short_url
                  }
                },
                "复制链接"
              );
            } else {
              return "";
            }
          }
        },
        {
          title: "浏览数",
          align: "center",
          key: "viewcount"
        },
        {
          title: "注册数",
          align: "center",
          key: "regcount"
        },
        {
          title: "转化数",
          align: "center",
          key: "zhcount"
        },
        {
          title: "转化率",
          align: "center",
          key: "zhrate"
        },
        {
          title: "逾期率",
          align: "center",
          key: "yuqirate"
        },
        {
          title: "扣量系数",
          align: "center",
          key: "deduct"
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
      UserData: [], //表格数据
      SrcData: [], //渠道数据
      BtnData: [], //按钮数据
      //群选打钩后操作
      SelectData: [],
      //初始分页信息
      Page: {
        count: 0,
        cur: 1,
        size: 20
      },
      //首页暂存区
      IndexStash: {
        Show: false,
        Col: [],
        Data: []
      }
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.InitData(this.apiUrl).then(() => {
      this.IndexStash.Col = this.UserCol;
      this.IndexStash.Data = this.UserData;
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
  computed: {
    TableTitle() {
      return this.IndexStash.Show ? "数据列表" : "渠道列表";
    }
  },
  methods: {
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
    //二次获取数据
    SecondData(sinfo) {
      return new Promise(resolve => {
        this.$post("/backend/Promoteinfo/detail", sinfo).then(d => {
          this.UserCol = d.data.field;
          this.UserData = d.data.list;
          this.Page.count = d.data.count;
          this.loading = false;
          resolve();
        });
      });
    },
    //统计列表
    CountList(status) {
      this.loading = true;
      this.IndexStash.Show = true;
      let sinfo = this.RemoveObserve(this.ScreenData);
      this.CountData.forEach(val => {
        if (val.status === status) {
          val.cur = true;
        } else {
          val.cur = false;
        }
      });
      this.ScreenData.status = status;
      sinfo.status = status;
      this.SecondData(sinfo);
    },
    //查询结果
    SimpleSearch() {
      this.SecondData(this.apiUrl, this.ScreenData);
    },
    //初始化数据
    InitData(url, params = {}) {
      const that = this;
      this.loading = true;
      this.$fetch("/backend/promote-info/top-index").then(d => {
        var data = d.data;
        var countData = this.CountData;
        this.CountData.forEach(val => {
          switch (val.status) {
            case "DAYREG":
              val.count = data.DAYREG;
              break;
            case "DAYVIEW":
              val.count = data.DAYVIEW;
              break;
            case "HISTORYREG":
              val.count = data.HISTORYREG;
              break;
            case "HISTORYVIEW":
              val.count = data.HISTORYVIEW;
              break;
            case "DAYZH":
              val.count = data.DAYZH.count;
              // val.other =
              //   Number((data.DAYZH.allamount / 10000) * 100).toFixed(2) / 100;
              break;
            case "HISTORYZH":
              val.count = data.HISTORYZH.count;
              // val.other =
              //   Number((data.HISTORYZH.allamount / 10000) * 100).toFixed(2) /
              //   100;
              break;
            default:
          }
        });
      });
      //获取按钮信息
      this.$fetch("/backend/Menuauth/listAuthGet", {
        auth_id: this.auth_id
      }).then(d => {
        this.BtnData = d.data.operation;
      });
      //列表数据获取
      return new Promise(resolve => {
        this.$post(url, params).then(d => {
          let res = d.data.list;
          this.Page.count = d.data.count;
          this.UserData = res;
          this.SrcData = res;
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
    //导出数据
    ExportData() {
      let sinfo = this.RemoveObserve(this.ScreenData);
      sinfo.expro = 1;
      this.UploadData("/backend/Promoteinfo/detail", sinfo).then(url => {
        //console.log(url);
        window.location.href = url;
      });
    },
    //改变页数
    ChangePage(curpage) {
      this.loading = true;
      let sinfo = Object.assign(this.ScreenData, {
        page: curpage,
        num: this.Page.size
      });
      this.$post("/backend/Promoteinfo/detail", sinfo).then(d => {
        this.UserCol = d.data.field;
        this.UserData = d.data.list;
        this.Page.count = d.data.count;
        this.loading = false;
      });
    },
    //改变显示条数
    ChangeSize(size) {
      this.loading = true;
      let sinfo = Object.assign(this.ScreenData, {
        page: 1,
        num: size
      });
      this.$post("/backend/Promoteinfo/detail", sinfo).then(d => {
        this.UserCol = d.data.field;
        this.UserData = d.data.list;
        this.Page.count = d.data.count;
        this.loading = false;
      });
    },
    //查看详情按钮
    DetailsOpt(row) {
      const { href } = this.$router.resolve({
        path: "generalizeDetail",
        name: "渠道详情",
        query: {
          src: row.id
        }
      });
      window.open(href, "_blank");
    },
    //查看账号
    RemarkOpt(row) {
      this.$post("/backend/promote-info/view-account", {
        id: row.id
      }).then(d => {
        this.zhanghao.data.account = d.data[0].account;
        this.zhanghao.data.password = d.data[0].password;
        this.zhanghao.data.url = row.url;
        this.zhanghao.modal = true;
      });
    },
    Over() {
      this.zhanghao.modal = false;
    },
    //设置比例
    EditOpt(row) {
      this.ModeModal.data = {
        deduct: row.deduct
      };
      this.ModeModal.isEdit = true;
      this.ModeModal.id = row.id;
      this.ModeModal.modal = true;
    },
    //取消
    ModalCancel() {
      this.ModeModal.modal = false;
    },
    //提交
    AddOver() {
      this.$refs["ModeModal"].validate(valid => {
        if (valid) {
          this.ModeModal.modal = false;
          let ninfo = this.RemoveObserve(this.ModeModal.data);
          const isEdit = this.ModeModal.isEdit;
          if (isEdit) {
            ninfo.id = this.ModeModal.id;
          }
          this.$post("/backend/promote-info/set-deduct", {
            id: this.ModeModal.id,
            deduct: this.ModeModal.data.deduct
          }).then(d => {
            if (d.status === 1) {
              this.InitData(this.apiUrl).then(() => {
                this.IndexStash.Col = this.UserCol;
                this.IndexStash.Data = this.UserData;
              });
              this.$Message.success(d.message);
            } else {
              this.$Message.error(d.message);
            }
          });
        }
      });
    },
    BackIndex() {
      this.IndexStash.Show = false;
      this.UserCol = this.IndexStash.Col;
      // this.UserData = this.IndexStash.Data;
      this.ScreenData.status = "";
      this.CountData.forEach(val => {
        val.cur = false;
      });
      this.InitData(this.apiUrl).then(() => {
        this.IndexStash.Col = this.UserCol;
        this.IndexStash.Data = this.UserData;
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
.card-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 20px;
  .sim-card {
    position: relative;
    width: 30%;
    padding: 15px;
    color: #fff;
    overflow: hidden;
    cursor: pointer;
    border-radius: 5px;
    background-color: #c3c3c3;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
    }
    .value {
      padding-top: 10px;
      font-size: 18px;
      .num {
        font-size: 32px;
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
      right: 10px;
      top: 5px;
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
</style>
