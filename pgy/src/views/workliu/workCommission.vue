<template>
  <div id="review-panel">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Dropdown @on-click="changeMenu" class="top_btn" v-show="collection_type_show">
      <Button class="btn">{{collection_default}}</Button>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item,index) in collection_type"
          :key="index"
          :name="item.id"
        >{{item.title}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <!-- <Col span="5">
        <Card>
          <Tabs class="left_box" value="name1">
            <TabPane label="审核员" name="name1">
              <ul>
                <li>
                  <a
                    :class="{cur: item.cur}"
                    class="li_ltem"
                    v-for="(item,index) in auditorData"
                    :key="index"
                    @click="examineClick(item)"
                  >{{item.name}}</a>
                </li>
              </ul>
            </TabPane>
            <TabPane label="催收员" name="name2">
              <ul>
                <li>
                  <a
                    class="li_ltem"
                    :class="{cur: item.cur}"
                    v-for="(item,index) in recruiterData"
                    :key="index"
                    @click="collectionClick(item)"
                  >{{item.name}}</a>
                </li>
              </ul>
            </TabPane>
          </Tabs>
        </Card>
    </Col>-->
    <Row>
      <!-- <Menu theme="light" active-name="1-1" :open-names="['1']" @on-select="bed">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>审核员
            </template>
            <MenuItem
              v-for="(item,index) in auditorData"
              :key="index"
              :name="item.name"
            >{{item.name}}</MenuItem>
          </Submenu>
        </Menu>

        <Menu theme="light" active-name="1-1" :open-names="['1']" @on-select="bed">
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people"/>催收员
            </template>
            <MenuItem
              v-for="(item,index) in recruiterData"
              :key="index"
              :name="item.id"
            >{{item.name}}</MenuItem>
          </Submenu>
      </Menu>-->
      <!-- <div class="card-box">
      <div v-for="(item,index) in auditorData" class="sim-card" :class="{cur:item.cur}" @click="auditor(index)">
        <Icon class="icon" :type="item.icon"></Icon>
        <p class="title">{{ item.name }}</p>
        <p class="value"><span class="num">{{item.count}}</span>{{item.cunit}}</p>
        <span class="tips">点击查看</span>
      </div>
    </div>
    <h1 class="list-title">
      <span class="tit-text">催收员工作业绩</span>
    </h1>
    <div class="card-box">
      <div v-for="(item,index) in recruiterData" class="sim-card" :class="{cur:item.cur}" @click="recruiter(index)">
        <Icon class="icon" :type="item.icon"></Icon>
        <p class="title">{{ item.name }}</p>
        <p class="value"><span class="num">{{item.count}}</span>{{item.cunit}}</p>
        <span class="tips">点击查看</span>
      </div>
      </div>-->
      <Col span="24">
        <Card>
          <div ref="BarTitle" class="card-tit" slot="title">
            <h2 class="list-title">
              <span class="tit-text">{{mynamae}}工作业绩</span>
            </h2>
            <div class="right-side">
              <DatePicker
                type="month"
                style="width: 120px"
                :value="CurrentMonth"
                placement="bottom-end"
                @on-change="pickMonth"
              ></DatePicker>
            </div>
          </div>

          <div id="BarChart1" class="chart-box" :style="{width: BarWidth+'px'}"></div>
          <div id="BarChart2" class="chart-box" :style="{width: BarWidth+'px'}"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getLocal } from "@/util/util";
import AuditModal from "@/components/infoModal/AuditModal";
import Clipboard from "clipboard";

