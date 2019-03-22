<template>
  <div id="statistical-index">
    <Row>
      <Col spam="3">
        <p class="top_title" v-show="main">&nbsp;</p>
      </Col>
      <!-- <Col class="statistical_title" span="8">数据统计</Col> -->
      <Col span="6" class="opt-box" offset="17" v-show="time_show">
        <Button type="primary" class="back" @click="GoMain()">
          <i class="ivu-icon ivu-icon-android-arrow-back"></i>
          返回统计中心
        </Button>
        <DatePicker
          @on-change="handleChange"
          type="month"
          v-model="time"
          placeholder="Select month"
          style="width: 150px;margin-top:30px;margin-left:5px;"
        ></DatePicker>
      </Col>
    </Row>

    <!-- <Col span="4" class="left_box">
        <ul class="left_ul">
          <li>
            <a
              :class="{cur: NavData.reg.cur}"
              href="javascript:;"
              @click="NavChange('reg')"
              class="item_body"
            >注册数据</a>
          </li>
          <li>
            <a
              :class="{cur: NavData.loan.cur}"
              href="javascript:;"
              @click="NavChange('loan')"
              class="item_body"
            >借款数据</a>
          </li>
          <li>
            <a
              :class="{cur: NavData.returnOrder.cur}"
              href="javascript:;"
              @click="NavChange('returnOrder')"
              class="item_body"
            >还款数据</a>
          </li>
          <li>
            <a
              :class="{cur: NavData.delay.cur}"
              href="javascript:;"
              @click="NavChange('delay')"
              class="item_body"
            >展期数据</a>
          </li>
          <li>
            <a
              :class="{cur: NavData.overdue.cur}"
              href="javascript:;"
              @click="NavChange('overdue')"
              class="item_body"
            >逾期数据</a>
          </li>
          <li>
            <a
              :class="{cur: NavData.DataAnalysis.cur}"
              href="javascript:;"
              @click="NavChange('DataAnalysis')"
              class="item_body"
            >数据分析</a>
          </li>
        </ul>
    </Col>-->
    <div v-show="main">
      <Row class="row_pad">
        <Col span="7">
          <a href="javascript:void(0);" @click="NavChange('reg')">
            <Card class="card_main">
              <p slot="title">客户数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in randomMovieList" :key="index">
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
          </a>
        </Col>
        <Col span="7" offset="1">
          <a href="javascript:void(0);" @click="NavChange('loan')">
            <Card class="card_main">
              <p slot="title">借款数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in jiekuanlist" :key="index">
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
          </a>
        </Col>
        <Col span="7" offset="1">
          <a href="javascript:void(0);" @click="NavChange('delay')">
            <Card class="card_main">
              <p slot="title">展期数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in zhanqilist" :key="index">
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
          </a>
        </Col>
      </Row>
      <Row class="row_pad">
        <Col span="7">
          <a href="javascript:void(0);" @click="NavChange('returnOrder')">
            <Card class="card_main">
              <p slot="title">还款数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in huankuanlist" :key="index">
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
          </a>
        </Col>
        <Col span="7" offset="1">
          <a href="javascript:void(0);" @click="NavChange('overdue')">
            <Card class="card_main">
              <p slot="title">逾期数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in yuqilist" :key="index">
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
          </a>
        </Col>
        <Col span="7" offset="1">
          <a href="javascript:void(0);" @click="NavChange('amount')">
            <Card class="card_main">
              <p slot="title">账户数据</p>
              <p slot="extra" class="go">
                进入
                <img class="go_icon" src="../../assets/images/arrow.png" alt>
              </p>
              <ul>
                <li v-for="(item,index) in zhanghulist" :key="index">
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
          </a>
        </Col>
      </Row>
    </div>
    <!-- <div v-show="main">
          <Col class="card-col" span="11">
            <Card>
              <div @click="NavChange('reg')">
                <div class="opt-box">
                  <div class="card_50">
                    <h2 class="card-title">总注册数</h2>
                    <p class="card-number">{{reg.total.totalReg}}</p>
                  </div>
                  <div class="card_50">
                    <h2 class="card-title">今日注册</h2>
                    <p class="card-number">{{reg.today.todayTotal}}</p>
                  </div>
                </div>
                <div class="card-content">
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">借款总人数</span>
                      <span class="value">{{reg.total.amountNumber}}</span>
                    </span>
                    <span class="half">
                      <span class="label">新用户借款人数</span>
                      <span class="value">{{reg.today.todayAmount}}</span>
                    </span>
                  </p>
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">人均借款金额</span>
                      <span class="value">{{reg.total.svgAmount}}</span>
                    </span>
                    <span class="half">
                      <span class="label">新用户人均借款金额</span>
                      <span class="value">{{reg.today.todaySvgAmount}}</span>
                    </span>
                  </p>
                </div>
                <div class="card-footer">
                  <div class="opt-box">
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>通过率</span>
                        <span class="value">{{reg.total.passRate}}</span>
                      </div>
                      <div class="card_50">
                        <span>放款率</span>
                        <span class="value">{{reg.total.payPercent}}</span>
                      </div>
                    </div>
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>通过率</span>
                        <span class="value">{{reg.today.todayPassRate}}</span>
                      </div>
                      <div class="card_50">
                        <span>放款率</span>
                        <span class="value">{{reg.today.payPercent}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col class="card-col" span="11" offset="1">
            <Card>
              <div @click="NavChange('loan')">
                <div class="opt-box">
                  <div class="card_50">
                    <h2 class="card-title">总借款金额</h2>
                    <p class="card-number">{{loan.total.totalAmount}}</p>
                  </div>
                  <div class="card_50">
                    <h2 class="card-title">今日借款金额</h2>
                    <p class="card-number">{{loan.today.totalAmount}}</p>
                  </div>
                </div>
                <div class="card-content">
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">借款总笔数</span>
                      <span class="value">{{loan.total.amountNumber}}</span>
                    </span>
                    <span class="half">
                      <span class="label">今日借款笔数</span>
                      <span class="value">{{loan.today.amountNumber}}</span>
                    </span>
                  </p>
                </div>
                <div class="card-footer">
                  <div class="opt-box">
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均借款金额</span>
                        <span class="value">{{loan.total.perAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均借款笔数</span>
                        <span class="value">{{loan.total.amountSvgNumber}}</span>
                      </div>
                    </div>
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均借款金额</span>
                        <span class="value">{{loan.today.perAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均借款笔数</span>
                        <span class="value">{{loan.today.amountSvgNumber}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col class="card-col" span="11">
            <Card>
              <div @click="NavChange('returnOrder')">
                <div class="opt-box">
                  <div class="card_50">
                    <h2 class="card-title">总还款金额</h2>
                    <p class="card-number">{{Repayment.total.returnAmount}}</p>
                  </div>
                  <div class="card_50">
                    <h2 class="card-title">今日还款金额</h2>
                    <p class="card-number">{{Repayment.today.returnAmount}}</p>
                  </div>
                </div>
                <div class="card-content">
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总还款笔数</span>
                      <span class="value">{{Repayment.total.returnNumber}}</span>
                    </span>
                    <span class="half">
                      <span class="label">今日还款笔数</span>
                      <span class="value">{{Repayment.today.returnNumber}}</span>
                    </span>
                  </p>
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总还款人数</span>
                      <span class="value">？？？</span>
                    </span>
                    <span class="half">
                    
                    </span>
                  </p>
                </div>
                <div class="card-footer">
                  <div class="opt-box">
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均还款金额</span>
                        <span class="value">{{Repayment.total.perAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均还款笔数</span>
                        <span class="value">{{Repayment.total.returnSvgNumber}}</span>
                      </div>
                    </div>
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均还款金额</span>
                        <span class="value">{{Repayment.today.perReturnAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均还款笔数</span>
                        <span class="value">{{Repayment.today.returnSvgNumber}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col class="card-col" span="11" offset="1">
            <Card>
              <div @click="NavChange('delay')">
                <div class="opt-box">
                  <div class="card_50">
                    <h2 class="card-title">总展期金额</h2>
                    <p class="card-number">{{delay.total.delayAmount}}</p>
                  </div>
                  <div class="card_50">
                    <h2 class="card-title">今日展期金额</h2>
                    <p class="card-number">{{delay.today.delayAmount}}</p>
                  </div>
                </div>
                <div class="card-content">
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总展期笔数</span>
                      <span class="value">{{delay.total.delayNumber}}</span>
                    </span>
                    <span class="half">
                      <span class="label">今日展期笔数</span>
                      <span class="value">{{delay.today.delayNumber}}</span>
                    </span>
                  </p>
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总展期人数</span>
                      <span class="value">？？？</span>
                    </span>
                    <span class="half">
                 
                    </span>
                  </p>
                </div>
                <div class="card-footer">
                  <div class="opt-box">
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均展期金额</span>
                        <span class="value">{{delay.total.perDelayAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均展期笔数</span>
                        <span class="value">{{delay.total.delaySvgNumber}}</span>
                      </div>
                    </div>
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>笔均展期金额</span>
                        <span class="value">{{delay.today.perDelayAmount}}</span>
                      </div>
                      <div class="card_50">
                        <span>人均展期笔数</span>
                        <span class="value">{{delay.today.delaySvgNumber}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col class="card-col" span="11">
            <Card>
              <div @click="NavChange('overdue')">
                <div class="opt-box">
                  <div class="card_50">
                    <h2 class="card-title">总逾期金额</h2>
                    <p class="card-number">{{overdue.total.overdueAmount}}</p>
                  </div>
                  <div class="card_50">
                    <h2 class="card-title">今日逾期金额</h2>
                    <p class="card-number">{{overdue.today.overdueAmount}}</p>
                  </div>
                </div>
                <div class="card-content">
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总逾期笔数</span>
                      <span class="value">{{overdue.total.overdueNumber}}</span>
                    </span>
                    <span class="half">
                      <span class="label">总逾期笔数</span>
                      <span class="value">{{overdue.total.overdueNumber}}</span>
                    </span>
                  </p>
                  <p class="info-txt">
                    <span class="half">
                      <span class="label">总逾期率</span>
                      <span class="value">{{overdue.total.overduePercent}}</span>
                    </span>
                    <span class="half">
                      <span class="label">今日逾期率</span>
                      <span class="value">{{overdue.today.overduePercent}}</span>
                    </span>
                  </p>
                </div>
                <div class="card-footer">
                  <div class="opt-box">
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>人均逾期金额</span>
                        <span class="value">{{overdue.total.overduePerAmount}}</span>
                      </div>
                    </div>
                    <div class="opt-box card_50">
                      <div class="card_50">
                        <span>人均逾期金额</span>
                        <span class="value">{{overdue.today.overduePerAmount}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col class="card-col" span="11" offset="1">
            <Card>
              <div class="opt-box">
                <div class="card_50">
                  <h2 class="card-title">在借总金额</h2>
                  <p class="card-number">???</p>
                </div>
                <div class="card_50">
                   <h2 class="card-title">在借总用户</h2>
                  <p class="card-number">???</p>
                </div>
              </div>
              <div class="card-content">
                <p class="info-txt">
                  <span class="half">
                    <span class="label">逾期中总金额</span>
                    <span class="value">???</span>
                  </span>
                  <span class="half">
                    <span class="label">应收总金额</span>
                    <span class="value">???</span>
                  </span>
                </p>
              </div>
              <div class="card-footer">
                <div class="opt-box">
                  <div class="opt-box card_50">
                    <div class="card_50">
                      <span>&nbsp;</span>
                      <span class="value"></span>
                    </div>
                    <div class="card_50">
                      <span></span>
                      <span class="value"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
    </div>-->
    <div v-show="chart">
      <Card>
        <div id="myChartA" :style="{width: '100%', height: '300px'}"></div>
        <div id="myChartB" :style="{width: '100%', height: '300px'}"></div>
        <div
          v-show="NavData.delay.cur||NavData.overdue.cur"
          id="myChartC"
          :style="{width: '100%', height: '300px'}"
        ></div>
      </Card>
    </div>
    <div v-show="NavData.DataAnalysis.cur">
      <div class="opy-around">
        <Card style="width:40%">
          <div class="right_flex">
            <Dropdown @on-click="changeA">
              <Button type="warning">
                {{button_name_A}}
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="loan">借款用户</DropdownItem>
                <DropdownItem name="overdue">逾期用户</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div id="dataChart1" :style="{width: '400px', height: '300px'}"></div>
          <div class="opy-around">
            <div class="opt-box notes">
              <b class="circulargirl"></b>
              女
            </div>
            <div class="opt-box notes">
              <b class="circularboy"></b>
              男
            </div>
          </div>
        </Card>
        <Card style="width:40%">
          <div class="right_flex">
            <Dropdown @on-click="changeB">
              <Button type="warning">
                {{button_name_B}}
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="loan">借款用户</DropdownItem>
                <DropdownItem name="overdue">逾期用户</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div id="dataChart2" :style="{width: '400px', height: '300px'}"></div>
          <div class="opy-around">
            <div class="opt-box notes">
              <b class="circulargirl"></b>
              女
            </div>
            <div class="opt-box notes">
              <b class="circularboy"></b>
              男
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <div class="right_flex" ref="monthPie">
          <Dropdown @on-click="changeC">
            <Button type="warning">
              {{button_name_C}}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="loan">借款用户</DropdownItem>
              <DropdownItem name="overdue">逾期用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div id="dataChart3" :style="{width: '1000px' , height: '300px'}"></div>
        <div class="opy-around">
          <div class="opt-box notes">
            <b class="circulargirl"></b>
            女
          </div>
          <div class="opt-box notes">
            <b class="circularboy"></b>
            男
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt } from "@/util/util";

export default {
  name: "Statistical",
  data() {
    return {
      randomMovieList: [
        {
          name: "注册总数",
          rate: ""
        },
        // {
        //   name: "借款人数",
        //   rate: ""
        // },
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
        }
      ],
      jiekuanlist: [
        {
          name: "借款金额",
          rate: ""
        },
        {
          name: "借款人数",
          rate: ""
        },
        {
          name: "借款笔数",
          rate: ""
        },
        {
          name: "人均笔数",
          rate: ""
        }
      ],
      zhanqilist: [
        {
          name: "展期金额",
          rate: ""
        },
        {
          name: "展期笔数",
          rate: ""
        },
        {
          name: "展期人数",
          rate: ""
        },
        {
          name: "人均笔数",
          rate: ""
        }
      ],
      huankuanlist: [
        {
          name: "还款金额",
          rate: ""
        },
        {
          name: "还款笔数",
          rate: ""
        },
        {
          name: "还款人数",
          rate: ""
        },
        {
          name: "人均笔数",
          rate: ""
        }
      ],
      yuqilist: [
        {
          name: "逾期金额",
          rate: ""
        },
        {
          name: "逾期笔数",
          rate: ""
        },
        {
          name: "逾期率",
          rate: ""
        }
      ],
      zhanghulist: [
        {
          name: "在借金额",
          rate: ""
        },
        {
          name: "在借用户",
          rate: ""
        },
        {
          name: "应收金额",
          rate: ""
        }
      ],
      button_name_A: "借款用户",

      button_name_B: "借款用户",

      button_name_C: "借款用户",
      main: true,
      chart: false,
      infoApi: "/backend/statistical/static-info",
      msg: "Welcome ",
      NavData: {
        reg: {
          cur: false
        },
        loan: {
          cur: false
        },
        returnOrder: {
          cur: false
        },
        delay: {
          cur: false
        },
        overdue: {
          cur: false
        },
        DataAnalysis: {
          cur: false
        }
      },
      reg: {
        total: {
          totalReg: 0,
          amountNumber: 0,
          totalAmount: 0,
          svgAmount: 0,
          passRate: 0,
          payPercent: 0
        },
        today: {
          todayTotal: 0,
          todayAmount: 0,
          todaySvgAmount: 0,
          todayPassRate: 0,
          payPercent: 0
        }
      },
      loan: {
        total: {
          totalAmount: "2200.00",
          amountNumber: 0,
          perAmount: 0,
          amountSvgNumber: 2
        },
        today: {
          totalAmount: 0,
          amountNumber: 0,
          perAmount: 0,
          amountSvgNumber: 0
        }
      },
      Repayment: {
        total: {
          returnAmount: "0",
          returnNumber: 0,
          perAmount: 0,
          returnSvgNumber: 0
        },
        today: {
          returnAmount: 0,
          returnNumber: 0,
          perReturnAmount: 0,
          returnSvgNumber: 0
        }
      },
      delay: {
        total: {
          delayAmount: "0",
          delayNumber: 0,
          perDelayAmount: 0,
          delaySvgNumber: 0
        },
        today: {
          delayAmount: 0,
          delayNumber: 0,
          perDelayAmount: 0,
          delaySvgNumber: 0
        }
      },
      overdue: {
        total: {
          overdueAmount: "0",
          overdueNumber: 0,
          overduePercent: 0,
          overduePerAmount: 0
        },
        today: {
          overdueAmount: 0,
          overdueNumber: 0,
          overduePercent: 0,
          overduePerAmount: 0
        }
      },
      toadyYear: "",
      toadyMonth: "",
      time: "",
      nav_type: "",
      time_show: false
    };
  },
  created() {
    this.auth_id = getLocal("auth_id");
    this.toadyYear = new Date().getFullYear();
    this.toadyMonth = new Date().getMonth() + 1;
    this.time = this.toadyYear + "-" + this.toadyMonth;
  },
  mounted() {
    this.register(); //注册数据
  },
  computed: {},
  methods: {
    changeA(name) {
      if (name == "loan") {
        this.button_name_A = "借款用户";
        this.creatAge(this.button_name_A);
      } else {
        this.button_name_A = "逾期用户";
        this.creatAge(this.button_name_A);
      }
    },
    changeB(name) {
      if (name == "loan") {
        this.button_name_B = "借款用户";
        this.creatCity(this.button_name_B);
      } else {
        this.button_name_B = "逾期用户";
        this.creatCity(this.button_name_B);
      }
    },
    changeC(name) {
      if (name == "loan") {
        this.button_name_C = "借款用户";
        this.creatStar(this.button_name_C);
      } else {
        this.button_name_C = "逾期用户";
        this.creatStar(this.button_name_C);
      }
    },
    //年龄
    creatAge: function(data) {
      if (data == "借款用户") {
        var type1 = "";
      } else {
        var type1 = 1;
      }
      this.$fetch("/backend/statistical/user-data-info", {
        type: type1
      }).then(d => {
        if (d.status == 1) {
          if (d.data.length == 0) {
            d.data = {
              age: [],
              woman: [0],
              man: [0]
            };
          }
          let myChart1 = this.$echarts.init(
            document.getElementById("dataChart1")
          );
          // 绘制图表
          myChart1.setOption({
            title: {
              text: "客户年龄性别占比",
              subtext: "单位%"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {},
            xAxis: [
              {
                type: "category",
                data: d.data.age
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "女",
                type: "bar",
                data: d.data.woman,
                itemStyle: {
                  normal: {
                    color: "#ff9900" //颜色
                  }
                }
              },
              {
                name: "男",
                type: "bar",
                data: d.data.man,
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          });
        }
      });
    },
    //图表2 城市立刻更换
    creatCity: function(data) {
      if (data == "借款用户") {
        var type2 = "";
      } else {
        var type2 = 1;
      }

      this.$fetch("/backend/statistical/user-data-info", {
        type: type2
      }).then(d => {
        if (d.status == 1) {
          if (d.data.length == 0) {
            d.data = {
              age: [],
              woman: [0],
              man: [0]
            };
          }
          let myChart2 = this.$echarts.init(
            document.getElementById("dataChart2")
          );
          // 绘制图表
          myChart2.setOption({
            title: {
              text: "客户城市占比",
              subtext: "单位%"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {},
            xAxis: [
              {
                type: "category",
                data: ["1月", "2月"]
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "女",
                type: "bar",
                data: [26, 59],
                itemStyle: {
                  normal: {
                    color: "#ff9900" //颜色
                  }
                }
              },
              {
                name: "男",
                type: "bar",
                data: [26, 59],
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          });
        }
      });
    },
    //星座
    creatStar: function(data) {
      if (data == "借款用户") {
        var type3 = "";
      } else {
        var type3 = 1;
      }
      this.$fetch("/backend/statistical/user-star", {
        type: type3
      }).then(d => {
        if (d.data.length == 0) {
          d.data = {
            star: [],
            woman: [0],
            man: [0]
          };
        }
        if (d.status == 1) {
          let myChart3 = this.$echarts.init(
            document.getElementById("dataChart3")
          );
          // 绘制图表
          myChart3.setOption({
            title: {
              text: "客户星座占比",
              subtext: "单位%",
              x: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {},
            xAxis: [
              {
                type: "category",
                data: d.data.star
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "女",
                type: "bar",
                data: d.data.woman,
                itemStyle: {
                  normal: {
                    color: "#ff9900" //颜色
                  }
                }
              },
              {
                name: "男",
                type: "bar",
                data: d.data.man,
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          });
        }
      });
    },
    //改变日期切换图表
    handleChange: function(event) {
      this.toadyYear = event.substring(0, 4);
      var Month=event.substring(5)
      if(Number(Month)<10){
        Month=Month.substring(1, 2)
      }
      this.toadyMonth =Month
      var nav = this.nav_type;
      var name1 = "";
      var name2 = "";
      var name3 = "";
      if (nav == "reg") {
        name1 = "注册人数";
        name2 = "APP激活人数";
      } else if (nav == "loan") {
        name1 = "借款人数";
        name2 = "借款金额";
      } else if (nav == "delay") {
        name1 = "展期金额";
        name2 = "展期笔数";
        name3 = "展期费";
      } else if (nav == "overdue") {
        name1 = "逾期金额";
        name2 = "逾期笔数";
        name3 = "逾期率";
      } else if (nav == "returnOrder") {
        name1 = "还款金额";
        name2 = "还款笔数";
      } else if (nav == "amount") {
        name1 = "应收金额";
        name2 = "应收笔数";
      }
      if (nav == "delay" || nav == "overdue") {
        this.creatA(nav, this.toadyYear, this.toadyMonth, name1, name2);
        this.creatC(nav, this.toadyYear, this.toadyMonth, name3);
      } else {
        this.creatA(nav, this.toadyYear, this.toadyMonth, name1, name2);
      }
    },
    creatA: function(nav, Year, Month, name1, name2) {
      this.$fetch(this.infoApi, {
        y: Year,
        m: Month,
        type: nav
      }).then(d => {
        if (d.status == 1) {
          var a = d.data.a;
          let result = 0;
          for (var i = 0; i < a.data.length; i++) {
            result += Number(a.data[i]);
          }

          let myChart = this.$echarts.init(document.getElementById("myChartA"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: name1,
              subtext: "总计：" + a.total,
              x: "center"
            },
            tooltip: {},
            xAxis: {
              data: a.days
            },
            yAxis: {},
            series: [
              {
                type: "bar",
                itemStyle: {
                  normal: {
                    color: "#2b85e4" //颜色
                  }
                },
                data: a.data
              }
            ]
          });
          if (typeof d.data.b != "undefined") {
            var b = d.data.b;
            let result2 = 0;
            for (var i = 0; i < b.data.length; i++) {
              result2 += Number(b.data[i]);
            }
            let myChart2 = this.$echarts.init(
              document.getElementById("myChartB")
            );
            // 绘制图表
            myChart2.setOption({
              title: {
                text: name2,
                subtext: "总计：" + b.total,
                x: "center"
              },
              tooltip: {},
              xAxis: {
                data: b.days
              },
              yAxis: {},
              series: [
                {
                  type: "bar",
                  itemStyle: {
                    normal: {
                      color: "#ff9900" //颜色
                    }
                  },
                  data: b.data
                }
              ]
            });
          }
        } else {
          $this.$Message.error(d.message);
        }
      });
    },
    creatC: function(nav, Year, Month, name) {
      this.$fetch(this.infoApi, {
        y: Year,
        m: Month,
        type: nav
      }).then(d => {
        if (d.status == 1) {
          var c = d.data.c;
          let result = 0;
          for (var i = 0; i < c.data.length; i++) {
            result += Number(c.data[i]);
          }
          let myChart = this.$echarts.init(document.getElementById("myChartC"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: name,
              subtext: "总计：" + c.total,
              x: "center"
            },
            tooltip: {},
            xAxis: {
              data: c.days
            },
            yAxis: {},
            series: [
              {
                type: "bar",
                itemStyle: {
                  normal: {
                    color: "#13c2c2" //颜色
                  }
                },
                data: c.data
              }
            ]
          });
        }
      });
    },
    GoMain() {
      this.main = true;
      this.chart = false;
      this.time_show = false;
      for (var k in this.NavData) {
        this.NavData[k].cur = false;
      }
    },
    NavChange(nav) {
      this.main = false;
      this.toadyYear = new Date().getFullYear();
      this.toadyMonth = new Date().getMonth() + 1;
      this.time = this.toadyYear + "-" + this.toadyMonth;
      Object.keys(this.NavData).forEach(val => {
        this.NavData[val].cur = val === nav ? true : false;
      });
      if (nav == "DataAnalysis") {
        this.chart = false;
        this.time_show = false;
      } else {
        this.chart = true;
        this.time_show = true;
      }
      this.nav_type = nav;
      var name1 = "";
      var name2 = "";
      var name3 = "";
      if (nav == "reg") {
        name1 = "注册人数";
        name2 = "通过数";
      } else if (nav == "loan") {
        name1 = "借款金额";
        name2 = "借款人数";
      } else if (nav == "delay") {
        name1 = "展期金额";
        name2 = "展期笔数";
        name3 = "展期费";
      } else if (nav == "overdue") {
        name1 = "逾期金额";
        name2 = "逾期笔数";
        name3 = "逾期率";
      } else if (nav == "returnOrder") {
        name1 = "还款金额";
        name2 = "还款笔数";
      } else if (nav == "amount") {
        name1 = "应收金额";
        name2 = "应收笔数";
      }
      if (nav == "delay" || nav == "overdue") {
        this.creatA(nav, this.toadyYear, this.toadyMonth, name1, name2);
        this.creatC(nav, this.toadyYear, this.toadyMonth, name3);
      } else {
        this.creatA(nav, this.toadyYear, this.toadyMonth, name1, name2);
      }
    },
    //注册数据
    register() {
      var timestamp = Date.parse(new Date()) / 1000;
      var taday = crtTimeFtt(timestamp); //当日时间
      this.$fetch("/backend/statistical/index", {
        today: taday
      }).then(d => {
        if (d.status == 1) {
          var _data = d.data;
          this.randomMovieList[0].rate = _data.user.totalReg;
          // this.randomMovieList[1].rate = _data.user.amountNumber;
          this.randomMovieList[1].rate =
            Math.floor(_data.user.autoPassRate * 10) / 10 + "%";
          this.randomMovieList[2].rate =
            Math.floor(_data.user.passRate * 10) / 10 + "%";
          this.randomMovieList[3].rate =
            Math.floor(_data.user.payPercent * 10) / 10 + "%";

          this.jiekuanlist[0].rate = _data.loan.totalAmount;
          this.jiekuanlist[1].rate = _data.loan.totalUserNumber;
          this.jiekuanlist[2].rate = _data.loan.amountNumber;
          this.jiekuanlist[3].rate = _data.loan.amountSvgNumber;

          this.zhanqilist[0].rate = _data.delay.delayAmount;
          this.zhanqilist[1].rate = _data.delay.delayNumber;
          this.zhanqilist[2].rate = _data.delay.totalUserNumber;
          this.zhanqilist[3].rate = _data.delay.perDelayAmount;

          this.huankuanlist[0].rate = _data.Repayment.returnAmount;
          this.huankuanlist[1].rate = _data.Repayment.returnNumber;
          this.huankuanlist[2].rate = _data.Repayment.returnUserNumber;
          this.huankuanlist[3].rate = _data.Repayment.returnSvgNumber;

          this.yuqilist[0].rate = _data.overdue.overdueAmount;
          this.yuqilist[1].rate = _data.overdue.overdueNumber;
          this.yuqilist[2].rate =
            Math.floor(_data.overdue.overduePercent * 10) / 10 + "%";

          this.zhanghulist[0].rate = _data.account.totalAmount;
          this.zhanghulist[1].rate = _data.account.totalUser;
          // this.zhanghulist[2].rate = _data.account.reduce;
          this.zhanghulist[2].rate = _data.account.amount;
          // this.Repayment = d.data.Repayment;
          // this.delay = d.data.delay;
          // this.loan = d.data.loan;
          // this.overdue = d.data.overdue;
          // this.reg = d.data.reg;
        } else {
          this.$Message.error(d.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-col {
  padding-bottom: 35px;
}
.left_15 {
  margin-left: 35px;
}

.card-title {
  color: rgba(0, 0, 0, 0.45);
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
}
.card-number {
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 32px;
  line-height: 38px;
  height: 38px;
}
.card-content {
  margin-top: 12px;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  height: 42px;
  .info-txt {
    width: 100%;
    display: flex;
    flex-direction: row;
    .half {
      width: 50%;
      color: #333;
      .value {
        margin-left: 8px;
      }
    }
  }
}
.card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  .value {
    // margin: 0 8px;
    color: rgba(0, 0, 0, 0.85);
  }
}
.statistical_title {
  font-size: 24px;
  color: #222222;
  padding: 30px 0 30px 50px;
}
.back {
  margin: 30px 0;
}

.right_box {
  min-height: 724px;
  padding-left: 30px;
  padding-top: 30px;
  border-top: 1px solid #d8e3e7;
  border-left: 1px solid #d8e3e7;
}
.left_ul > li {
  font-size: 14px;
}
.card_50 {
  width: 50%;
}
li &.cur {
  background-color: #f5f8f9;
}
.item_body {
  display: block;
  height: 50px;
  line-height: 30px;
  padding: 10px 40px;
  font-size: 16px;
}
a {
  text-decoration: none;
  color: #919191;
}
.circulargirl {
  display: block;
  background-color: #ff9900;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
.circularboy {
  display: block;
  background-color: #2db7f5;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
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
  padding: 40px 20px 20px 20px;
  margin-left: 35px;
}
.card_main {
  height: 220px;
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
</style>
