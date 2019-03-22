<template>
  <div>
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button class="tit-btn" type="info" icon="ios-reload" size="large" @click="RefreshList">刷新列表</Button>
    </h1>
    <Row class="row_pad">
      <Col span="7">
          <Card class="card_main">
            <p slot="title">客户数据</p>
            <ul>
              <li v-for="(item,index) in userList" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
      <Col span="7" offset="1">
          <Card class="card_main">
            <p slot="title">分析数据</p>
            <ul>
              <li v-for="(item,index) in analysislist" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
      <Col span="7" offset="1">
          <Card class="card_main">
            <p slot="title">借款数据</p>
            <ul>
              <li v-for="(item,index) in loanlist" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
    </Row>
    <Row class="row_pad">
      <Col span="7">
          <Card class="card_main">
            <p slot="title">展期数据</p>
            <ul>
              <li v-for="(item,index) in delaylist" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
      <Col span="7" offset="1">
          <Card class="card_main">
            <p slot="title">还款数据</p>
            <ul>
              <li v-for="(item,index) in returnlist" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
      <Col span="7" offset="1">
          <Card class="card_main">
            <p slot="title">逾期数据</p>
            <ul>
              <li v-for="(item,index) in reducelist" :key="index">
                <div class="opt-between">
                  <p>
                    {{ item.name }}
                    <img class="text_img" src="../../assets/images/msg_data.png" alt>
                  </p>
                  <p>{{ item.rate }}</p>
                </div>
              </li>
            </ul>
          </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getLocal, crtTimeFM } from "@/util/util";

export default {
  name: "realTimeStatistics",

  data() {
    return {
      title: "实时数据",
      userList: [
        {
          name: "注册人数",
          rate: ""
        },
        {
          name: "提交订单人数",
          rate: ""
        },
        {
          name: "认证成功数",
          rate: ""
        },
        {
          name: "申请订单数",
          rate: ""
        },
        {
          name: "新增订单数",
          rate: ""
        },
        {
          name: "续借订单数",
          rate: ""
        }
      ],
      analysislist: [
        {
          name: "机审通过率",
          rate: ""
        },
        {
          name: "人工通过率",
          rate: ""
        },
        {
          name: "放款成功率",
          rate: ""
        },
        {
          name: "订单转化率",
          rate: ""
        },
        {
          name: "放款转化率",
          rate: ""
        }
      ],
      loanlist: [
        {
          name: "借款金额",
          rate: ""
        },
        {
          name: "借款笔数",
          rate: ""
        },
        {
          name: "新增放款数",
          rate: ""
        },
        {
          name: "续借放款数",
          rate: ""
        }
      ],
      delaylist: [
        {
          name: "展期金额",
          rate: ""
        },
        {
          name: "展期笔数",
          rate: ""
        },
        {
          name: "展期费总额",
          rate: ""
        }
      ],
      returnlist: [
        {
          name: "还款金额",
          rate: ""
        },
        {
          name: "还款笔数",
          rate: ""
        }
      ],
      reducelist: [
        {
          name: "逾期金额",
          rate: ""
        },
        {
          name: "逾期笔数",
          rate: ""
        },
        {
          name: "回款率",
          rate: ""
        }
      ]
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    RefreshList() {
      this.initData();
      this.$Message.success("刷新成功");
    },
    initData() {
      this.$fetch("/backend/statistical/today-statistics").then(d => {
        var _data = d.data;
        this.userList[0].rate = _data.user.TotalRegis;
        this.userList[1].rate = _data.user.loanNumber;
        this.userList[2].rate = _data.user.passUser;
        this.userList[3].rate = _data.user.total;
        this.userList[4].rate = _data.user.new;
        this.userList[5].rate = _data.user.repay;

        this.analysislist[0].rate =
          Math.floor(_data.analysis.autoPassRate * 10) / 10 + "%";
        this.analysislist[1].rate =
          Math.floor(_data.analysis.artificialPassRate * 10) / 10 + "%";
        this.analysislist[2].rate =
          Math.floor(_data.analysis.loanPassRate * 10) / 10 + "%";
        this.analysislist[3].rate =
          Math.floor(_data.analysis.regPassRate * 10) / 10 + "%";
        this.analysislist[4].rate =
          Math.floor(_data.analysis.orderPassRate * 10) / 10 + "%";

        this.loanlist[0].rate = _data.loan.totalAmount;
        this.loanlist[1].rate = _data.loan.total;
        this.loanlist[2].rate = _data.loan.new;
        this.loanlist[3].rate = _data.loan.repay;

        this.delaylist[0].rate = _data.delay.totalAmount;
        this.delaylist[1].rate = _data.delay.total;
        this.delaylist[2].rate = _data.delay.fee;

        this.returnlist[0].rate = _data.return.price;
        this.returnlist[1].rate = _data.return.total;

        this.reducelist[0].rate = _data.reduce.loanAmount;
        this.reducelist[1].rate = _data.reduce.total;
        this.reducelist[2].rate =
          Math.floor(_data.reduce.percent * 10) / 10 + "%";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.right_flex {
  display: flex;
  flex-direction: row-reverse;
}
.notes {
  line-height: 25px;
  z-index: 100;
  margin-top: -20px;
}
.go {
  color: #358af5;
  position: relative;
  margin-right: 15px;
}
.go_icon {
  width: 8px;
  height: 13px;
  position: absolute;
  top: 5px;
  right: -15px;
}
.row_pad {
  padding: 20px 20px 20px 20px;
  margin-left: 35px;
}
.card_main {
  height: 240px;
  p {
    line-height: 25px;
  }
}
.top_title {
  padding: 25px 0 0 55px;
  font-size: 24px;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  line-height: 21px;
}
.text_img {
  vertical-align: text-top;
}
a {
  text-decoration: none;
  color: #919191;
}
.list-title {
  padding: 25px 55px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: normal;
  padding-bottom: 10px;
}
</style>