export default {
  name: "ReviewPanel",
  components: {
    AuditModal
  },
  data() {
    return {
      title: "工作业绩",
      apiUrl: "/backend/Results/Audit",
      auth_id: "",
      spinShow: true,
      allTime: [],
      role_id: "18,20",
      admin_id: "",
      //统计数据
      CurrentMonth: "",
      getMonth: "",
      getFullYear: "",
      auditorData: [],
      recruiterData: [],
      mynamae: "", //当前名字
      CountData: [
        {
          name: "方其余",
          icon: "ios-list-outline",
          count: 0,
          cunit: "元",
          second: false,
          status: "review_fqy",
          type: "review",
          cur: true
        },
        {
          name: "冯剑涛",
          icon: "ios-list-outline",
          count: 0,
          cunit: "元",
          second: false,
          status: "loan_fjt",
          type: "loan",
          cur: false
        },
        {
          name: "张杰",
          icon: "ios-list-outline",
          count: 0,
          cunit: "元",
          second: false,
          status: "urge_zj",
          type: "urge",
          cur: false
        },
        {
          name: "张铠峰",
          icon: "ios-list-outline",
          count: 0,
          cunit: "元",
          second: false,
          status: "urge_zkf",
          type: "urge",
          cur: false
        }
      ],
      SecondH: "300px",
      HasSecond: false,
      BarWidth: "",
      examine: {
        text1: "放款笔数",
        text2: "放款金额"
      },
      collection: {
        text1: "逾期催回笔数",
        text2: "逾期催回金额"
      },
      collection_type: [],
      collection_type_show: false,
      collection_default: "请选择"
    };
  },
  created() {
    this.UserRoles();
    const now = new Date();
    var getFullYear = now.getFullYear();
    var getMonth = now.getMonth() + 1;
    if (getMonth < 10) {
      getMonth = "0" + getMonth;
    }
    this.CurrentMonth = getFullYear + "-" + getMonth;
    this.getMonth = getMonth;
    this.getFullYear = getFullYear;
    this.auth_id = getLocal("auth_id");
    //this.InitData(this.apiUrl);
  },
  mounted() {
    this.BarWidth = this.$refs["BarTitle"].offsetWidth;
    // this.drawLine(this.examine);
  },
  methods: {
    changeMenu(msg) {
      this.collection_type.forEach((item, index) => {
        if (msg == item.id) {
          if (item.set == 1) {
            // 审核
            this.examineClick(item);
          } else {
            // 催收
            this.collectionClick(item);
          }
        }
      });
    },
    drawLine(main, msg) {
      this.spinShow = true;
      this.$post("/backend/admin-user/user-review", msg).then(d => {
        var data = d.data;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("BarChart1"));
        // 绘制图表
        myChart.setOption(
          {
            title: { text: main.text1, subtext: "单位：笔" },
            tooltip: {},
            xAxis: {
              data: data.loan_num.days
            },
            yAxis: {},
            series: [
              {
                type: "bar",
                data: data.loan_num.data,
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          },
          true
        );

        let myChart2 = this.$echarts.init(document.getElementById("BarChart2"));
        myChart2.setOption(
          {
            title: { text: main.text2, subtext: "单位：元" },
            tooltip: {},
            xAxis: {
              data: data.loan_amount.days
            },
            yAxis: {},
            series: [
              {
                type: "bar",
                data: data.loan_amount.data,
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          },
          true
        );
      });
      this.spinShow = false;
    },
    //审核
    examineClick(event) {
      // console.log(event);
      this.mynamae = event.title;
      var auditorData = this.auditorData;
      auditorData.forEach((item, index) => {
        if (item.id == event.id) {
          item.cur = true;
        } else {
          item.cur = false;
        }
      });
      var recruiterData = this.recruiterData;
      recruiterData.forEach((item, index) => {
        item.cur = false;
      });
      var _data = {
        user_id: event.id,
        role_id: 27,
        m: this.getMonth,
        y: this.getFullYear
      };

      this.drawLine(this.examine, _data);
    },
    //催收
    collectionClick(event) {
      var recruiterData = this.recruiterData;
      this.mynamae = event.title;
      recruiterData.forEach((item, index) => {
        if (item.id == event.id) {
          item.cur = true;
        } else {
          item.cur = false;
        }
      });
      var auditorData = this.auditorData;
      auditorData.forEach((item, index) => {
        item.cur = false;
      });
      var _data = {
        user_id: event.id,
        role_id: 28,
        m: this.getMonth,
        y: this.getFullYear
      };
      this.drawLine(this.collection, _data);
    },
    UserRoles() {
      this.$post("backend/admin-user/user-roles", {
        role_ids: this.role_id
      }).then(d => {
        // console.log(d);
        if (d.status == 1) {
          d.data[27].children.forEach((item, index) => {
            this.auditorData.push({
              name: item.admin_name,
              id: item.id,
              cur: false
            });
            this.collection_type.push({
              id: item.id,
              title: item.admin_name + "(审核)",
              set: "1"
            });
          });
          if (d.data[28]) {
            d.data[28].children.forEach((item, index) => {
              this.recruiterData.push({
                name: item.admin_name,
                id: item.id,
                cur: false
              });
              this.collection_type.push({
                id: item.id,
                title: item.admin_name + "(催收)",
                set: "2"
              });
            });
          }
          if (this.collection_type.length > 0) {
            if (d.data[27].children.length > 0) {
              var role=27
              this.auditorData[0].cur = true;
            } else {
              // console.log(this.recruiterData);
              this.recruiterData[0].cur = true;
              var role=28
            }
            if (this.collection_type.length > 1) {
              this.collection_type_show = true;
            }
            this.mynamae = this.collection_type[0].title;
            var _data = {
              user_id: this.collection_type[0].id,
              role_id: role,
              m: this.getMonth,
              y: this.getFullYear
            };
            if (this.collection_type[0].set == 1) {
              var obj = this.examine;
            } else {
              var obj = this.collection;
            }
            this.drawLine(obj, _data);

            // this.drawLine(this.examine, _data);
          }
        }
        this.spinShow = false;
      });
    },
    //审核员业绩

    //初始化数据
    InitData(url, params = {}) {
      const that = this;
      this.loading = true;
      //列表数据获取
      return new Promise(resolve => {
        this.$fetch(url, params).then(d => {
          this.BarOption1.xAxis[0].data = Object.keys(d);
          this.BarOption1.series[0].data = Object.values(d);
          this.DrawChart();
          that.loading = false;
          resolve();
        });
      });
    },

    //时间
    pickMonth(data) {
      var user_id = "";
      var role_id = "";
      this.auditorData.forEach((item, index) => {
        if (item.cur == true) {
          user_id = item.id;
          role_id = 27;
        }
      });
      this.recruiterData.forEach((item, index) => {
        if (item.cur == true) {
          user_id = item.id;
          role_id = 28;
        }
      });
      let dateTime = data.split("-");
      this.getFullYear = dateTime[0];
      this.getMonth = dateTime[1];
      var _data = {
        user_id: user_id,
        role_id: role_id,
        m: this.getMonth,
        y: this.getFullYear
      };
      this.drawLine(this.examine, _data);
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
  padding-top: 10px;
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

  flex-wrap: wrap;
  padding-bottom: 10px;
  .sim-card {
    position: relative;
    width: 24%;
    padding: 15px;
    color: #fff;
    overflow: hidden;
    cursor: pointer;
    border-radius: 5px;
    background-color: #c3c3c3;
    margin: 3px;
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
.chart-box {
  height: 300px;
}
.left_box {
  height: 662px;
}
.li_ltem {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding: 0 20px;
  line-height: 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #495060;
  &.cur {
    background: #f8f8f9;
    color: #2d8cf0;
  }
}
.top_btn {
  margin-bottom: 10px;
  text-align: center;
  font-weight: normal;
  .btn {
    width: 100px;
  }
}
</style>
